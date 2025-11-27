# 🏆 Prize Settings API - คู่มือสำหรับ Admin

## 📋 ภาพรวม
API สำหรับจัดการตาราง `prize_setting` ที่ใช้ในการตั้งค่ารางวัลและระบบ token ของเกม

## 🗄️ โครงสร้างตาราง
```sql
CREATE TABLE `prize_setting` (
  `id` int NOT NULL,
  `initial_prize` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tota_buytoken` decimal(10,2) NOT NULL DEFAULT '0.00',
  `percent_addon` decimal(10,2) NOT NULL,
  `addon_prize` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## 🔗 API Endpoints

### 1. อัพเดทการตั้งค่าทั้งหมด (Update All Settings)
**Endpoint:** `PUT /api/prizeSettings/update`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** อัพเดทค่าทั้งหมดในตาราง prize_setting ที่ id=1

#### Request Body:
```json
{
  "initial_prize": 100.00,
  "tota_buytoken": 500.00,
  "percent_addon": 10.00,
  "addon_prize": 50.00
}
```

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "initial_prize": "100.00",
    "tota_buytoken": "500.00",
    "percent_addon": "10.00",
    "addon_prize": "50.00"
  },
  "message": "Prize setting updated successfully"
}
```

#### cURL Example:
```bash
curl -X PUT http://localhost:3500/api/prizeSettings/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "initial_prize": 100.00,
    "tota_buytoken": 500.00,
    "percent_addon": 10.00,
    "addon_prize": 50.00
  }'
```

---

### 2. เพิ่ม Total Buy Token (Increase Total Buy Token)
**Endpoint:** `POST /api/prizeSettings/increase-total-buytoken`  
**Authentication:** ต้องใช้ Bearer Token  
**Description:** เพิ่มค่า tota_buytoken และคำนวณ addon_prize ใหม่ตาม percent_addon

#### ⚠️ การทำงานพิเศษ:
เมื่อเรียกใช้ API นี้ ระบบจะ:
1. เพิ่ม `tota_buytoken` ตามจำนวนที่ระบุ
2. **คำนวณ `addon_prize` ใหม่** โดยใช้สูตร: `addon_prize = addon_prize * ((percent_addon/100) * increase_amount)`

#### Request Body:
```json
{
  "increase_amount": 100.00
}
```

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "initial_prize": "100.00",
    "tota_buytoken": "600.00",
    "percent_addon": "10.00",
    "addon_prize": "500.00"
  },
  "message": "Total buytoken increased by 100"
}
```

#### cURL Example:
```bash
curl -X POST http://localhost:3500/api/prizeSettings/increase-total-buytoken \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "increase_amount": 100.00
  }'
```

---

### 3. ดูข้อมูล Prize Setting (Get Prize Setting)
**Endpoint:** `GET /api/prizeSettings/{id}`  
**Authentication:** ไม่ต้องใช้ (Public endpoint)  
**Description:** ดูข้อมูล prize setting ตาม ID

#### Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "initial_prize": "100.00",
    "tota_buytoken": "500.00",
    "percent_addon": "10.00",
    "addon_prize": "50.00"
  }
}
```

---

### 4. ดูข้อมูลทั้งหมด (Get All Prize Settings)
**Endpoint:** `GET /api/prizeSettings/`  
**Authentication:** ไม่ต้องใช้ (Public endpoint)  
**Description:** ดูข้อมูล prize settings ทั้งหมด

#### Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "initial_prize": "100.00",
      "tota_buytoken": "500.00",
      "percent_addon": "10.00",
      "addon_prize": "50.00"
    }
  ],
  "count": 1
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

### Endpoints ที่ไม่ต้องใช้ Authentication:
- `GET /api/prizeSettings/{id}`
- `GET /api/prizeSettings/`

## 📊 ตัวอย่างการใช้งาน

### สถานการณ์ที่ 1: ตั้งค่าเริ่มต้น
```bash
# ตั้งค่าทั้งหมดใหม่
curl -X PUT http://localhost:3500/api/prizeSettings/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "initial_prize": 1000.00,
    "tota_buytoken": 0.00,
    "percent_addon": 5.00,
    "addon_prize": 50.00
  }'
```

### สถานการณ์ที่ 2: เพิ่ม Token และคำนวณ Prize ใหม่
```bash
# เพิ่ม 200 token
curl -X POST http://localhost:3500/api/prizeSettings/increase-total-buytoken \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "increase_amount": 200.00
  }'
```

**ผลลัพธ์:**
- `tota_buytoken`: 0.00 → 200.00
- `addon_prize`: 50.00 → 50.00 * ((5/100) * 200) = 50.00 * 10 = 500.00

## ⚠️ ข้อควรระวัง

1. **การคำนวณ addon_prize**: เมื่อใช้ `increase-total-buytoken` ระบบจะคำนวณ `addon_prize` ใหม่โดยอัตโนมัติ
2. **Decimal Precision**: ข้อมูลจะถูกเก็บเป็น decimal(10,2) (ทศนิยม 2 ตำแหน่ง)
3. **ID เริ่มต้น**: API ทำงานกับ id=1 เป็นหลัก
4. **Error Handling**: ตรวจสอบ response status และ error message เสมอ

## 🧪 การทดสอบ

### ใช้ Test Interface:
เปิดเบราว์เซอร์ไปที่: `http://localhost:3500/test-prize-settings.html`

### ตรวจสอบข้อมูล:
```bash
# ดูข้อมูลปัจจุบัน
curl http://localhost:3500/api/prizeSettings/1
```

## 📝 Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | สำเร็จ |
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
   - ตรวจสอบ required fields
   - ตรวจสอบ data type (ต้องเป็น number)

3. **404 Not Found**
   - ตรวจสอบ id ในตาราง prize_setting
   - ตรวจสอบการเชื่อมต่อฐานข้อมูล

## 📞 การติดต่อ
หากมีปัญหาการใช้งาน API กรุณาติดต่อทีมพัฒนา
