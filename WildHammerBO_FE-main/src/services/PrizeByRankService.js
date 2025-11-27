import { fetcher } from '../../service/fetcher.js'

class PrizeByRankService {
  // Get all prize by rank records
  static async getAllPrizeByRank(serverid = null) {
    try {
      const url = serverid ? `/prizebyrank/?serverid=${serverid}` : '/prizebyrank/'
      const response = await fetcher(url)
      return response
    } catch (error) {
      console.error('Error fetching prize by rank:', error)
      throw error
    }
  }

  // Get prize by rank by ID
  static async getPrizeByRankById(id) {
    try {
      const response = await fetcher(`/prizebyrank/${id}`)
      return response
    } catch (error) {
      console.error('Error fetching prize by rank by ID:', error)
      throw error
    }
  }

  // Get prize percentage for a specific rank
  static async getPrizeForRank(rank) {
    try {
      const response = await fetcher(`/prizebyrank/rank/${rank}`)
      return response
    } catch (error) {
      console.error('Error fetching prize for rank:', error)
      throw error
    }
  }

  // Get statistics
  static async getStatistics() {
    try {
      const response = await fetcher('/prizebyrank/stats/overview')
      return response
    } catch (error) {
      console.error('Error fetching statistics:', error)
      throw error
    }
  }

  // Check for rank range overlaps
  static async checkOverlaps() {
    try {
      const response = await fetcher('/prizebyrank/stats/overlaps')
      return response
    } catch (error) {
      console.error('Error checking overlaps:', error)
      throw error
    }
  }

  // Create new prize by rank record
  static async createPrizeByRank(data) {
    try {
      const response = await fetcher('/prizebyrank/', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error creating prize by rank:', error)
      throw error
    }
  }

  // Update prize by rank record
  static async updatePrizeByRank(id, data) {
    try {
      const response = await fetcher(`/prizebyrank/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error updating prize by rank:', error)
      throw error
    }
  }

  // Delete prize by rank record
  static async deletePrizeByRank(id) {
    try {
      const response = await fetcher(`/prizebyrank/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Error deleting prize by rank:', error)
      throw error
    }
  }

  // Bulk create prize by rank records
  static async bulkCreatePrizeByRank(data) {
    try {
      const response = await fetcher('/prizebyrank/bulk', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error bulk creating prize by rank:', error)
      throw error
    }
  }
}

export default PrizeByRankService
