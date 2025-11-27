# คู่มือโครงสร้างอาวุธและอุปกรณ์ (Equipment Structure Guide)

## Overview
คู่มือนี้จะอธิบายโครงสร้างของอาวุธและอุปกรณ์ในเกม รวมถึงการคำนวณค่าต่างๆ และ Attribute ID Mapping ทั้งหมด

## โครงสร้างข้อมูลอาวุธ (Equipment Data Structure)

### 1. EquipEntity Structure
```typescript
interface EquipEntity {
    id: number;           // ID ของอาวุธ (จาก GameEquip.json)
    qid: number;          // Quality ID (คุณภาพ)
    eid?: string;         // Equipment ID (Unique ID)
    bper: number;         // Base Percentage (เปอร์เซ็นต์เพิ่มเติมของค่าพื้นฐาน)
    battr?: Record<number, number>;  // Base Attributes
    add?: EquipAddRecord; // Additional Attributes (คุณสมบัติเพิ่มเติม)
    tmphid?: number;      // Temporary Equipment Hero ID
}
```

### 2. EquipAddRecord Structure
```typescript
// Record<number(词条ID [1-2]), Record<number（属性数字ID）,number（属性值）>>
type EquipAddRecord = Record<number, Record<number, number>>

// ตัวอย่าง:
{
    "1": {
        "14": 400  // Attribute ID 14 = "douleAtk_pro" (连击) = 400
    },
    "2": {
        "19": 400  // Attribute ID 19 = "criticalAtk_pro" (暴击) = 400
    }
}
```

## สูตรการคำนวณ (Calculation Formulas)

### 1. การคำนวณค่าพื้นฐาน + bper
```typescript
// สูตร: val + Math.floor(val * bper / 10000)
function calculateBaseValue(baseValue: number, bper: number): number {
    return baseValue + Math.floor(baseValue * bper / 10000);
}

// ตัวอย่าง:
// baseValue = 1000, bper = 2500 (25%)
// result = 1000 + Math.floor(1000 * 2500 / 10000) = 1000 + 250 = 1250
```

### 2. การคำนวณคุณสมบัติอาวุธทั้งหมด
```typescript
function calculateEquipAttributes(equipEntity: EquipEntity): Record<number, number> {
    let equip_attr: Record<number, number> = {};
    
    // 1. คำนวณค่าพื้นฐาน + bper
    const attr_array = TableGameAttr.getTable();
    for (const numkey in attr_array) {
        const str_key = attr_array[numkey][TableGameAttr.field_strKey];
        const base_value = cur_equip_table[str_key];
        
        if (base_value) {
            equip_attr[numkey] = equip_attr[numkey] || 0;
            // สูตร: base_value + Math.floor(base_value * bper / 10000)
            equip_attr[numkey] += base_value + Math.floor(base_value * equipEntity.bper / 10000);
        }
    }
    
    // 2. เพิ่มค่าจาก add attributes
    if (equipEntity.add) {
        for (const idx in equipEntity.add) {
            const data = equipEntity.add[idx];
            for (const numkey in data) {
                const attr_var = data[numkey];
                equip_attr[numkey] = equip_attr[numkey] || 0;
                equip_attr[numkey] += attr_var;
            }
        }
    }
    
    // 3. เพิ่มค่าจากคุณภาพ (quality)
    if (TableGameEquipQuality.checkHave(equipEntity.qid)) {
        const quality_table = new TableGameEquipQuality(equipEntity.qid);
        for (const attrkey in equip_attr) {
            // สูตร: attr_value + Math.floor(attr_value * quality_rate / 10000)
            equip_attr[attrkey] += Math.floor(equip_attr[attrkey] * quality_table.rate / 10000);
        }
    }
    
    return equip_attr;
}
```

### 3. การคำนวณค่าความแข็งแกร่ง (Fight Point)
```typescript
function calculateFightPoint(equipEntity: EquipEntity): number {
    const equip_attr = calculateEquipAttributes(equipEntity);
    let fight_point = 0;
    
    for (const attrkey in equip_attr) {
        const attr_value = equip_attr[attrkey];
        const zhanli = TableGameAttr.getVal(Number(attrkey), TableGameAttr.field_zhanli);
        fight_point += attr_value * zhanli;
    }
    
    return fight_point;
}
```

## Attribute ID Mapping

