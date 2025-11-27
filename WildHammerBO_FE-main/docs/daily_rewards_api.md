# Daily Rewards API Documentation

## Overview
ระบบรับรางวัลประจำวันที่ให้ผู้เล่นสามารถรับรางวัลได้วันละครั้ง โดย Admin สามารถตั้งค่ารางวัลแต่ละวันได้ พร้อมระบบจัดการรอบรางวัล

## Features
- ✅ รับรางวัลได้วันละครั้งเท่านั้น
- ✅ ข้ามวันได้หากไม่รับรางวัลในวันนั้น
- ✅ แยกรางวัลเป็น 3 ประเภท: ไอเท็ม, อาวุธ, Token
- ✅ ระบบจัดการรอบรางวัล (Cycles)
- ✅ กำหนดวันเริ่มต้นและสิ้นสุดของรอบรางวัล
- ✅ คัดลอกรางวัลจากรอบหนึ่งไปอีกรอบ
- ✅ สถิติและรายงานการใช้งาน

## Database Schema

### Tables
- `daily_rewards` - เก็บข้อมูลรางวัลแต่ละวัน
- `daily_reward_claims` - เก็บประวัติการรับรางวัลของผู้เล่น
- `daily_reward_cycles` - เก็บข้อมูลรอบรางวัล

## API Endpoints

### Admin Routes (ต้อง Authentication)

#### 1. Get All Daily Rewards
```
GET /api/dailyRewards/admin/rewards
```

