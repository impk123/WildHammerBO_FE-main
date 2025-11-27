# คู่มือการสร้าง Equipment ด้วย einfo และ eid

## Overview
คู่มือนี้จะอธิบายการสร้าง equipment ที่มี attribute ที่กำหนดไว้แล้ว (einfo) และการสร้าง unique ID (eid) สำหรับ equipment

## 1. ความแตกต่างระหว่าง q และ einfo

### 1.1 ใช้ `q` (Random Attribute)
```typescript
// ระบบจะ random attribute อัตโนมัติ
{
  "i": 10080,  // Equipment ID
  "n": 1,      // จำนวน
  "q": 7       // Quality (ระบบจะ random bper, add.1, add.2)
}
```

### 1.2 ใช้ `einfo` (Fixed Attribute)
```typescript
// กำหนด attribute ที่ต้องการ
{
  "i": 10080,  // Equipment ID
  "n": 1,      // จำนวน
  "einfo": {   // Equipment object ที่สร้างไว้แล้ว
    "id": 10080,
    "qid": 7,
    "eid": "unique_equip_id_123",
    "bper": 2500,
    "add": {
      "1": { "14": 400 },
      "2": { "19": 400 }
    }
  }
}
```

## 2. โครงสร้าง EquipEntity

```typescript
export class EquipEntity {
  /** 装备ID - Equipment ID จาก GameEquip.json */
  id: number;
  
  /** 品质ID - Quality ID (1-9) */
  qid: number;
  
  /** 唯一ID - Unique Equipment ID */
  eid?: string;
  
  /** 基础属性加成 - Base Percentage (0-10000) */
  bper: number;
  
  /** 基础属性 - Base Attributes */
  battr?: Record<number, number>;
  
  /** 附加词条 - Additional Attributes */
  add?: EquipAddRecord;
  
  /** 临时装备 对比英雄ID - Temporary Equipment Hero ID */
  tmphid?: number;
}
```

## 3. การสร้าง eid (Equipment Unique ID)

### 3.1 ระบบ Snowflake ID
```typescript
// ใน GameDataService
getEquipEID() {
  return String(this.equipGenID.NextNumber())
}
```

### 3.2 การตั้งค่า Snowflake ID
```typescript
// Environment Variables
WORKER_ID=1                    // Worker ID
equipid_workerIdBitLength=10   // Worker ID bit length
equipid_baseTime=1640995200000 // Base time (milliseconds)
equipid_eqBitLength=12         // Sequence bit length
```

### 3.3 ตัวอย่างการสร้าง eid
```typescript
// วิธีที่ 1: ใช้ระบบ Snowflake ID
const eid = gameDataService.getEquipEID();
// ผลลัพธ์: "1234567890123456789"

// วิธีที่ 2: สร้างเอง (ไม่แนะนำ)
const eid = `equip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// ผลลัพธ์: "equip_1640995200000_abc123def"
```

## 4. การสร้าง einfo Equipment

### 4.1 ฟังก์ชันสร้าง Equipment
```typescript
function createEinfoEquipment(
  equipId: number,
  quality: number,
  bper: number,
  addAttributes?: EquipAddRecord
): EquipEntity {
  return {
    id: equipId,
    qid: quality,
    eid: generateUniqueEID(), // ต้องสร้าง unique ID
    bper: bper,
    add: addAttributes
  };
}
```

### 4.2 ตัวอย่างการสร้าง Equipment พิเศษ
```typescript
// อาวุธ Level 80 Quality 7 พร้อม attribute เฉพาะ
const specialWeapon: EquipEntity = {
  id: 10080,           // อาวุธ Level 80
  qid: 7,              // Quality 7 (神话)
  eid: "weapon_001",   // Unique ID
  bper: 3000,          // Base percentage 30%
  add: {
    "1": { "14": 500 }, // Add attribute 1: Critical Rate +500
    "2": { "19": 300 }  // Add attribute 2: Critical Damage +300
  }
};
```

## 5. Attribute ID Mapping

### 5.1 ตัวอย่าง Attribute IDs
```typescript
const ATTRIBUTE_IDS = {
  // Basic Attributes
  HP: 2,              // HP
  ATK: 3,             // Attack
  DEF: 4,             // Defense
  ATK_SPEED: 5,       // Attack Speed
  
  // Advanced Attributes
  CRIT_RATE: 14,      // Critical Rate
  CRIT_DAMAGE: 19,    // Critical Damage
  DODGE: 20,          // Dodge
  HIT: 21,            // Hit Rate
  
  // Elemental Attributes
  FIRE_ATK: 30,       // Fire Attack
  WATER_ATK: 31,      // Water Attack
  EARTH_ATK: 32,      // Earth Attack
  WIND_ATK: 33,       // Wind Attack
};
```

### 5.2 ตัวอย่างการสร้าง Equipment ตาม Attribute
```typescript
// อาวุธ Critical Rate สูง
const critWeapon: EquipEntity = {
  id: 10080,
  qid: 7,
  eid: "crit_weapon_001",
  bper: 2500,
  add: {
    "1": { "14": 800 },  // Critical Rate +800
    "2": { "19": 400 }   // Critical Damage +400
  }
};

