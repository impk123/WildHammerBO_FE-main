import { fetcher } from '../../service/fetcher.js'

class PacketService {
  constructor() {
    this.baseURL = '/gamePackets'
  }

  // Get all packets with filters (Admin)
  async getPackets(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = this.baseURL
      console.log('Fetching packets from URL:', url)
      return await fetcher(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching packets:', error)
      throw error
    }
  }

  // Get single packet details
  async getPacket(id) {
    try {
      return await fetcher(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching packet:', error)
      throw error
    }
  }

  // Get featured packets
  async getFeaturedPackets() {
    try {
      return await fetcher(`${this.baseURL}/featured`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching featured packets:', error)
      throw error
    }
  }

  // Create new packet (Admin)
  async createPacket(packetData) {
    try {
      return await fetcher(`${this.baseURL}/admin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packetData)
      })
      
    } catch (error) {
      console.error('Error creating packet:', error)
      throw error
    }
  }

  // Update packet (Admin)
  async updatePacket(id, packetData) {
    console.log('Updating packet with ID:', id, 'Data:', packetData)
    try {
      return await fetcher(`${this.baseURL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(packetData)
      })
    } catch (error) {
      console.error('Error updating packet:', error)
      throw error
    }
  }

  // Delete packet (Admin)
  async deletePacket(id) {
    try {
      return await fetcher(`${this.baseURL}/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error deleting packet:', error)
      throw error
    }
  }

  // Get packet statistics (Admin)
  async getStatistics() {
    try {
      return await fetcher(`${this.baseURL}/admin/statistics`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching packet statistics:', error)
      throw error
    }
  }

  // Check if user can purchase packet
  async canPurchase(id, userId = null) {
    try {
      const params = userId ? `?user_id=${userId}` : ''
      return await fetcher(`${this.baseURL}/${id}/can-purchase${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error checking purchase eligibility:', error)
      throw error
    }
  }

  // Purchase packet
  async purchasePacket(id, paymentData) {
    try {
      return await fetcher(`${this.baseURL}/${id}/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })
    } catch (error) {
      console.error('Error purchasing packet:', error)
      throw error
    }
  }

  // Get user purchase history
  async getUserHistory(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `${this.baseURL}/user/history?${queryString}` : `${this.baseURL}/user/history`
      
      return await fetcher(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching user history:', error)
      throw error
    }
  }

  // Get equipment from gameEquip API
  async getEquipment(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `/api/gameEquip?${queryString}` : `/api/gameEquip`
      
      return await fetcher(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error fetching equipment:', error)
      throw error
    }
  }

  // Add item to packet (Admin)
  async addItemToPacket(packetId, itemData) {
    try {
      return await fetcher(`${this.baseURL}/admin/${packetId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })
    } catch (error) {
      console.error('Error adding item to packet:', error)
      throw error
    }
  }

  // Update packet item (Admin)
  async updatePacketItem(itemId, itemData) {
    try {
      return await fetcher(`${this.baseURL}/admin/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })
    } catch (error) {
      console.error('Error updating packet item:', error)
      throw error
    }
  }

  // Remove item from packet (Admin)
  async removeItemFromPacket(itemId) {
    try {
      return await fetcher(`${this.baseURL}/admin/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error removing item from packet:', error)
      throw error
    }
  }

  // Utility methods for packet types
  getPacketTypes() {
    return [
      { value: 'starter', label: 'Starter', color: 'green' },
      { value: 'equipment', label: 'Equipment', color: 'blue' },
      { value: 'weapon', label: 'Weapon', color: 'red' },
      { value: 'special', label: 'Special', color: 'purple' },
      { value: 'premium', label: 'Premium', color: 'yellow' }
    ]
  }

  getPacketTypeLabel(type) {
    const types = this.getPacketTypes()
    const found = types.find(t => t.value === type)
    return found ? found.label : type
  }

  getPacketTypeColor(type) {
    const types = this.getPacketTypes()
    const found = types.find(t => t.value === type)
    return found ? found.color : 'gray'
  }

  // Format price display
  formatPrice(coins, gems, ore, token) {
    const prices = []
    if (coins > 0) {
      prices.push(`${this.formatNumber(coins)} Gold`)
    }
    if (gems > 0) {
      prices.push(`${this.formatNumber(gems)} เพชร`)
    }
    if (ore > 0) {
      prices.push(`${this.formatNumber(ore)} แร่หิน`)
    }
    if (token > 0) {
      prices.push(`${this.formatNumber(token)} Token`)
    }
    return prices.length > 0 ? prices.join(' or ') : 'Free'
  }

  formatNumber(num) {
    return new Intl.NumberFormat().format(num)
  }

  // Validation methods
  validatePacketData(data) {
    const errors = {}

    if (!data.name || data.name.trim() === '') {
      errors.name = 'Packet name is required'
    }

    if (!data.packet_type) {
      errors.packet_type = 'Packet type is required'
    }

    if (data.price_coins < 0) {
      errors.price_coins = 'Price cannot be negative'
    }

    if (data.price_gems < 0) {
      errors.price_gems = 'Price cannot be negative'
    }

    if (data.price_ore < 0) {
      errors.price_ore = 'Price cannot be negative'
    }

    if (data.price_token < 0) {
      errors.price_token = 'Price cannot be negative'
    }

    if (data.price_coins === 0 && data.price_gems === 0 && data.price_ore === 0 && data.price_token === 0) {
      errors.price = 'At least one price must be greater than 0'
    }

    if (data.level_requirement < 1) {
      errors.level_requirement = 'Level requirement must be at least 1'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  validateItemData(data) {
    const errors = {}

    if (!data.item_type || data.item_type.trim() === '') {
      errors.item_type = 'Item type is required'
    }

    if (!data.item_id || data.item_id.trim() === '') {
      errors.item_id = 'Item ID is required'
    }

    if (!data.item_name || data.item_name.trim() === '') {
      errors.item_name = 'Item name is required'
    }

    if (data.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1'
    }

    if (data.drop_chance < 0 || data.drop_chance > 100) {
      errors.drop_chance = 'Drop chance must be between 0 and 100'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// Export singleton instance
export default new PacketService()