**Query Parameters:**
- `is_active` (optional): 0 หรือ 1
- `day_number` (optional): หมายเลขวัน
- `limit` (optional): จำนวนรายการต่อหน้า (1-100)
- `offset` (optional): ข้ามรายการ

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "day_number": 1,
      "reward_items": [{"item_id": 1001, "quantity": 1000}],
      "reward_equipment": [{"equipment_id": 2001, "quantity": 1}],
      "reward_tokens": 10.00,
      "is_active": 1,
      "total_claims": 25,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Daily rewards retrieved successfully"
}
```

#### 2. Get Reward by Day Number
```
GET /api/dailyRewards/admin/rewards/:dayNumber
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "day_number": 1,
    "reward_items": [{"item_id": 1001, "quantity": 1000}],
    "reward_equipment": [{"equipment_id": 2001, "quantity": 1}],
    "reward_tokens": 10.00,
    "is_active": 1,
    "total_claims": 25
  },
  "message": "Daily reward retrieved successfully"
}
```

#### 3. Create Daily Reward
```
POST /api/dailyRewards/admin/rewards
```

**Request Body:**
```json
{
  "day_number": 1,
  "reward_items": [{"item_id": 1001, "quantity": 1000}],
  "reward_equipment": [{"equipment_id": 2001, "quantity": 1}],
  "reward_tokens": 10.00,
  "is_active": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "day_number": 1,
    "reward_items": [{"item_id": 1001, "quantity": 1000}],
    "reward_equipment": [{"equipment_id": 2001, "quantity": 1}],
    "reward_tokens": 10.00,
    "is_active": 1
  },
  "message": "Daily reward created successfully"
}
```

#### 4. Update Daily Reward
```
PUT /api/dailyRewards/admin/rewards/:dayNumber
```

**Request Body:**
```json
{
  "reward_items": [{"item_id": 1002, "quantity": 1500}],
  "reward_tokens": 15.00,
  "is_active": 0
}
```

#### 5. Delete Daily Reward
```
DELETE /api/dailyRewards/admin/rewards/:dayNumber
```

#### 6. Toggle Reward Status
```
PATCH /api/dailyRewards/admin/rewards/:dayNumber/toggle
```

#### 7. Create Multiple Rewards
```
POST /api/dailyRewards/admin/rewards/bulk-create
```

**Request Body:**
```json
{
  "totalDays": 7,
  "startDate": "2024-01-01",
  "cycleName": "Weekly Rewards Cycle 1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_days": 7,
    "start_date": "2024-01-01",
    "end_date": "2024-01-07",
    "cycle_id": 1
  },
  "message": "Created 7 daily rewards with cycle"
}
```

#### 8. Copy Rewards
```
POST /api/dailyRewards/admin/rewards/copy
```

**Request Body:**
```json
{
  "fromStartDate": "2024-01-01",
  "fromEndDate": "2024-01-07",
  "toStartDate": "2024-02-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "copied_rewards": 7
  },
  "message": "Successfully copied 7 rewards to new cycle"
}
```

#### 9. Get Current Cycle
```
GET /api/dailyRewards/admin/cycles/current
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "cycle_name": "Weekly Rewards Cycle 1",
    "start_date": "2024-01-01",
    "end_date": "2024-01-07",
    "total_days": 7,
    "is_active": 1,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  },
  "message": "Current cycle retrieved successfully"
}
```

#### 10. Get All Cycles
```
GET /api/dailyRewards/admin/cycles
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "cycle_name": "Weekly Rewards Cycle 1",
      "start_date": "2024-01-01",
      "end_date": "2024-01-07",
      "total_days": 7,
      "is_active": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "All cycles retrieved successfully"
}
```

#### 11. Get Statistics
```
GET /api/dailyRewards/admin/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_rewards": 7,
    "active_rewards": 5,
    "inactive_rewards": 2,
    "total_tokens": 175.00,
    "average_tokens": 25.00,
    "total_claims": 150,
    "unique_claimers": 45
  },
  "message": "Statistics retrieved successfully"
}
```

#### 12. Get All Claims
```
GET /api/dailyRewards/admin/claims
```

**Query Parameters:**
- `roleid` (optional): Role ID ของผู้เล่น
- `day_number` (optional): หมายเลขวัน
- `date_from` (optional): วันที่เริ่มต้น
- `date_to` (optional): วันที่สิ้นสุด
- `limit` (optional): จำนวนรายการต่อหน้า
- `offset` (optional): ข้ามรายการ

#### 13. Get Claim Statistics
```
GET /api/dailyRewards/admin/claim-statistics
```

### Client Routes (ไม่ต้อง Authentication แต่ต้องส่ง Token)

#### 1. Get User Progress
```
POST /api/dailyRewards/client/progress
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "roleid": "281382005616677",
    "progress": {
      "last_claimed_day": 3,
      "total_claims": 3,
      "total_available_days": 7
    },
    "recent_claims": [
      {
        "id": 1,
        "day_number": 3,
        "reward_tokens": 20.00,
        "claimed_at": "2024-01-03T10:30:00.000Z"
      }
    ]
  },
  "message": "User progress retrieved successfully"
}
```

#### 2. Claim Daily Reward
```
POST /api/dailyRewards/client/claim
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "dayNumber": 4
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "claim_id": 4,
    "roleid": "281382005616677",
    "day_number": 4,
    "claimed_at": "2024-01-04T10:30:00.000Z",
    "rewards": {
      "reward_items": [{"item_id": 1004, "quantity": 750}],
      "reward_equipment": [{"equipment_id": 2004, "quantity": 1}],
      "reward_tokens": 25.00
    }
  },
  "message": "Daily reward claimed successfully"
}
```

#### 3. Get User Claim History
```
POST /api/dailyRewards/client/history
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Query Parameters:**
- `limit` (optional): จำนวนรายการต่อหน้า (1-100)
- `offset` (optional): ข้ามรายการ

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "day_number": 3,
      "reward_items": [{"item_id": 1003, "quantity": 2000}],
      "reward_equipment": [{"equipment_id": 2003, "quantity": 1}],
      "reward_tokens": 20.00,
      "claimed_at": "2024-01-03T10:30:00.000Z"
    }
  ],
  "message": "Claim history retrieved successfully"
}
```

### Public Routes

#### 1. Get Available Rewards
```
GET /api/dailyRewards/public/rewards
```

**Query Parameters:**
- `is_active` (optional): 0 หรือ 1
- `limit` (optional): จำนวนรายการต่อหน้า

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Token is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Reward not found for this day"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Data Formats

### Reward Items Format
```json
[
  {
    "item_id": 1001,
    "quantity": 1000
  },
  {
    "item_id": 1002,
    "quantity": 500
  }
]
```

### Reward Equipment Format
```json
[
  {
    "equipment_id": 2001,
    "quantity": 1
  },
  {
    "equipment_id": 2002,
    "quantity": 1
  }
]
```

## Business Rules

1. **การรับรางวัล**: ผู้เล่นสามารถรับรางวัลได้วันละครั้งเท่านั้น
2. **การข้ามวัน**: หากไม่รับรางวัลในวันนั้น จะข้ามไปวันถัดไป
3. **การตรวจสอบ**: ระบบจะตรวจสอบจาก `roleid` ที่ได้จาก JWT token
4. **การตั้งค่า**: Admin สามารถเปิด/ปิดรางวัลแต่ละวันได้
5. **การคัดลอก**: สามารถคัดลอกรางวัลจากรอบหนึ่งไปอีกรอบได้
6. **รอบรางวัล**: ระบบจะสร้างรอบรางวัลพร้อมกับรางวัลแต่ละวัน
7. **วันเริ่มต้น**: Admin กำหนดวันแรกของการรับรางวัลได้
8. **การตั้งชื่อ**: สามารถตั้งชื่อรอบรางวัลได้

## Authentication

### Admin Authentication
Admin routes ต้องใช้ Bearer token ใน Authorization header:
```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Client Authentication
Client routes ต้องส่ง JWT token ใน request body:
```json
{
  "token": "YOUR_GAME_TOKEN"
}
```