### Complete Attribute ID List
| ID | strKey | Name (中文) | Name (English) | zhanli | rate | effect | Description |
|----|--------|-------------|----------------|--------|------|--------|-------------|
| 0 | N | 无效属性 | Invalid Attribute | 0 | 0 | 0 | ไม่มีผล |
| 1 | curhp | 当前生命 | Current HP | 0 | 0 | 0 | HP ปัจจุบัน |
| 2 | hp | 生命 | HP | 1 | 6 | 0 | HP สูงสุด |
| 3 | atk | 攻击 | Attack | 10 | 7 | 0 | พลังโจมตี |
| 4 | def | 防御 | Defense | 5 | 8 | 0 | พลังป้องกัน |
| 5 | atkspeed | 速度 | Attack Speed | 2 | 0 | 0 | ความเร็วโจมตี |
| 6 | hp_rate | 生命加成 | HP Rate | 0 | 0 | 2 | เพิ่มเปอร์เซ็นต์ HP |
| 7 | atk_rate | 攻击加成 | Attack Rate | 0 | 0 | 3 | เพิ่มเปอร์เซ็นต์ ATK |
| 8 | def_rate | 防御加成 | Defense Rate | 0 | 0 | 4 | เพิ่มเปอร์เซ็นต์ DEF |
| 9 | atk_ratio | 攻击比例 | Attack Ratio | 0 | 0 | 0 | อัตราส่วนโจมตี |
| 10 | add_damage | 真实伤害 | True Damage | 15 | 0 | 0 | ความเสียหายแท้ |
| 11 | aktBack_pro | 反击 | Counter Attack | 10 | 0 | 0 | โอกาสตอบโต้ |
| 12 | dec_atkBack_pro | 忽视反击 | Ignore Counter | 5 | 0 | 0 | ลดโอกาสตอบโต้ |
| 13 | aktBack_per | 反击伤害系数 | Counter Damage Ratio | 0 | 0 | 0 | ค่าสัมประสิทธิ์ความเสียหายตอบโต้ |
| 14 | douleAtk_pro | 连击 | Double Attack | 10 | 0 | 0 | โอกาสโจมตีซ้ำ |
| 15 | dec_doubleAtk_pro | 忽视连击 | Ignore Double Attack | 5 | 0 | 0 | ลดโอกาสโจมตีซ้ำ |
| 16 | doubleAtk_per | 连击伤害系数 | Double Attack Damage Ratio | 0 | 0 | 0 | ค่าสัมประสิทธิ์ความเสียหายโจมตีซ้ำ |
| 17 | miss | 闪避 | Dodge | 10 | 0 | 0 | โอกาสหลบหลีก |
| 18 | dec_miss | 忽视闪避 | Ignore Dodge | 5 | 0 | 0 | ลดโอกาสหลบหลีก |
| 19 | criticalAtk_pro | 暴击 | Critical Attack | 10 | 0 | 0 | โอกาสคริติคอล |
| 20 | dec_criticalAtk_pro | 忽视暴击 | Ignore Critical | 5 | 0 | 0 | ลดโอกาสคริติคอล |
| 21 | criticalAtk_per | 暴击伤害系数 | Critical Damage Ratio | 0 | 0 | 0 | ค่าสัมประสิทธิ์ความเสียหายคริติคอล |
| 22 | add_criticalDamage | 暴击伤害 | Critical Damage | 10 | 0 | 0 | ความเสียหายคริติคอล |
| 23 | dec_criticalDamage | 暴伤减免 | Critical Damage Reduction | 5 | 0 | 0 | ลดความเสียหายคริติคอล |
| 24 | add_damage_rate | 伤害增加 | Damage Increase | 30 | 0 | 0 | เพิ่มความเสียหาย |
| 25 | dec_damage_rate | 伤害减免 | Damage Reduction | 30 | 0 | 0 | ลดความเสียหาย |
| 26 | add_askill_pro | 主动技概率 | Active Skill Probability | 40 | 0 | 0 | โอกาสใช้สกิลแอคทีฟ |
| 27 | add_apskill_pro | 追击技概率 | Pursuit Skill Probability | 40 | 0 | 0 | โอกาสใช้สกิลติดตาม |
| 28 | add_askill_dam | 主动技伤害 | Active Skill Damage | 10 | 0 | 0 | ความเสียหายสกิลแอคทีฟ |
| 29 | add_apskill_dam | 追击技伤害 | Pursuit Skill Damage | 10 | 0 | 0 | ความเสียหายสกิลติดตาม |
| 30 | add_hp_per | 治疗效果 | Healing Effect | 10 | 0 | 0 | ผลการรักษา |

## ตัวอย่างการใช้งาน (Usage Examples)

### 1. ตัวอย่างอาวุธ Level 80
```json
{
    "i": 10080,           // Equipment ID
    "q": 7,               // Quality ID
    "add": {
        "1": {
            "14": 400     // Double Attack +400
        },
        "2": {
            "19": 400     // Critical Attack +400
        }
    },
    "bper": 2500          // Base Percentage 25%
}
```

### 2. การคำนวณค่าพื้นฐาน
```typescript
// จาก GameEquip.json ID 10080
const baseStats = {
    hp: 16800,
    atk: 8400,
    def: 405,
    atkspeed: 160
};

// คำนวณด้วย bper = 2500 (25%)
const calculatedStats = {
    hp: 16800 + Math.floor(16800 * 2500 / 10000) = 16800 + 4200 = 21000,
    atk: 8400 + Math.floor(8400 * 2500 / 10000) = 8400 + 2100 = 10500,
    def: 405 + Math.floor(405 * 2500 / 10000) = 405 + 101 = 506,
    atkspeed: 160 + Math.floor(160 * 2500 / 10000) = 160 + 40 = 200
};
```

