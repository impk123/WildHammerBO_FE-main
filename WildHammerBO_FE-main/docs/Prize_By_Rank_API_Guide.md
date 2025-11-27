# 🏆 Prize By Rank API - คู่มือสำหรับ Admin

## 📋 ภาพรวม
API สำหรับจัดการตาราง `prize_by_rank` และ `prize_setting` ที่ใช้ในการตั้งค่ารางวัลตามอันดับและระบบ token ของเกม

## 🗄️ โครงสร้างตาราง

### prize_setting
```sql
CREATE TABLE `prize_setting` (
  `id` int NOT NULL,
  `serverid` int NOT NULL,
  `initial_prize` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tota_buytoken` decimal(10,2) NOT NULL DEFAULT '0.00',
  `percent_addon` decimal(10,2) NOT NULL,
  `addon_prize` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

### prize_by_rank
```sql
CREATE TABLE `prize_by_rank` (
  `id` int NOT NULL,
  `serverid` int NOT NULL,
  `from_rank` int NOT NULL,
  `to_rank` int NOT NULL,
  `percent_prize` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## 🔗 API Endpoints

### 1. Prize Settings API

#### 1.1 อัพเดทการตั้งค่าทั้งหมด (Update All Settings)
**Endpoint:** `PUT /api/prizeSettings/update`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** อัพเดทค่าทั้งหมดในตาราง prize_setting ตาม serverid

#### Request Body:
```json
{
  "serverid": 1,
  "initial_prize": 10000.00,
  "tota_buytoken": 0.00,
  "percent_addon": 5.00,
  "addon_prize": 0.00
}
```

**⚠️ หมายเหตุ:** API จะอัพเดทข้อมูลตาม `serverid` ที่ระบุ โดยไม่ต้องระบุ `id` แยกต่างหาก

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "serverid": 1,
    "initial_prize": "10000.00",
    "tota_buytoken": "0.00",
    "percent_addon": "5.00",
    "addon_prize": "0.00"
  },
  "message": "Prize setting updated successfully"
}
```

#### 1.2 เพิ่ม Total Buy Token (Increase Total Buy Token)
**Endpoint:** `POST /api/prizeSettings/increase-total-buytoken`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** เพิ่มค่า tota_buytoken และคำนวณ addon_prize ใหม่

#### Request Body:
```json
{
  "serverid": 1,
  "increase_amount": 100.00
}
```

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "serverid": 1,
    "initial_prize": "10000.00",
    "tota_buytoken": "100.00",
    "percent_addon": "5.00",
    "addon_prize": "5.00"
  },
  "message": "Total buytoken increased by 100"
}
```

---

### 2. Prize By Rank API

#### 2.1 ดูข้อมูลทั้งหมด (Get All Prize By Rank)
**Endpoint:** `GET /api/prizeByRank/`  
**Authentication:** ไม่ต้องใช้  
**Description:** ดูข้อมูล prize by rank ทั้งหมด

#### Query Parameters:
- `serverid` (optional): กรองตาม server
- `from_rank` (optional): กรองตาม from_rank
- `to_rank` (optional): กรองตาม to_rank
- `min_percent` (optional): กรองตาม percent_prize ต่ำสุด
- `max_percent` (optional): กรองตาม percent_prize สูงสุด
- `limit` (optional): จำกัดจำนวนผลลัพธ์
- `offset` (optional): ข้ามจำนวนผลลัพธ์

#### Example:
```bash
GET /api/prizeByRank/?serverid=1&limit=10
```

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "serverid": 1,
      "from_rank": 1,
      "to_rank": 1,
      "percent_prize": "60.00"
    },
    {
      "id": 2,
      "serverid": 1,
      "from_rank": 2,
      "to_rank": 2,
      "percent_prize": "20.00"
    }
  ],
  "count": 2
}
```