## Usage Examples

### 1. Admin สร้างรางวัล 7 วัน
```bash
curl -X POST http://localhost:9100/api/dailyRewards/admin/rewards/bulk-create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "totalDays": 7,
    "startDate": "2024-01-01",
    "cycleName": "Weekly Rewards Cycle 1"
  }'
```

### 2. Admin ดูรอบรางวัลปัจจุบัน
```bash
curl -X GET http://localhost:9100/api/dailyRewards/admin/cycles/current \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 3. Admin ดูรางวัลทั้งหมด
```bash
curl -X GET http://localhost:9100/api/dailyRewards/admin/rewards \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 4. Admin แก้ไขรางวัลวันที่ 1
```bash
curl -X PUT http://localhost:9100/api/dailyRewards/admin/rewards/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "reward_items": [{"item_id": 1001, "quantity": 1000}],
    "reward_tokens": 15.00,
    "is_active": 1
  }'
```

### 5. Admin เปิด/ปิดรางวัลวันที่ 1
```bash
curl -X PATCH http://localhost:9100/api/dailyRewards/admin/rewards/1/toggle \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 6. Admin คัดลอกรางวัล
```bash
curl -X POST http://localhost:9100/api/dailyRewards/admin/rewards/copy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "fromStartDate": "2024-01-01",
    "fromEndDate": "2024-01-07",
    "toStartDate": "2024-02-01"
  }'
```

### 7. Admin ดูสถิติ
```bash
curl -X GET http://localhost:9100/api/dailyRewards/admin/statistics \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 8. ผู้เล่นดูความคืบหน้า
```bash
curl -X POST http://localhost:9100/api/dailyRewards/client/progress \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_GAME_TOKEN"
  }'
```

### 9. ผู้เล่นรับรางวัล
```bash
curl -X POST http://localhost:9100/api/dailyRewards/client/claim \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_GAME_TOKEN",
    "dayNumber": 1
  }'
```

### 10. ผู้เล่นดูประวัติการรับรางวัล
```bash
curl -X POST http://localhost:9100/api/dailyRewards/client/history \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_GAME_TOKEN"
  }'
```

### 11. ดูรางวัลที่เปิดใช้งาน (Public)
```bash
curl -X GET http://localhost:9100/api/dailyRewards/public/rewards?is_active=1
```

## Quick Start Guide

### สำหรับ Admin
1. **สร้างรางวัล**: ใช้ API `POST /admin/rewards/bulk-create` เพื่อสร้างรางวัลหลายวัน
2. **แก้ไขรางวัล**: ใช้ API `PUT /admin/rewards/:dayNumber` เพื่อแก้ไขรางวัลแต่ละวัน
3. **เปิด/ปิดรางวัล**: ใช้ API `PATCH /admin/rewards/:dayNumber/toggle` เพื่อเปิด/ปิดรางวัล
4. **ดูสถิติ**: ใช้ API `GET /admin/statistics` เพื่อดูสถิติการใช้งาน