// อาวุธ Elemental Attack
const fireWeapon: EquipEntity = {
  id: 10080,
  qid: 7,
  eid: "fire_weapon_001",
  bper: 2000,
  add: {
    "1": { "30": 600 },  // Fire Attack +600
    "2": { "3": 500 }    // Base Attack +500
  }
};
```

## 6. การส่ง Equipment ผ่าน Email

### 6.1 ส่ง Equipment Random
```typescript
const randomEquipmentEmail = {
  title: "Random Equipment Reward",
  content: "You received a random equipment!",
  items: [
    {
      i: 10080,  // Equipment ID
      n: 1,      // จำนวน
      q: 7       // Quality (ระบบจะ random attribute)
    }
  ]
};
```

### 6.2 ส่ง Equipment Fixed
```typescript
const fixedEquipmentEmail = {
  title: "Special Equipment Reward",
  content: "You received a special equipment with fixed attributes!",
  items: [
    {
      i: 10080,  // Equipment ID
      n: 1,      // จำนวน
      einfo: {   // Equipment object ที่กำหนดไว้แล้ว
        id: 10080,
        qid: 7,
        eid: "special_weapon_001",
        bper: 3000,
        add: {
          "1": { "14": 600 },
          "2": { "19": 500 }
        }
      }
    }
  ]
};
```

## 7. การตรวจสอบ Equipment

### 7.1 ตรวจสอบ eid ซ้ำ
```typescript
function checkEquipEIDExists(eid: string, equipBag: EquipEntityRecord): boolean {
  return equipBag[eid] !== undefined;
}
```

### 7.2 ตรวจสอบ Equipment Validity
```typescript
function validateEquipment(equip: EquipEntity): boolean {
  // ตรวจสอบ Equipment ID
  if (!TableGameEquip.getVal(equip.id, TableGameEquip.field_pos)) {
    return false;
  }
  
  // ตรวจสอบ Quality
  if (!TableGameEquipQuality.checkHave(equip.qid)) {
    return false;
  }
  
  // ตรวจสอบ bper range
  if (equip.bper < 0 || equip.bper > 10000) {
    return false;
  }
  
  // ตรวจสอบ eid
  if (!equip.eid || equip.eid.length === 0) {
    return false;
  }
  
  return true;
}
```

## 8. ตัวอย่างการใช้งานจริง

### 8.1 สร้าง Event Equipment
```typescript
// สร้าง equipment สำหรับ event พิเศษ
function createEventEquipment(eventType: string): EquipEntity {
  const baseEquipId = 10080; // อาวุธ Level 80
  const quality = 8;         // Quality 8 (天诛)
  
  let addAttributes: EquipAddRecord = {};
  
  switch (eventType) {
    case "CRITICAL":
      addAttributes = {
        "1": { "14": 1000 },  // Critical Rate +1000
        "2": { "19": 800 }    // Critical Damage +800
      };
      break;
      
    case "ELEMENTAL":
      addAttributes = {
        "1": { "30": 800 },   // Fire Attack +800
        "2": { "31": 800 }    // Water Attack +800
      };
      break;
      
    case "BALANCED":
      addAttributes = {
        "1": { "3": 600 },    // Attack +600
        "2": { "2": 1200 }    // HP +1200
      };
      break;
  }
  
  return {
    id: baseEquipId,
    qid: quality,
    eid: `event_${eventType}_${Date.now()}`,
    bper: 3500, // 35% base bonus
    add: addAttributes
  };
}
```

### 8.2 สร้าง Reward Equipment
```typescript
// สร้าง equipment สำหรับ reward
function createRewardEquipment(rewardLevel: number): EquipEntity {
  const equipId = 10080;
  const quality = Math.min(7 + rewardLevel, 9); // Quality 7-9
  
  return {
    id: equipId,
    qid: quality,
    eid: `reward_${rewardLevel}_${Date.now()}`,
    bper: 2000 + (rewardLevel * 500), // 20% + (level * 5%)
    add: {
      "1": { "3": 400 + (rewardLevel * 100) }, // Attack bonus
      "2": { "2": 800 + (rewardLevel * 200) }  // HP bonus
    }
  };
}
```

## 9. Best Practices

### 9.1 การตั้งชื่อ eid
```typescript
// ใช้รูปแบบที่เข้าใจง่าย
const eidPatterns = {
  event: `event_${eventType}_${timestamp}`,
  reward: `reward_${level}_${timestamp}`,
  special: `special_${type}_${id}`,
  custom: `custom_${description}_${timestamp}`
};
```

### 9.2 การจัดการ eid ซ้ำ
```typescript
function generateUniqueEID(prefix: string = "equip"): string {
  let eid: string;
  let attempts = 0;
  const maxAttempts = 100;
  
  do {
    eid = `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    attempts++;
  } while (checkEquipEIDExists(eid, equipBag) && attempts < maxAttempts);
  
  if (attempts >= maxAttempts) {
    throw new Error("Failed to generate unique eid");
  }
  
  return eid;
}
```

### 9.3 การตรวจสอบ Equipment ก่อนส่ง
```typescript
function validateEquipmentBeforeSend(equip: EquipEntity): boolean {
  try {
    // ตรวจสอบ basic validation
    if (!validateEquipment(equip)) {
      return false;
    }
    
    // ตรวจสอบ attribute values
    if (equip.add) {
      for (const [addId, attributes] of Object.entries(equip.add)) {
        for (const [attrId, value] of Object.entries(attributes)) {
          if (value <= 0) {
            console.error(`Invalid attribute value: ${attrId} = ${value}`);
            return false;
          }
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error("Equipment validation error:", error);
    return false;
  }
}
```

## 10. ตัวอย่างการใช้งานใน API

### 10.1 สร้าง Equipment API
```typescript
@Post('/create-equipment')
async createEquipment(@Body() createEquipDto: CreateEquipmentDto) {
  const { equipId, quality, bper, addAttributes } = createEquipDto;
  
  // สร้าง equipment
  const equipment: EquipEntity = {
    id: equipId,
    qid: quality,
    eid: this.gameDataService.getEquipEID(),
    bper: bper,
    add: addAttributes
  };
  
  // ตรวจสอบ validity
  if (!validateEquipmentBeforeSend(equipment)) {
    throw new BadRequestException('Invalid equipment data');
  }
  
  return equipment;
}
```

### 10.2 ส่ง Equipment ผ่าน Email API
```typescript
@Post('/send-equipment-email')
async sendEquipmentEmail(@Body() sendEquipEmailDto: SendEquipmentEmailDto) {
  const { playerId, equipment } = sendEquipEmailDto;
  
  // ตรวจสอบ equipment
  if (!validateEquipmentBeforeSend(equipment)) {
    throw new BadRequestException('Invalid equipment data');
  }
  
  // สร้าง email
  const email: EmailEntity = {
    id: this.gameDataService.getEmailId(),
    serverid: 1,
    title: "Equipment Reward",
    content: "You received a special equipment!",
    items: [
      {
        i: equipment.id,
        n: 1,
        einfo: equipment
      }
    ],
    state: 0,
    sender: "system",
    owner: playerId,
    time: new Date().toISOString()
  };
  
  // ส่ง email
  await this.gameDataService.sendEmail(email);
  
  return { success: true, message: "Equipment email sent successfully" };
}
```

## 11. หมายเหตุสำคัญ

1. **eid ต้อง unique**: ทุก equipment ต้องมี eid ที่ไม่ซ้ำกัน
2. **bper range**: 0-10000 (0%-100%)
3. **Quality range**: 1-9
4. **Add attributes**: ขึ้นอยู่กับ quality (quality 2+ มี add.1, quality 5+ มี add.2)
5. **Validation**: ตรวจสอบ equipment ก่อนส่งเสมอ
6. **Error handling**: จัดการ error อย่างเหมาะสม

## 12. ตัวอย่างการทดสอบ

### 12.1 ทดสอบการสร้าง Equipment
```typescript
// ทดสอบสร้าง equipment
const testEquipment = createEinfoEquipment(
  10080,  // อาวุธ Level 80
  7,      // Quality 7
  2500,   // bper 25%
  {
    "1": { "14": 400 },
    "2": { "19": 400 }
  }
);

console.log("Test Equipment:", testEquipment);
console.log("Is Valid:", validateEquipment(testEquipment));
```

### 12.2 ทดสอบการส่ง Email
```typescript
// ทดสอบส่ง equipment ผ่าน email
const testEmail = {
  title: "Test Equipment",
  content: "This is a test equipment",
  items: [
    {
      i: 10080,
      n: 1,
      einfo: testEquipment
    }
  ]
};

console.log("Test Email:", testEmail);
```

คู่มือนี้จะช่วยให้คุณสามารถสร้าง equipment ที่มี attribute ที่กำหนดไว้แล้วและจัดการ unique ID ได้อย่างถูกต้อง!
