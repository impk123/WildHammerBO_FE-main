# SendEmail API Documentation

## Overview
คู่มือการใช้งาน API `sendEmail` สำหรับส่งอีเมลในเกม โดยสามารถเชื่อมต่อกับ Node.js + Express และใช้ฐานข้อมูล MySQL และ Redis เดียวกันกับโปรเจคนี้

## API Endpoint
```
POST /games-mgr/sendEmail
```

## Authentication
- **Type**: JWT Bearer Token
- **Required**: Yes
- **Roles**: Admin, Operations

## Request Body Structure

### BESendEmailDto
```typescript
{
  "gameId": number,           // Game ID (required)
  "serverid": number,         // Server ID (required)
  "title": string,            // Email title (required)
  "content": string,          // Email content (required)
  "items": EmailItemsEntity[], // Email attachments (required)
  "owner": string,            // Recipient (required)
  "key": string,              // MD5 hash for verification (auto-generated)
  "sender": string,           // Sender (auto-set to "backend")
  "time": number              // Timestamp (optional)
}
```

### EmailItemsEntity Structure
```typescript
{
  "i": number,    // Item/Equipment ID
  "n": number,    // Quantity
  "q"?: number,   // Equipment quality (optional, for ungenerated equipment)
  "einfo"?: any   // Generated equipment info (optional)
}
```

## Database Tables Required

### 1. games Table
```sql
CREATE TABLE `games` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(18) NOT NULL,
    `secretkey` VARCHAR(18) NOT NULL,
    `sku` VARCHAR(18) NOT NULL,
    `serverNF` VARCHAR(18) NOT NULL,
    `gameUrl` JSON NOT NULL,
    `channels` JSON NOT NULL,
    `whitelist` JSON NOT NULL,
    `blacklist` JSON NOT NULL,
    `info` JSON DEFAULT '{}',
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (`id`)
);
```

### 2. servers Table
```sql
CREATE TABLE `servers` (
    `gameId` SMALLINT UNSIGNED NOT NULL,
    `serverId` MEDIUMINT UNSIGNED NOT NULL,
    `zoneId` SMALLINT UNSIGNED NOT NULL,
    `name` VARCHAR(18) NULL,
    `channels` JSON NOT NULL,
    `gameUrl` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `workload` VARCHAR(191) NOT NULL,
    `isNew` SMALLINT UNSIGNED NOT NULL,
    `openTime` DATETIME NOT NULL DEFAULT NOW(),
    `mergeTime` DATETIME(3) NULL,
    `info` JSON DEFAULT '{}',
    `chatIP` VARCHAR(191) DEFAULT '',
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    PRIMARY KEY (`gameId`, `serverId`)
);
```

## Implementation Logic

### 1. Validation Steps
1. **Game Validation**: Check if `gameId` exists in `games` table
2. **Server Validation**: Check if `serverId` exists in `servers` table for the given `gameId`
3. **Main Server Check**: Get main server ID (handles merged servers)
4. **Global Email Check**: If `owner` is global tag, ensure it's main server

### 2. MD5 Hash Generation
```javascript
const crypto = require('crypto');

function generateMD5Hash(owner, title, serverid, items, secret) {
  const str = `${secret}|backend|${owner}|${title}|${serverid}|${JSON.stringify(items)}|`;
  return crypto.createHash('md5').update(str).digest('hex').toLowerCase();
}
```

### 3. Constants Required
```javascript
const webApiConstants = {
  secret: 'webapi2023yd99'  // Same as in original project
};

const gameConst = {
  email_globalTag: 'GLOBAL'  // Global email tag
};
```

## Example Implementation (Node.js + Express)

