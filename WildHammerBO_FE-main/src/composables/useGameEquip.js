import { ref, computed } from 'vue'
import GameEquipService from '../services/GameEquipService.js'

/**
 * Composable สำหรับจัดการ Game Equipment ใน Vue components
 */
export function useGameEquip() {
  const loading = ref(false)
  const error = ref(null)

  /**
   * ดึงข้อมูล equipment ตาม ID
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment
   */
  const getEquipById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const equip = GameEquipService.getEquipById(id)
      return equip
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * ดึงข้อมูล equipment พร้อมรายละเอียด
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment พร้อมรายละเอียด
   */
  const getEquipWithDetails = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const equip = GameEquipService.getEquipWithDetails(id)
      return equip
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * ดึงข้อมูล equipment สำหรับ UI
   * @param {string|number} id - Equipment ID
   * @returns {Object|null} ข้อมูล equipment สำหรับ UI
   */
  const getEquipForUI = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const equip = GameEquipService.getEquipForUI(id)
      return equip
    } catch (err) {
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * ดึงข้อมูล equipment หลายตัว
   * @param {Array} ids - Array ของ equipment IDs
   * @returns {Array} Array ของข้อมูล equipment
   */
  const getEquipsByIds = async (ids) => {
    loading.value = true
    error.value = null
    
    try {
      const equips = GameEquipService.getEquipsByIds(ids)
      return equips
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * ค้นหา equipment ตามชื่อ
   * @param {string} name - ชื่อ equipment
   * @returns {Array} Array ของ equipment ที่ตรงกับชื่อ
   */
  const searchEquipByName = async (name) => {
    loading.value = true
    error.value = null
    
    try {
      const equips = GameEquipService.searchEquipByName(name)
      return equips
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * ดึงข้อมูล equipment ตาม level
   * @param {number} level - Level ที่ต้องการ
   * @returns {Array} Array ของ equipment
   */
  const getEquipsByLevel = async (level) => {
    loading.value = true
    error.value = null
    
    try {
      const equips = GameEquipService.getEquipsByLevel(level)
      return equips
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * ดึงข้อมูล equipment ตาม position
   * @param {number} pos - Position ที่ต้องการ
   * @returns {Array} Array ของ equipment
   */
  const getEquipsByPosition = async (pos) => {
    loading.value = true
    error.value = null
    
    try {
      const equips = GameEquipService.getEquipsByPosition(pos)
      return equips
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * ตรวจสอบว่า equipment มีอยู่หรือไม่
   * @param {string|number} id - Equipment ID
   * @returns {boolean} true ถ้ามีอยู่
   */
  const hasEquip = (id) => {
    try {
      return GameEquipService.hasEquip(id)
    } catch (err) {
      error.value = err.message
      return false
    }
  }

  /**
   * ดึงข้อมูล equipment ทั้งหมด
   * @returns {Array} Array ของ equipment ทั้งหมด
   */
  const getAllEquips = async () => {
    loading.value = true
    error.value = null
    
    try {
      const equips = GameEquipService.getAllEquips()
      return equips
    } catch (err) {
      error.value = err.message
      return []
    } finally {
      loading.value = false
    }
  }

  // Computed properties
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const errorMessage = computed(() => error.value)

  return {
    // State
    loading: isLoading,
    error: hasError,
    errorMessage,
    
    // Methods
    getEquipById,
    getEquipWithDetails,
    getEquipForUI,
    getEquipsByIds,
    searchEquipByName,
    getEquipsByLevel,
    getEquipsByPosition,
    hasEquip,
    getAllEquips
  }
}

/**
 * Composable สำหรับจัดการ equipment list
 */
export function useGameEquipList() {
  const equips = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * โหลดข้อมูล equipment list
   * @param {Array} ids - Array ของ equipment IDs
   */
  const loadEquips = async (ids) => {
    loading.value = true
    error.value = null
    
    try {
      const equipList = GameEquipService.getEquipsForUI(ids)
      equips.value = equipList
    } catch (err) {
      error.value = err.message
      equips.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * ค้นหา equipment ใน list
   * @param {string} searchTerm - คำค้นหา
   */
  const searchEquips = async (searchTerm) => {
    loading.value = true
    error.value = null
    
    try {
      const results = GameEquipService.searchEquipByName(searchTerm)
      equips.value = results
    } catch (err) {
      error.value = err.message
      equips.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * กรอง equipment ตาม level
   * @param {number} level - Level ที่ต้องการ
   */
  const filterByLevel = async (level) => {
    loading.value = true
    error.value = null
    
    try {
      const results = GameEquipService.getEquipsByLevel(level)
      equips.value = results
    } catch (err) {
      error.value = err.message
      equips.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * กรอง equipment ตาม position
   * @param {number} pos - Position ที่ต้องการ
   */
  const filterByPosition = async (pos) => {
    loading.value = true
    error.value = null
    
    try {
      const results = GameEquipService.getEquipsByPosition(pos)
      equips.value = results
    } catch (err) {
      error.value = err.message
      equips.value = []
    } finally {
      loading.value = false
    }
  }

  // Computed properties
  const equipCount = computed(() => equips.value.length)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => !!error.value)
  const errorMessage = computed(() => error.value)

  return {
    // State
    equips,
    equipCount,
    loading: isLoading,
    error: hasError,
    errorMessage,
    
    // Methods
    loadEquips,
    searchEquips,
    filterByLevel,
    filterByPosition
  }
}
