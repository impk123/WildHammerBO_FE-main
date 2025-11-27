# คู่มือการจัดการ Redis Cache สำหรับระบบ Email

## Overview
คู่มือนี้จะอธิบายการจัดการ Redis Cache ในระบบ Email รวมถึงโครงสร้างข้อมูล, Key patterns, และการดำเนินการต่างๆ

## Redis Key Patterns

### 1. Global Email Key
```typescript
// รูปแบบ: ${GAME_SKU}_s${serverid}_email
const globalEmailKey = `${GAME_SKU}_s${serverid}_email`;

// ตัวอย่าง:
// "PRO_NAME_s1_email" - Global email สำหรับ server 1
// "PRO_NAME_s2_email" - Global email สำหรับ server 2
```

### 2. Player Email Key
```typescript
// รูปแบบ: ${GAME_SKU}_${serverid}_${roleId}_email
const playerEmailKey = `${GAME_SKU}_${serverid}_${roleId}_email`;

// ตัวอย่าง:
// "PRO_NAME_1_281475295236133_email" - Email ของผู้เล่น ID 281475295236133 ใน server 1
```

## โครงสร้างข้อมูลใน Redis

### 1. Global Email Structure
```typescript
interface GlobalEmailData {
    [emailId: string]: EmailEntity;
}

// ตัวอย่าง:
{
    "123456789": {
        "id": 123456789,
        "serverid": 1,
        "title": "Welcome Gift",
        "content": "Thank you for playing!",
        "items": [
            {"i": 1001, "n": 100},
            {"i": 1002, "n": 50}
        ],
        "state": 0,
        "sender": "system",
        "owner": "GLOBAL",
        "time": "2025-01-15T10:30:00.000Z"
    },
    "123456790": {
        "id": 123456790,
        "serverid": 1,
        "title": "Daily Reward",
        "content": "Your daily reward is here!",
        "items": [{"i": 1003, "n": 10}],
        "state": 0,
        "sender": "system",
        "owner": "GLOBAL",
        "time": "2025-01-15T11:00:00.000Z"
    }
}
```

### 2. Player Email Structure
```typescript
interface PlayerEmailData {
    [emailId: string]: EmailEntity;
}

// ตัวอย่าง:
{
    "123456791": {
        "id": 123456791,
        "serverid": 1,
        "title": "Private Message",
        "content": "Hello from admin!",
        "items": [{"i": 2001, "n": 1}],
        "state": 0,
        "sender": "admin",
        "owner": "281475295236133",
        "time": "2025-01-15T12:00:00.000Z"
    }
}
```

## API Functions สำหรับจัดการ Redis Cache

### 1. Global Email Functions

#### Get Global Email
```typescript
async function getGlobalEmail(serverid: number): Promise<EmailList> {
    const key = `${GAME_SKU}_s${serverid}_email`;
    let emails = await gameCacheService.getJSON(key);
    return emails || {};
}
```

#### Save Global Email
```typescript
async function saveGlobalEmail(serverid: number, emails: EmailList): Promise<boolean> {
    if (!emails) {
        return false;
    }
    
    const key = `${GAME_SKU}_s${serverid}_email`;
    await gameCacheService.setJSON(key, emails);
    return true;
}
```

#### Add Global Email
```typescript
async function addGlobalEmail(serverid: number, emailEntity: EmailEntity): Promise<boolean> {
    try {
        // 1. ดึงข้อมูล global email ปัจจุบัน
        const emails = await getGlobalEmail(serverid);
        
        // 2. ตรวจสอบว่า email ID ซ้ำหรือไม่
        if (emails[emailEntity.id]) {
            throw new Error(`Email ID ${emailEntity.id} already exists`);
        }
        
        // 3. เพิ่ม email ใหม่
        emails[emailEntity.id] = emailEntity;
        
        // 4. บันทึกลง Redis
        await saveGlobalEmail(serverid, emails);
        
        return true;
    } catch (error) {
        console.error('Add global email error:', error);
        return false;
    }
}
```

### 2. Player Email Functions

#### Get Player Email
```typescript
async function getPlayerEmail(serverid: number, roleId: string): Promise<EmailList> {
    const key = `${GAME_SKU}_${serverid}_${roleId}_email`;
    let emails = await gameCacheService.getJSON(key);
    return emails || {};
}
```

#### Update Player Email
```typescript
async function updatePlayerEmail(serverid: number, roleId: string, emails: EmailList, saveTime: number = 3600): Promise<void> {
    if (!emails) {
        return;
    }
    
    const key = `${GAME_SKU}_${serverid}_${roleId}_email`;
    await gameCacheService.setJSON(key, emails, saveTime);
}
```