### สำหรับผู้เล่น
1. **ดูความคืบหน้า**: ใช้ API `POST /client/progress` เพื่อดูความคืบหน้าการรับรางวัล
2. **รับรางวัล**: ใช้ API `POST /client/claim` เพื่อรับรางวัลประจำวัน
3. **ดูประวัติ**: ใช้ API `POST /client/history` เพื่อดูประวัติการรับรางวัล

## Troubleshooting

### ปัญหาที่พบบ่อย

#### 1. Error: "Token is required"
**สาเหตุ**: ไม่ได้ส่ง JWT token ใน request body
**วิธีแก้**: เพิ่ม `token` ใน request body
```json
{
  "token": "YOUR_GAME_TOKEN"
}
```

#### 2. Error: "Reward already claimed for this day"
**สาเหตุ**: ผู้เล่นรับรางวัลในวันนั้นแล้ว
**วิธีแก้**: รอวันถัดไปหรือตรวจสอบประวัติการรับรางวัล

#### 3. Error: "Reward not found for this day"
**สาเหตุ**: ไม่มีรางวัลสำหรับวันนั้น หรือรางวัลถูกปิดใช้งาน
**วิธีแก้**: ตรวจสอบว่ามีรางวัลสำหรับวันนั้นหรือไม่ และเปิดใช้งานรางวัล

#### 4. Error: "Invalid or expired token"
**สาเหตุ**: JWT token ไม่ถูกต้องหรือหมดอายุ
**วิธีแก้**: ใช้ token ใหม่ที่ถูกต้อง

#### 5. Error: "Access token required"
**สาเหตุ**: Admin ไม่ได้ส่ง Authorization header
**วิธีแก้**: เพิ่ม Authorization header
```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

## FAQ

### Q: ผู้เล่นสามารถรับรางวัลได้กี่ครั้งต่อวัน?
A: รับได้วันละครั้งเท่านั้น หากไม่รับในวันนั้น จะข้ามไปวันถัดไป

### Q: สามารถแก้ไขรางวัลหลังจากสร้างแล้วได้หรือไม่?
A: ได้ ใช้ API `PUT /admin/rewards/:dayNumber` เพื่อแก้ไขรางวัล

### Q: ระบบจะรีเซ็ตรอบรางวัลอัตโนมัติหรือไม่?
A: ไม่ ต้องใช้ API `POST /admin/rewards/copy` เพื่อคัดลอกรางวัลไปรอบใหม่

### Q: สามารถดูสถิติการรับรางวัลได้หรือไม่?
A: ได้ Admin สามารถดูสถิติผ่าน API `GET /admin/statistics` และ `GET /admin/claim-statistics`

### Q: รางวัลมีกี่ประเภท?
A: มี 3 ประเภท:
- `reward_items`: ไอเท็มในเกม
- `reward_equipment`: อาวุธและอุปกรณ์
- `reward_tokens`: Token/Currency

### Q: สามารถเปิด/ปิดรางวัลแต่ละวันได้หรือไม่?
A: ได้ ใช้ API `PATCH /admin/rewards/:dayNumber/toggle`

## API Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

- Admin APIs: ไม่มี rate limiting
- Client APIs: ไม่มี rate limiting (แต่จำกัดการรับรางวัลวันละครั้ง)
- Public APIs: ไม่มี rate limiting

## Changelog

### Version 1.0.0 (Current)
- ✅ ระบบรับรางวัลประจำวันพื้นฐาน
- ✅ การจัดการรอบรางวัล (Cycles)
- ✅ กำหนดวันเริ่มต้นและสิ้นสุดของรอบรางวัล
- ✅ คัดลอกรางวัลจากรอบหนึ่งไปอีกรอบ
- ✅ สถิติและรายงานการใช้งาน
- ✅ แยกรางวัลเป็น 3 ประเภท: ไอเท็ม, อาวุธ, Token
- ✅ ระบบเปิด/ปิดรางวัลแต่ละวัน
- ✅ การตรวจสอบการรับรางวัลซ้ำ

## Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:
1. ตรวจสอบ Troubleshooting section
2. ตรวจสอบ FAQ
3. ตรวจสอบ API Response Codes
4. ติดต่อทีมพัฒนา

## License

API นี้เป็นส่วนหนึ่งของ Wild Hammer Sound Backoffice System