### 3. การคำนวณคุณสมบัติเพิ่มเติม
```typescript
// เพิ่มค่าจาก add attributes
const additionalStats = {
    14: 400,  // Double Attack +400
    19: 400   // Critical Attack +400
};

// คำนวณค่าความแข็งแกร่ง
const fightPoint = 
    (21000 * 1) +      // HP * zhanli
    (10500 * 10) +     // ATK * zhanli
    (506 * 5) +        // DEF * zhanli
    (200 * 2) +        // ATK Speed * zhanli
    (400 * 10) +       // Double Attack * zhanli
    (400 * 10);        // Critical Attack * zhanli
// = 21000 + 105000 + 2530 + 400 + 4000 + 4000 = 136930
```

## GameEquipAdd Structure

### ตัวอย่าง GameEquipAdd ID 1008
```json
{
    "1008": {
        "rolltype": 1,
        "attr": [
            {"i": 11, "v": 800},  // Counter Attack +800
            {"i": 14, "v": 800},  // Double Attack +800
            {"i": 17, "v": 800},  // Dodge +800
            {"i": 19, "v": 800},  // Critical Attack +800
            {"i": 28, "v": 800},  // Active Skill Damage +800
            {"i": 29, "v": 800}   // Pursuit Skill Damage +800
        ]
    }
}
```

### GameEquipAdd ID 2008
```json
{
    "2008": {
        "rolltype": 1,
        "attr": [
            {"i": 12, "v": 700},  // Ignore Counter +700
            {"i": 15, "v": 700},  // Ignore Double Attack +700
            {"i": 18, "v": 700},  // Ignore Dodge +700
            {"i": 20, "v": 700},  // Ignore Critical +700
            {"i": 30, "v": 700},  // Healing Effect +700
            {"i": 25, "v": 700}   // Damage Reduction +700
        ]
    }
}
```

## สูตรการคำนวณพิเศษ

### 1. การคำนวณ Rate Attributes
```typescript
// สำหรับ attributes ที่มี rate field
function calculateRateAttribute(baseValue: number, rateValue: number): number {
    return baseValue + Math.floor(baseValue * rateValue / 10000);
}
```

### 2. การคำนวณ Ratio Attributes
```typescript
// สำหรับ attributes ที่เป็น ratio
function calculateRatioAttribute(baseValue: number, ratioValue: number): number {
    return Math.floor(baseValue * ratioValue / 10000);
}
```

### 3. การคำนวณ Effect Attributes
```typescript
// สำหรับ attributes ที่มี effect field
function calculateEffectAttribute(effectValue: number, targetAttribute: number): number {
    return Math.floor(targetAttribute * effectValue / 10000);
}
```

## หมายเหตุสำคัญ

1. **bper**: หน่วยเป็น 1/10000 (2500 = 25%)
2. **add**: คุณสมบัติเพิ่มเติมที่สุ่มได้จาก GameEquipAdd
3. **Quality**: มีผลต่อค่าทั้งหมดของอาวุธ
4. **zhanli**: ใช้คำนวณค่าความแข็งแกร่ง
5. **rate**: ใช้สำหรับการคำนวณเปอร์เซ็นต์
6. **effect**: ใช้สำหรับการคำนวณผลกระทบต่อ attributes อื่น

## การใช้งานในโค้ด

```typescript
// ตัวอย่างการใช้งานใน TypeScript
import { cEquipSystem } from './equip-system';
import { EquipEntity } from './equip.entity';

const equipEntity: EquipEntity = {
    id: 10080,
    qid: 7,
    bper: 2500,
    add: {
        1: { 14: 400 },
        2: { 19: 400 }
    }
};

// คำนวณคุณสมบัติทั้งหมด
const attributes = cEquipSystem.cpEquipAttr(equipEntity);

// คำนวณค่าความแข็งแกร่ง
const fightPoint = cEquipSystem.cpEquipFightPoint(equipEntity);
```

// ตัวอย่างการใช้ bper 25%
Attribute	Base Value	bper 25%	ค่าสุดท้าย
HP	16,800	+4,200	21,000
ATK	8,400	+2,100	10,500
DEF	405	+101	506
ATK Speed	160	+40	200
หมายเหตุ:
Base Value = ค่าพื้นฐานที่กำหนดใน GameEquip.json
bper = เปอร์เซ็นต์เพิ่มเติม (หน่วย: 1/10000)
สูตร: Base Value + Math.floor(Base Value * bper / 10000)
bper 25% = เพิ่มค่าพื้นฐานขึ้น 25% ทุก attribute
ดังนั้น bper 25% จะไปเพิ่มค่าพื้นฐานของอาวุธ (HP, ATK, DEF, ATK Speed) ขึ้น 25% ตามที่กำหนดไว้ในตาราง GameEquip.json