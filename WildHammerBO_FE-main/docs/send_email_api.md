# Send Email API Documentation

## Overview
API สำหรับส่งอีเมลในเกมโดยใช้ email_packet และจัดการ Redis cache ตาม Email Redis Cache Guide

## Authentication
- **Type**: JWT Bearer Token
- **Required**: Yes
- **Roles**: Admin

## Environment Variables
```env
WEB_API_SECRET=webapi2023yd99
GAME_SERVER_URL=http://localhost:3000
GAME_SKU=PRO_NAME
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_password
REDIS_DB=0
```

## API Endpoints

### 1. Send Email (General)
```bash
POST /api/sendEmail
```

**Request Body:**
```json
{
  "owner": ["281475295236133", "281475295236134"], // Array of role IDs หรือ single string
  "id": 1, // Email packet ID
  "gameId": 1,
  "serverId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sent 2/2 emails successfully",
  "data": {
    "email_packet_id": 1,
    "total_recipients": 2,
    "successful_sends": 2,
    "failed_sends": 0,
    "results": [
      {
        "recipient": "281475295236133",
        "success": true,
        "message": "Send Email Success",
        "emailId": 1705123456789
      },
      {
        "recipient": "281475295236134",
        "success": true,
        "message": "Send Email Success",
        "emailId": 1705123456790
      }
    ]
  }
}
```

### 2. Send Single Email
```bash
POST /api/sendEmail/single
```

**Request Body:**
```json
{
  "recipient": "281475295236133",
  "id": 1,
  "gameId": 1,
  "serverId": 1
}
```

### 3. Send Bulk Email
```bash
POST /api/sendEmail/bulk
```

**Request Body:**
```json
{
  "recipients": ["281475295236133", "281475295236134", "281475295236135"],
  "id": 1,
  "gameId": 1,
  "serverId": 1
}
```

### 4. Preview Email
```bash
POST /api/sendEmail/preview
```

**Request Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email preview generated successfully",
  "data": {
    "email_packet": {
      "id": 1,
      "title": "Welcome Gift",
      "content": "Thank you for playing!",
      "is_active": true,
      "total_sent": 5
    },
    "converted_items": [
      {
        "i": 1001,
        "n": 15000
      },
      {
        "i": 10080,
        "n": 1,
        "q": 7,
        "add": {
          "1": {"14": 400},
          "2": {"19": 400}
        },
        "bper": 2500
      }
    ],
    "item_count": 2,
    "game_items_count": 1,
    "equipment_items_count": 1
  }
}
```

## Redis Cache Management Endpoints

### 5. Get Email List
```bash
GET /api/sendEmail/list/:serverid/:roleId
```

**Response:**
```json
{
  "success": true,
  "message": "Email list retrieved successfully",
  "data": {
    "emails": {
      "123456789": {
        "id": 123456789,
        "serverid": 1,
        "title": "Private Message",
        "content": "Hello from admin!",
        "items": [{"i": 2001, "n": 1}],
        "state": 0,
        "sender": "backend",
        "owner": "281475295236133",
        "time": "2025-01-15T12:00:00.000Z"
      }
    },
    "globalEmails": {
      "123456790": {
        "id": 123456790,
        "serverid": 1,
        "title": "Server Maintenance",
        "content": "Server will be down for maintenance",
        "items": [{"i": 1001, "n": 100}],
        "state": 0,
        "sender": "backend",
        "owner": "GLOBAL",
        "time": "2025-01-15T11:00:00.000Z"
      }
    }
  }
}
```

### 6. Sync Global Emails to Player
```bash
POST /api/sendEmail/sync-global
```

**Request Body:**
```json
{
  "serverid": 1,
  "roleId": "281475295236133"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Global emails synced successfully",
  "data": {
    "synced": true,
    "totalEmails": 5
  }
}
```

### 7. Cleanup Expired Emails
```bash
DELETE /api/sendEmail/cleanup/:serverid/:roleId?daysToExpire=30
```

**Response:**
```json
{
  "success": true,
  "message": "Cleaned up 3 expired emails",
  "data": {
    "removedCount": 3,
    "remainingCount": 7
  }
}
```

### 8. Get Statistics
```bash
GET /api/sendEmail/statistics
```

## Redis Key Patterns

### Global Email Keys
```
${GAME_SKU}_s${serverid}_email
```
**Example:** `PRO_NAME_s1_email`

### Player Email Keys
```
${GAME_SKU}_${serverid}_${roleId}_email
```
**Example:** `PRO_NAME_1_281475295236133_email`

## Email Entity Structure

```json
{
  "id": 123456789,
  "serverid": 1,
  "title": "Email Title",
  "content": "Email Content",
  "items": [
    {
      "i": 1001,
      "n": 100
    }
  ],
  "state": 0, // 0=UNREAD, 1=READ, 2=RECEIVED, 3=DELETED
  "sender": "backend",
  "owner": "281475295236133", // หรือ "GLOBAL"
  "time": "2025-01-15T10:30:00.000Z"
}
```

## Item Conversion Logic

### Game Items (Simple)
```json
// Input (email_packet.game_items)
{
  "items": [
    {"item_id": 1001, "quantity": 15000},
    {"item_id": 1005, "quantity": 30}
  ]
}