```javascript
const express = require('express');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'lyz_wgbackend'
};

// Constants
const webApiConstants = {
  secret: 'webapi2023yd99'
};

const gameConst = {
  email_globalTag: 'GLOBAL'
};

// MD5 Hash generation
function generateMD5Hash(owner, title, serverid, items) {
  const str = `${webApiConstants.secret}|backend|${owner}|${title}|${serverid}|${JSON.stringify(items)}|`;
  return crypto.createHash('md5').update(str).digest('hex').toLowerCase();
}

// Get main server ID (simplified version)
async function getMainServerId(connection, gameId, serverId) {
  const [rows] = await connection.execute(
    'SELECT * FROM servers WHERE gameId = ? AND serverId = ?',
    [gameId, serverId]
  );
  
  if (rows.length === 0) {
    throw new Error('Server not found');
  }
  
  // If server has merge info, return main server ID
  // Otherwise return current server ID
  return serverId; // Simplified - implement merge logic as needed
}

// Send Email API
app.post('/games-mgr/sendEmail', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    const {
      gameId,
      serverid,
      title,
      content,
      items,
      owner,
      time
    } = req.body;

    // 1. Validate Game
    const [gameRows] = await connection.execute(
      'SELECT * FROM games WHERE id = ?',
      [gameId]
    );
    
    if (gameRows.length === 0) {
      return res.json({
        ok: false,
        msg: 'Game Not Found'
      });
    }

    // 2. Validate Server
    const [serverRows] = await connection.execute(
      'SELECT * FROM servers WHERE gameId = ? AND serverId = ?',
      [gameId, serverid]
    );
    
    if (serverRows.length === 0) {
      return res.json({
        ok: false,
        msg: 'Game Server Not Found'
      });
    }

    const server = serverRows[0];

    // 3. Get Main Server ID
    const mainServerId = await getMainServerId(connection, gameId, serverid);

    // 4. Check Global Email
    if (owner === gameConst.email_globalTag && serverid !== mainServerId) {
      return res.json({
        ok: false,
        msg: 'Merge Server Cannot Send Global Email'
      });
    }

    // 5. Generate MD5 Hash
    const md5Key = generateMD5Hash(owner, title, mainServerId, items);

    // 6. Prepare Send Data
    const sendData = {
      key: md5Key,
      serverid: mainServerId,
      sender: 'backend',
      title,
      content,
      items,
      owner
    };

    // 7. Send to Game Server
    const gameUrl = server.gameUrl + '/email/sendEmail';
    
    try {
      const response = await axios.post(gameUrl, sendData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (response.data && response.data.ok) {
        return res.json({
          ok: true,
          msg: 'Send Email Success'
        });
      } else {
        return res.json({
          ok: false,
          msg: response.data?.msg || 'Send Failed'
        });
      }
    } catch (error) {
      console.error('Game server request failed:', error.message);
      return res.json({
        ok: false,
        msg: 'Game Server Request Failed'
      });
    }

  } catch (error) {
    console.error('Send email error:', error);
    return res.json({
      ok: false,
      msg: 'Internal Server Error'
    });
  } finally {
    await connection.end();
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## Example Request

```json
{
  "gameId": 1,
  "serverid": 1,
  "title": "Welcome Gift",
  "content": "Thank you for playing our game! Here are some free items.",
  "items": [
    {
      "i": 1001,
      "n": 100
    },
    {
      "i": 1002,
      "n": 50
    },
    {
      "i": 2001,
      "n": 1,
      "q": 5
    }
  ],
  "owner": "281475295236133"
}
```

## Example Response

### Success
```json
{
  "ok": true,
  "msg": "Send Email Success"
}
```

### Error
```json
{
  "ok": false,
  "msg": "Game Not Found"
}
```

## Error Messages
- `Game Not Found`: Game ID ไม่พบในฐานข้อมูล
- `Game Server Not Found`: Server ID ไม่พบในฐานข้อมูล
- `Merge Server Cannot Send Global Email`: ไม่สามารถส่งอีเมล global ไปยัง merge server
- `Send Failed`: การส่งอีเมลล้มเหลว
- `Game Server Request Failed`: ไม่สามารถเชื่อมต่อกับ game server

## Notes
1. **MD5 Hash**: ต้องสร้าง hash ตามรูปแบบที่กำหนดเพื่อความปลอดภัย
2. **Server Merge**: ต้องจัดการกับ merge server โดยใช้ main server ID
3. **Global Email**: อีเมล global สามารถส่งได้เฉพาะ main server เท่านั้น
4. **Items Format**: รูปแบบ items ต้องเป็น array ของ EmailItemsEntity
5. **Game Server**: ต้องมี game server ที่รันอยู่และสามารถรับ request ได้

## Dependencies
```json
{
  "express": "^4.18.0",
  "mysql2": "^3.6.0",
  "axios": "^1.4.0"
}
```
