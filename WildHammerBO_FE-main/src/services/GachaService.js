import { fetcher } from '../../service/fetcher.js'

class GachaService {
  constructor() {
    this.baseURL = '/gachapackets'
  }

  /**
   * Get all gacha packets with optional filtering and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 20)
   * @param {number} params.is_active - Filter by active status (0/1)
   * @param {number} params.is_equipment - Filter by equipment type (0/1)
   * @param {string} params.name - Search by name
   * @returns {Promise<Object>} API response
   */
  async getAllPackets(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.is_active !== undefined && params.is_active !== '') {
        queryParams.append('is_active', params.is_active)
      }
      if (params.is_equipment !== undefined && params.is_equipment !== '') {
        queryParams.append('is_equipment', params.is_equipment)
      }
      if (params.name) queryParams.append('name', params.name)

      const url = `${this.baseURL}?${queryParams.toString()}`
      const response = await fetcher(url, { method: 'GET' })
      
      return response
    } catch (error) {
      console.error('Error fetching gacha packets:', error)
      throw error
    }
  }

  /**
   * Get gacha packet by ID
   * @param {number} id - Packet ID
   * @returns {Promise<Object>} API response
   */
  async getPacketById(id) {
    try {
      const response = await fetcher(`${this.baseURL}/${id}`, { method: 'GET' })
      return response
    } catch (error) {
      console.error(`Error fetching gacha packet ${id}:`, error)
      throw error
    }
  }

  /**
   * Create new gacha packet
   * @param {Object} packetData - Packet data
   * @param {string} packetData.name - Packet name
   * @param {number} packetData.is_active - Active status (0/1)
   * @param {number} packetData.is_equipment - Equipment type (0/1)
   * @param {string} packetData.item_rarity - Item rarity
   * @param {number} packetData.prob_rate - Probability rate (0-100)
   * @returns {Promise<Object>} API response
   */
  async createPacket(packetData) {
    try {
      const response = await fetcher(this.baseURL, { 
        method: 'POST', 
        body: JSON.stringify(packetData) 
      })
      return response
    } catch (error) {
      console.error('Error creating gacha packet:', error)
      throw error
    }
  }

  /**
   * Update gacha packet
   * @param {number} id - Packet ID
   * @param {Object} packetData - Updated packet data
   * @returns {Promise<Object>} API response
   */
  async updatePacket(id, packetData) {
    try {
      const response = await fetcher(`${this.baseURL}/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify(packetData) 
      })
      return response
    } catch (error) {
      console.error(`Error updating gacha packet ${id}:`, error)
      throw error
    }
  }

  /**
   * Delete gacha packet
   * @param {number} id - Packet ID
   * @returns {Promise<Object>} API response
   */
  async deletePacket(id) {
    try {
      const response = await fetcher(`${this.baseURL}/${id}`, { method: 'DELETE' })
      return response
    } catch (error) {
      console.error(`Error deleting gacha packet ${id}:`, error)
      throw error
    }
  }

  /**
   * Get active gacha packets (public endpoint)
   * @returns {Promise<Object>} API response
   */
  async getActivePackets() {
    try {
      const response = await fetcher(`${this.baseURL}/active`, { method: 'GET' })
      return response
    } catch (error) {
      console.error('Error fetching active gacha packets:', error)
      throw error
    }
  }

  /**
   * Get gacha packets statistics
   * @returns {Promise<Object>} API response
   */
  async getStatistics() {
    try {
      const response = await fetcher(`${this.baseURL}/statistics`, { method: 'GET' })
      return response
    } catch (error) {
      console.error('Error fetching gacha packets statistics:', error)
      throw error
    }
  }

  /**
   * Toggle active status of gacha packet
   * @param {number} id - Packet ID
   * @returns {Promise<Object>} API response
   */
  async toggleActive(id) {
    try {
      const response = await fetcher(`${this.baseURL}/${id}/toggle-active`, { method: 'PATCH' })
      return response
    } catch (error) {
      console.error(`Error toggling active status for packet ${id}:`, error)
      throw error
    }
  }

  /**
   * Toggle equipment status of gacha packet
   * @param {number} id - Packet ID
   * @returns {Promise<Object>} API response
   */
  async toggleEquipment(id) {
    try {
      const response = await fetcher(`${this.baseURL}/${id}/toggle-equipment`, { method: 'PATCH' })
      return response
    } catch (error) {
      console.error(`Error toggling equipment status for packet ${id}:`, error)
      throw error
    }
  }

  /**
   * Validate packet data before sending to API
   * @param {Object} packetData - Packet data to validate
   * @returns {Object} Validation result
   */
  validatePacketData(packetData) {
    const errors = []

    // Required fields
    if (!packetData.name || packetData.name.trim().length === 0) {
      errors.push('ชื่อ gacha packet จำเป็นต้องระบุ')
    } else if (packetData.name.length > 100) {
      errors.push('ชื่อ gacha packet ต้องไม่เกิน 100 ตัวอักษร')
    }

    if (!packetData.item_rarity || packetData.item_rarity.trim().length === 0) {
      errors.push('ความหายากจำเป็นต้องระบุ')
    }

    // Probability rate validation
    if (packetData.prob_rate === undefined || packetData.prob_rate === null) {
      errors.push('อัตราความน่าจะเป็นจำเป็นต้องระบุ')
    } else {
      const probRate = Number(packetData.prob_rate)
      if (isNaN(probRate)) {
        errors.push('อัตราความน่าจะเป็นต้องเป็นตัวเลข')
      } else if (probRate < 0 || probRate > 100) {
        errors.push('อัตราความน่าจะเป็นต้องอยู่ระหว่าง 0-100')
      }
    }

    // Boolean fields validation
    if (packetData.is_active !== undefined && ![0, 1].includes(Number(packetData.is_active))) {
      errors.push('สถานะ active ต้องเป็น 0 หรือ 1')
    }

    if (packetData.is_equipment !== undefined && ![0, 1].includes(Number(packetData.is_equipment))) {
      errors.push('สถานะ equipment ต้องเป็น 0 หรือ 1')
    }


    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Format packet data for API submission
   * @param {Object} packetData - Raw packet data
   * @returns {Object} Formatted packet data
   */
  formatPacketData(packetData) {
    return {
      name: String(packetData.name).trim(),
      is_active: Number(packetData.is_active),
      is_equipment: Number(packetData.is_equipment),
      item_rarity: String(packetData.item_rarity).trim(),
      prob_rate: Number(parseFloat(packetData.prob_rate).toFixed(2))
    }
  }

  /**
   * Get rarity options for dropdown
   * @returns {Array} Array of rarity options
   */
  getRarityOptions() {
    return [
      { value: 'common', label: 'Common', color: 'text-gray-400' },
      { value: 'uncommon', label: 'Uncommon', color: 'text-green-400' },
      { value: 'rare', label: 'Rare', color: 'text-blue-400' },
      { value: 'epic', label: 'Epic', color: 'text-purple-400' },
      { value: 'legendary', label: 'Legendary', color: 'text-orange-400' },
      { value: 'mythic', label: 'Mythic', color: 'text-pink-400' }
    ]
  }

}

// Create and export singleton instance
const gachaService = new GachaService()
export default gachaService