// Output
[
  {"i": 1001, "n": 15000},
  {"i": 1005, "n": 30}
]
```

### Equipment Items (With Quality & Attributes)
```json
// Input (email_packet.equipment_items)
{
  "items": [
    {
      "item_id": 10080,
      "quantity": 1,
      "quality": 7,
      "add_attributes": {
        "1": {"14": 400},
        "2": {"19": 400}
      },
      "bper": 2500
    }
  ]
}

// Output
[
  {
    "i": 10080,
    "n": 1,
    "q": 7,
    "add": {
      "1": {"14": 400},
      "2": {"19": 400}
    },
    "bper": 2500
  }
]
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Owner is required",
      "param": "owner",
      "location": "body"
    }
  ]
}
```

### Email Packet Not Found
```json
{
  "success": false,
  "message": "Email packet not found"
}
```

### Redis Cache Error
```json
{
  "success": false,
  "message": "Failed to add email to Redis cache"
}
```

### Game Server Error
```json
{
  "success": false,
  "message": "Game Server Request Failed",
  "error": "Connection timeout"
}
```

## Usage Examples

### 1. Send Global Email
```bash
curl -X POST http://localhost:9100/api/sendEmail \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "GLOBAL",
    "id": 1,
    "gameId": 1,
    "serverId": 1
  }'
```

### 2. Send to Multiple Players
```bash
curl -X POST http://localhost:9100/api/sendEmail \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": ["281475295236133", "281475295236134"],
    "id": 2,
    "gameId": 1,
    "serverId": 1
  }'
```

### 3. Preview Email Content
```bash
curl -X POST http://localhost:9100/api/sendEmail/preview \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

### 4. Get Player Email List
```bash
curl -X GET http://localhost:9100/api/sendEmail/list/1/281475295236133 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Sync Global Emails
```bash
curl -X POST http://localhost:9100/api/sendEmail/sync-global \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serverid": 1,
    "roleId": "281475295236133"
  }'
```

## Notes

1. **Redis Integration**: API จะบันทึก email ลง Redis cache ตามรูปแบบที่กำหนดใน Email Redis Cache Guide
2. **Global Email**: อีเมล global สามารถส่งได้เฉพาะ main server เท่านั้น
3. **Item Conversion**: ระบบจะแปลง items จาก email_packet format เป็น game format อัตโนมัติ
4. **MD5 Hash**: สร้าง hash สำหรับการยืนยันความถูกต้องของอีเมล
5. **Error Handling**: จัดการ error อย่างครอบคลุม รวมถึง Redis และ Game Server errors
6. **Statistics**: นับจำนวนการส่งอีเมลใน email_packet.total_sent
7. **Cache Management**: รองรับการ sync, cleanup และจัดการ Redis cache

## Dependencies

- `express-validator`: สำหรับ validation
- `axios`: สำหรับส่ง request ไปยัง game server
- `crypto`: สำหรับสร้าง MD5 hash
- `redis`: สำหรับจัดการ cache
- `mysql2`: สำหรับ database operations