#### 2.2 ดูข้อมูลตาม ID (Get Prize By Rank By ID)
**Endpoint:** `GET /api/prizeByRank/{id}`  
**Authentication:** ไม่ต้องใช้  
**Description:** ดูข้อมูล prize by rank ตาม ID

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "serverid": 1,
    "from_rank": 1,
    "to_rank": 1,
    "percent_prize": "60.00"
  }
}
```

#### 2.3 สร้างข้อมูลใหม่ (Create Prize By Rank)
**Endpoint:** `POST /api/prizeByRank/`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** สร้างข้อมูล prize by rank ใหม่

#### Request Body:
```json
{
  "serverid": 1,
  "from_rank": 1,
  "to_rank": 1,
  "percent_prize": 60.00
}
```

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "serverid": 1,
    "from_rank": 1,
    "to_rank": 1,
    "percent_prize": "60.00"
  },
  "message": "Prize by rank record created successfully"
}
```

#### 2.4 อัพเดทข้อมูล (Update Prize By Rank)
**Endpoint:** `PUT /api/prizeByRank/{id}`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** อัพเดทข้อมูล prize by rank

#### Request Body:
```json
{
  "from_rank": 1,
  "to_rank": 1,
  "percent_prize": 65.00
}
```

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "serverid": 1,
    "from_rank": 1,
    "to_rank": 1,
    "percent_prize": "65.00"
  },
  "message": "Prize by rank record updated successfully"
}
```

#### 2.5 ลบข้อมูล (Delete Prize By Rank)
**Endpoint:** `DELETE /api/prizeByRank/{id}`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** ลบข้อมูล prize by rank

#### Response:
```json
{
  "success": true,
  "message": "Prize by rank record deleted successfully"
}
```

#### 2.6 ดูข้อมูลสรุป (Summary Prize By Rank)
**Endpoint:** `GET /api/prizeByRank/summary`  
**Authentication:** ไม่ต้องใช้  
**Description:** ดูข้อมูลสรุปที่รวมข้อมูลจาก prize_setting และ prize_by_rank

#### Query Parameters:
- `serverid` (optional): ระบุ server (default: 1)

#### Example:
```bash
GET /api/prizeByRank/summary?serverid=1
```

#### Response:
```json
{
  "success": true,
  "data": {
    "serverid": 1,
    "prize_setting": {
      "initial_prize": 10000.00,
      "tota_buytoken": 0.00,
      "percent_addon": 5.00,
      "addon_prize": 0.00,
      "total_prize_pool": 10000.00
    },
    "prize_by_rank": [
      {
        "id": 1,
        "serverid": 1,
        "rank": "1",
        "from_rank": 1,
        "to_rank": 1,
        "percent_prize": 60.00,
        "prize_amount": 6000.00
      },
      {
        "id": 2,
        "serverid": 1,
        "rank": "2",
        "from_rank": 2,
        "to_rank": 2,
        "percent_prize": 20.00,
        "prize_amount": 2000.00
      },
      {
        "id": 3,
        "serverid": 1,
        "rank": "3",
        "from_rank": 3,
        "to_rank": 3,
        "percent_prize": 15.00,
        "prize_amount": 1500.00
      },
      {
        "id": 4,
        "serverid": 1,
        "rank": "4-200",
        "from_rank": 4,
        "to_rank": 200,
        "percent_prize": 5.00,
        "prize_amount": 500.00
      }
    ],
    "summary": {
      "total_percentage": 100.00,
      "is_complete": true,
      "total_records": 4
    }
  },
  "message": "Summary data retrieved successfully"
}
```

#### 2.7 สร้างข้อมูลหลายรายการ (Bulk Create)
**Endpoint:** `POST /api/prizeByRank/bulk`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** สร้างข้อมูล prize by rank หลายรายการพร้อมกัน

#### Request Body:
```json
{
  "records": [
    {
      "serverid": 1,
      "from_rank": 1,
      "to_rank": 1,
      "percent_prize": 60.00
    },
    {
      "serverid": 1,
      "from_rank": 2,
      "to_rank": 2,
      "percent_prize": 20.00
    }
  ]
}
```

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "serverid": 1,
      "from_rank": 1,
      "to_rank": 1,
      "percent_prize": "60.00"
    },
    {
      "id": 2,
      "serverid": 1,
      "from_rank": 2,
      "to_rank": 2,
      "percent_prize": "20.00"
    }
  ],
  "errors": [],
  "created_count": 2,
  "error_count": 0,
  "message": "Created 2 records, 0 errors"
}
```

## 🔐 การ Authentication

