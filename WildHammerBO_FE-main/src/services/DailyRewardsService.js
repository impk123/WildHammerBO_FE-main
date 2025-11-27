import { fetcher } from '../../service/fetcher.js'

class DailyRewardsService {
  constructor() {
    this.baseURL = '/dailyRewards'
  }

  // Admin Routes
  async getAllRewards(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `${this.baseURL}/admin/rewards?${queryString}` : `${this.baseURL}/admin/rewards`
      
      return await fetcher(url, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching all rewards:', error)
      throw error
    }
  }

  async getRewardByDay(dayNumber) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/${dayNumber}`, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching reward by day:', error)
      throw error
    }
  }

  async createReward(rewardData) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards`, {
        method: 'POST',
        body: JSON.stringify(rewardData)
      })
    } catch (error) {
      console.error('Error creating reward:', error)
      throw error
    }
  }

  async updateReward(dayNumber, rewardData) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/${dayNumber}`, {
        method: 'PUT',
        body: JSON.stringify(rewardData)
      })
    } catch (error) {
      console.error('Error updating reward:', error)
      throw error
    }
  }

  async deleteReward(dayNumber) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/${dayNumber}`, { method: 'DELETE' })
    } catch (error) {
      console.error('Error deleting reward:', error)
      throw error
    }
  }

  async toggleRewardStatus(dayNumber) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/${dayNumber}/toggle`, { method: 'PATCH' })
    } catch (error) {
      console.error('Error toggling reward status:', error)
      throw error
    }
  }

  async bulkCreateRewards(bulkData) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/bulk-create`, {
        method: 'POST',
        body: JSON.stringify(bulkData)
      })
    } catch (error) {
      console.error('Error bulk creating rewards:', error)
      throw error
    }
  }

  async copyRewards(copyData) {
    try {
      return await fetcher(`${this.baseURL}/admin/rewards/copy`, {
        method: 'POST',
        body: JSON.stringify(copyData)
      })
    } catch (error) {
      console.error('Error copying rewards:', error)
      throw error
    }
  }

  async getStatistics() {
    try {
      return await fetcher(`${this.baseURL}/admin/statistics`, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching statistics:', error)
      throw error
    }
  }

  async getAllClaims(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `${this.baseURL}/admin/claims?${queryString}` : `${this.baseURL}/admin/claims`
      
      return await fetcher(url, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching claims:', error)
      throw error
    }
  }

  async getClaimStatistics() {
    try {
      return await fetcher(`${this.baseURL}/admin/claim-statistics`, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching claim statistics:', error)
      throw error
    }
  }

  // Client Routes (for testing purposes)
  async getUserProgress(token) {
    try {
      return await fetcher(`${this.baseURL}/client/progress`, {
        method: 'POST',
        body: JSON.stringify({ token })
      })
    } catch (error) {
      console.error('Error fetching user progress:', error)
      throw error
    }
  }

  async claimReward(token, dayNumber) {
    try {
      return await fetcher(`${this.baseURL}/client/claim`, {
        method: 'POST',
        body: JSON.stringify({ token, dayNumber })
      })
    } catch (error) {
      console.error('Error claiming reward:', error)
      throw error
    }
  }

  async getUserClaimHistory(token, filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `${this.baseURL}/client/history?${queryString}` : `${this.baseURL}/client/history`
      
      return await fetcher(url, {
        method: 'POST',
        body: JSON.stringify({ token })
      })
    } catch (error) {
      console.error('Error fetching user claim history:', error)
      throw error
    }
  }

  // Public Routes
  async getAvailableRewards(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key])
        }
      })

      const queryString = params.toString()
      const url = queryString ? `${this.baseURL}/public/rewards?${queryString}` : `${this.baseURL}/public/rewards`
      
      return await fetcher(url, { method: 'GET' })
    } catch (error) {
      console.error('Error fetching available rewards:', error)
      throw error
    }
  }
}

export default new DailyRewardsService()
