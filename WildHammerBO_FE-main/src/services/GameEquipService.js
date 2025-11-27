import gameEquipManager from '../utils/GameEquipManager.js'

/**
 * GameEquipService - Service สำหรับจัดการ Game Equipment
 * ใช้ GameEquipManager ในการดึงข้อมูลจาก JSON
 */
class GameEquipService {
  /**
   * ดึงข้อมูล equipment ตาม ID
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment
   */
  static getEquipById(id) {
    try {
      return gameEquipManager.getEquipById(id)
    } catch (error) {
      console.error('Error getting equip by ID:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล equipment หลายตัว
   * @param {Array} ids - Array ของ equipment IDs
   * @returns {Array} Array ของข้อมูล equipment
   */
  static getEquipsByIds(ids) {
    try {
      return gameEquipManager.getEquipsByIds(ids)
    } catch (error) {
      console.error('Error getting equips by IDs:', error)
      return []
    }
  }


  static getEquipBGByIdq(qid) {
    if (qid && qid > 0 && qid < 10) {
      // ใช้ไฟล์ที่มีอยู่จริงในโฟลเดอร์
      const bgFiles = {
        1: "/bundle/common/texture/img_zbtb_1.png",
        2: "/bundle/common/texture/img_zbtb_2.png", 
        3: "/bundle/common/texture/img_zbtb_3.png",
        4: "/bundle/common/texture/img_zbtb_4.png",
        5: "/bundle/common/texture/img_zbtb_5.png",
        6: "/bundle/common/texture/img_zbtb_6.png",
        7: "/bundle/common/texture/img_zbtb_7.png",
        8: "/bundle/common/texture/img_zbtb_8.png",
        9: "/bundle/common/texture/img_zbtb_9.png"
      }
      return bgFiles[qid] || null
    }
    return null
  }

  static getEquipPosById(id) {
    try {
      return gameEquipManager.getEquipPosById(id)
    } catch (error) {
      console.error('Error getting equip pos by ID:', error)
      return null
    }
  }

  static getEquipIconByIdq(id, q) {
    try {
      const equipId = String(id)
      const data = gameEquipManager.getEquipById(equipId)
      
      if (data && data.pos) {
        const pos = gameEquipManager.getEquipPosById(data.pos)
        if (pos && pos.iconFmt && data.icon) {
          return "/bundle/gui/main/atlas/" + pos.iconFmt + data.icon + ".png"
        }
      }
      return null
    } catch (error) {
      console.error('Error getting equip icon:', error)
      return null
    }
  }

  /**
   * ค้นหา equipment ตามชื่อ
   * @param {string} name - ชื่อ equipment
   * @returns {Array} Array ของ equipment ที่ตรงกับชื่อ
   */
  static searchEquipByName(name) {
    try {
      return gameEquipManager.searchEquipByName(name)
    } catch (error) {
      console.error('Error searching equip by name:', error)
      return []
    }
  }

  /**
   * ดึงข้อมูล equipment ตาม level
   * @param {number} level - Level ที่ต้องการ
   * @returns {Array} Array ของ equipment
   */
  static getEquipsByLevel(level) {
    try {
      return gameEquipManager.getEquipsByLevel(level)
    } catch (error) {
      console.error('Error getting equips by level:', error)
      return []
    }
  }

  /**
   * ดึงข้อมูล equipment ตาม position
   * @param {number} pos - Position ที่ต้องการ
   * @returns {Array} Array ของ equipment
   */
  static getEquipsByPosition(pos) {
    try {
      return gameEquipManager.getEquipsByPosition(pos)
    } catch (error) {
      console.error('Error getting equips by position:', error)
      return []
    }
  }

  /**
   * ดึงข้อมูล equipment ทั้งหมด
   * @returns {Array} Array ของ equipment ทั้งหมด
   */
  static getAllEquips() {
    try {
      return gameEquipManager.getAllEquips()
    } catch (error) {
      console.error('Error getting all equips:', error)
      return []
    }
  }

  /**
   * ดึงข้อมูล equipment พร้อมรายละเอียด
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment พร้อมรายละเอียด
   */
  static getEquipWithDetails(id) {
    try {
      return gameEquipManager.getEquipWithDetails(id)
    } catch (error) {
      console.error('Error getting equip with details:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล equipment ตาม range ของ level
   * @param {number} minLevel - Level ต่ำสุด
   * @param {number} maxLevel - Level สูงสุด
   * @returns {Array} Array ของ equipment
   */
  static getEquipsByLevelRange(minLevel, maxLevel) {
    try {
      return gameEquipManager.getEquipsByLevelRange(minLevel, maxLevel)
    } catch (error) {
      console.error('Error getting equips by level range:', error)
      return []
    }
  }

  /**
   * ตรวจสอบว่า equipment มีอยู่หรือไม่
   * @param {string|number} id - Equipment ID
   * @returns {boolean} true ถ้ามีอยู่
   */
  static hasEquip(id) {
    try {
      return gameEquipManager.hasEquip(id)
    } catch (error) {
      console.error('Error checking equip existence:', error)
      return false
    }
  }

  /**
   * ดึงข้อมูล equipment ที่มี stats สูงสุด
   * @param {string} stat - ชื่อ stat (hp, atk, def, atkspeed)
   * @returns {Object|null} equipment ที่มี stat สูงสุด
   */
  static getEquipWithMaxStat(stat) {
    try {
      return gameEquipManager.getEquipWithMaxStat(stat)
    } catch (error) {
      console.error('Error getting equip with max stat:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล equipment สำหรับแสดงใน UI
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment สำหรับ UI
   */
  static getEquipForUI(id) {
    try {
      const equip = gameEquipManager.getEquipWithDetails(id)
      if (!equip) {
        return null
      }

      return {
        id: equip.id,
        name: equip.name,
        level: equip.level,
        icon: equip.icon,
        position: equip.pos,
        category: equip.category,
        rarity: equip.rarity,
        stats: {
          hp: equip.hp || 0,
          atk: equip.atk || 0,
          def: equip.def || 0,
          atkspeed: equip.atkspeed || 0,
          total: equip.totalStats || 0
        },
        sell: equip.sell || [],
        exp: equip.exp || 0,
        isHighLevel: equip.isHighLevel || false
      }
    } catch (error) {
      console.error('Error getting equip for UI:', error)
      return null
    }
  }

  /**
   * ดึงข้อมูล equipment หลายตัวสำหรับแสดงใน UI
   * @param {Array} ids - Array ของ equipment IDs
   * @returns {Array} Array ของข้อมูล equipment สำหรับ UI
   */
  static getEquipsForUI(ids) {
    try {
      return ids.map(id => this.getEquipForUI(id)).filter(Boolean)
    } catch (error) {
      console.error('Error getting equips for UI:', error)
      return []
    }
  }
}

export default GameEquipService