#### Add Player Email
```typescript
async function addPlayerEmail(serverid: number, roleId: string, emailEntity: EmailEntity): Promise<boolean> {
    try {
        // 1. ดึงข้อมูล player email ปัจจุบัน
        const emails = await getPlayerEmail(serverid, roleId);
        
        // 2. ตรวจสอบว่า email ID ซ้ำหรือไม่
        if (emails[emailEntity.id]) {
            throw new Error(`Email ID ${emailEntity.id} already exists`);
        }
        
        // 3. เพิ่ม email ใหม่
        emails[emailEntity.id] = emailEntity;
        
        // 4. บันทึกลง Redis
        await updatePlayerEmail(serverid, roleId, emails);
        
        return true;
    } catch (error) {
        console.error('Add player email error:', error);
        return false;
    }
}
```

## Send Email API Implementation

### 1. Send Email Function
```typescript
async function sendEmail(sendEmailDto: SendEmailDto): Promise<EmailResult> {
    const result: EmailResult = {
        ok: false,
        msg: '',
        srctype: 'EMAIL_SEND'
    };
    
    try {
        // 1. สร้าง Email Entity
        const emailEntity: EmailEntity = {
            id: generateEmailId(),
            serverid: sendEmailDto.serverid,
            title: sendEmailDto.title,
            content: sendEmailDto.content,
            items: sendEmailDto.items,
            state: 0, // UNREAD
            sender: sendEmailDto.sender,
            owner: sendEmailDto.owner,
            time: new Date().toISOString()
        };
        
        // 2. ตรวจสอบประเภทอีเมล
        if (sendEmailDto.owner === 'GLOBAL') {
            // Global Email
            const success = await addGlobalEmail(sendEmailDto.serverid, emailEntity);
            if (success) {
                result.ok = true;
                result.msg = 'Global email sent successfully';
            } else {
                result.msg = 'Failed to send global email';
            }
        } else {
            // Player Email
            const success = await addPlayerEmail(sendEmailDto.serverid, sendEmailDto.owner, emailEntity);
            if (success) {
                result.ok = true;
                result.msg = 'Player email sent successfully';
            } else {
                result.msg = 'Failed to send player email';
            }
        }
        
    } catch (error) {
        result.msg = `Send email error: ${error.message}`;
        console.error('Send email error:', error);
    }
    
    return result;
}
```

### 2. Get Email List Function
```typescript
async function getEmailList(serverid: number, roleId: string): Promise<EmailListResult> {
    const result: EmailListResult = {
        ok: false,
        msg: '',
        emails: {},
        globalEmails: {}
    };
    
    try {
        // 1. ดึงข้อมูล player email
        const playerEmails = await getPlayerEmail(serverid, roleId);
        result.emails = playerEmails;
        
        // 2. ดึงข้อมูล global email
        const globalEmails = await getGlobalEmail(serverid);
        result.globalEmails = globalEmails;
        
        result.ok = true;
        result.msg = 'Email list retrieved successfully';
        
    } catch (error) {
        result.msg = `Get email list error: ${error.message}`;
        console.error('Get email list error:', error);
    }
    
    return result;
}
```

## Redis Cache Management

### 1. Cache Expiration
```typescript
// ตั้งค่า TTL สำหรับ email cache
const EMAIL_CACHE_TTL = 3600; // 1 hour

// ตัวอย่างการตั้งค่า TTL
await gameCacheService.setJSON(key, data, EMAIL_CACHE_TTL);
```

### 2. Cache Cleanup
```typescript
async function cleanupExpiredEmails(serverid: number, roleId: string): Promise<void> {
    try {
        const emails = await getPlayerEmail(serverid, roleId);
        const now = new Date();
        const expiredEmails = [];
        
        // หาอีเมลที่หมดอายุ (เช่น 30 วัน)
        for (const [emailId, email] of Object.entries(emails)) {
            const emailDate = new Date(email.time);
            const daysDiff = (now.getTime() - emailDate.getTime()) / (1000 * 3600 * 24);
            
            if (daysDiff > 30) {
                expiredEmails.push(emailId);
            }
        }
        
        // ลบอีเมลที่หมดอายุ
        for (const emailId of expiredEmails) {
            delete emails[emailId];
        }
        
        // บันทึกข้อมูลที่อัปเดตแล้ว
        await updatePlayerEmail(serverid, roleId, emails);
        
    } catch (error) {
        console.error('Cleanup expired emails error:', error);
    }
}
```