### วิธีการรับ Token:
1. Login ผ่าน `/api/auth/login`
2. ใช้ Bearer Token ที่ได้รับใน Header:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

### Endpoints ที่ต้องใช้ Authentication:
- `PUT /api/prizeSettings/update`
- `POST /api/prizeSettings/increase-total-buytoken`
- `POST /api/prizeByRank/`
- `PUT /api/prizeByRank/{id}`
- `DELETE /api/prizeByRank/{id}`
- `POST /api/prizeByRank/bulk`

### Endpoints ที่ไม่ต้องใช้ Authentication:
- `GET /api/prizeByRank/`
- `GET /api/prizeByRank/{id}`
- `GET /api/prizeByRank/summary`
- `GET /api/prizeByRank/rank/{rank}`
- `GET /api/prizeByRank/stats/overview`
- `GET /api/prizeByRank/stats/overlaps`

## 📊 ตัวอย่างการใช้งาน

### สถานการณ์ที่ 1: ตั้งค่า Prize Setting สำหรับ Server 1
```bash
curl -X PUT http://localhost:3500/api/prizeSettings/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "serverid": 1,
    "initial_prize": 10000.00,
    "tota_buytoken": 0.00,
    "percent_addon": 5.00,
    "addon_prize": 0.00
  }'
```

### สถานการณ์ที่ 2: เพิ่ม Token สำหรับ Server 1
```bash
curl -X POST http://localhost:3500/api/prizeSettings/increase-total-buytoken \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "serverid": 1,
    "increase_amount": 200.00
  }'
```

### สถานการณ์ที่ 3: สร้าง Prize By Rank สำหรับ Server 1
```bash
curl -X POST http://localhost:3500/api/prizeByRank/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "serverid": 1,
    "from_rank": 1,
    "to_rank": 1,
    "percent_prize": 60.00
  }'
```

### สถานการณ์ที่ 4: ดูข้อมูลสรุปสำหรับ Server 1
```bash
curl http://localhost:3500/api/prizeByRank/summary?serverid=1
```

## ⚠️ ข้อควรระวัง

1. **Server ID**: ทุก API ต้องระบุ `serverid` เพื่อแยกข้อมูลตาม server
2. **Rank Range**: `from_rank` ต้องไม่มากกว่า `to_rank`
3. **Duplicate Check**: ระบบจะตรวจสอบ rank range ที่ซ้ำกันใน server เดียวกัน
4. **Percentage Validation**: ตรวจสอบว่า percent_prize รวมเป็น 100% หรือไม่
5. **Decimal Precision**: ข้อมูลจะถูกเก็บเป็น decimal(10,2) (ทศนิยม 2 ตำแหน่ง)

## 🧪 การทดสอบ

### ตรวจสอบข้อมูลปัจจุบัน:
```bash
# ดูข้อมูลสรุป
curl http://localhost:3500/api/prizeByRank/summary?serverid=1

# ดูข้อมูลทั้งหมด
curl http://localhost:3500/api/prizeByRank/?serverid=1
```

## 📝 Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | สำเร็จ |
| 201 | สร้างข้อมูลสำเร็จ |
| 400 | ข้อมูลไม่ถูกต้อง หรือ Missing required fields |
| 401 | ไม่มี Authentication Token |
| 404 | ไม่พบข้อมูล |
| 500 | Server Error |

## 🔧 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย:

1. **401 Unauthorized**
   - ตรวจสอบ Bearer Token
   - ตรวจสอบ Token หมดอายุหรือไม่

2. **400 Bad Request**
   - ตรวจสอบ required fields (serverid, from_rank, to_rank, percent_prize)
   - ตรวจสอบ data type (ต้องเป็น number)
   - ตรวจสอบ from_rank <= to_rank

3. **404 Not Found**
   - ตรวจสอบ id ในตาราง
   - ตรวจสอบ serverid ว่าถูกต้องหรือไม่
   - ตรวจสอบการเชื่อมต่อฐานข้อมูล

4. **Duplicate Rank Range**
   - ตรวจสอบว่า rank range ไม่ซ้ำกันใน server เดียวกัน

## 📞 การติดต่อ
หากมีปัญหาการใช้งาน API กรุณาติดต่อทีมพัฒนา
