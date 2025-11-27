// Email Service for managing email packets
import { fetcher } from '../../service/fetcher.js'

class EmailService {
  // Get all email packets
  static async getEmailPackets(params = {}) {
    try {
      
      
      const queryParams = new URLSearchParams()
      
      // Add pagination
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      
      // Add filters
      if (params.search) queryParams.append('search', params.search)
      if (params.status) queryParams.append('status', params.status)
      if (params.sortBy) queryParams.append('sortBy', params.sortBy)
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
      
      const url = `/emailpackets?${queryParams}`
            
      const data = await fetcher(url)
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('❌ Error fetching email packets:', error)
      
      return {
        success: false,
        error: error.message || 'API server ไม่พร้อมใช้งาน',
        isNetworkError: true
      }
    }
  }

  // Create new email packet
  static async createEmailPacket(packetData) {
    try {
      const data = await fetcher('/emailpackets', {
        method: 'POST',
        body: JSON.stringify(packetData)
      })
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error creating email packet:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Update email packet
  static async updateEmailPacket(id, packetData) {
    try {
      const data = await fetcher(`/emailpackets/${id}`, {
        method: 'PUT',
        body: JSON.stringify(packetData)
      })
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error updating email packet:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Delete email packet
  static async deleteEmailPacket(id) {
    try {
      const data = await fetcher(`/emailpackets/${id}`, {
        method: 'DELETE'
      })
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error deleting email packet:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Send email packet to players
  static async sendEmailPacket(packetId, sendData) {
    try {
      const data = await fetcher(`/emailpackets/send/${packetId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(sendData)
      })
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error sending email packet:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  static async sendEmailGlobal(sendData) {
    try {
      const data = await fetcher(`/emailpackets/send-bulk`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(sendData)
      })
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error sending email packet:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get email packet statistics
  static async getEmailPacketStats() {
    try {
      const data = await fetcher('/emailpackets/stats')
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching email packet stats:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
}

export default EmailService