### 3. Cache Synchronization
```typescript
async function syncGlobalEmailToPlayer(serverid: number, roleId: string): Promise<void> {
    try {
        // 1. ดึงข้อมูล global email
        const globalEmails = await getGlobalEmail(serverid);
        
        // 2. ดึงข้อมูล player email
        const playerEmails = await getPlayerEmail(serverid, roleId);
        
        // 3. ตรวจสอบ global email ใหม่ที่ยังไม่ได้ sync
        for (const [emailId, globalEmail] of Object.entries(globalEmails)) {
            if (!playerEmails[emailId] && globalEmail.state !== EEmailState.Deleted) {
                // เพิ่ม global email ใหม่เข้า player email
                playerEmails[emailId] = {
                    ...globalEmail,
                    state: EEmailState.UNREAD
                };
            }
        }
        
        // 4. บันทึกข้อมูลที่อัปเดตแล้ว
        await updatePlayerEmail(serverid, roleId, playerEmails);
        
    } catch (error) {
        console.error('Sync global email error:', error);
    }
}
```

## Error Handling

### 1. Redis Connection Error
```typescript
async function handleRedisError(error: any, operation: string): Promise<void> {
    console.error(`Redis ${operation} error:`, error);
    
    // Log error to monitoring system
    // Send alert to administrators
    // Implement fallback mechanism if needed
}
```

### 2. Data Validation
```typescript
function validateEmailEntity(emailEntity: EmailEntity): boolean {
    if (!emailEntity.id || !emailEntity.serverid || !emailEntity.title) {
        return false;
    }
    
    if (!emailEntity.owner || !emailEntity.sender) {
        return false;
    }
    
    if (!emailEntity.time) {
        return false;
    }
    
    return true;
}
```

## Performance Optimization

### 1. Batch Operations
```typescript
async function batchUpdateEmails(updates: EmailUpdate[]): Promise<void> {
    const pipeline = gameCacheService.pipeline();
    
    for (const update of updates) {
        const key = `${GAME_SKU}_${update.serverid}_${update.roleId}_email`;
        pipeline.setJSON(key, update.emails);
    }
    
    await pipeline.exec();
}
```

### 2. Memory Management
```typescript
async function optimizeEmailCache(serverid: number, roleId: string): Promise<void> {
    const emails = await getPlayerEmail(serverid, roleId);
    
    // ลบอีเมลที่อ่านแล้วและรับของแล้ว (state = 3)
    for (const [emailId, email] of Object.entries(emails)) {
        if (email.state === EEmailState.Received) {
            delete emails[emailId];
        }
    }
    
    await updatePlayerEmail(serverid, roleId, emails);
}
```

## Monitoring and Logging

### 1. Email Statistics
```typescript
async function getEmailStatistics(serverid: number): Promise<EmailStats> {
    const globalEmails = await getGlobalEmail(serverid);
    
    return {
        totalGlobalEmails: Object.keys(globalEmails).length,
        unreadGlobalEmails: Object.values(globalEmails).filter(e => e.state === EEmailState.UNREAD).length,
        lastGlobalEmailTime: Math.max(...Object.values(globalEmails).map(e => new Date(e.time).getTime()))
    };
}
```

### 2. Cache Hit Rate
```typescript
async function monitorCachePerformance(): Promise<CacheStats> {
    // Implement cache hit rate monitoring
    // Track Redis response times
    // Monitor memory usage
    return {
        hitRate: 0.95,
        avgResponseTime: 5,
        memoryUsage: '2.5MB'
    };
}
```

## ตัวอย่างการใช้งาน

### 1. ส่ง Global Email
```typescript
const globalEmailDto: SendEmailDto = {
    serverid: 1,
    title: "Server Maintenance",
    content: "Server will be down for maintenance",
    items: [{"i": 1001, "n": 100}],
    sender: "admin",
    owner: "GLOBAL"
};

const result = await sendEmail(globalEmailDto);
```

### 2. ส่ง Player Email
```typescript
const playerEmailDto: SendEmailDto = {
    serverid: 1,
    title: "Welcome Gift",
    content: "Welcome to our game!",
    items: [{"i": 1002, "n": 50}],
    sender: "system",
    owner: "281475295236133"
};

const result = await sendEmail(playerEmailDto);
```

### 3. ดึงรายการอีเมล
```typescript
const emailList = await getEmailList(1, "281475295236133");
console.log('Player emails:', emailList.emails);
console.log('Global emails:', emailList.globalEmails);
```

## หมายเหตุสำคัญ

1. **Redis Key Naming**: ใช้รูปแบบที่สอดคล้องกับระบบเดิม
2. **Data Consistency**: ตรวจสอบข้อมูลก่อนบันทึก
3. **Error Handling**: จัดการ error อย่างเหมาะสม
4. **Performance**: ใช้ batch operations เมื่อเป็นไปได้
5. **Monitoring**: ติดตาม performance และ error rates
6. **Backup**: มี fallback mechanism สำหรับกรณี Redis ล้มเหลว
