import { fetcher } from '../../service/fetcher.js'

class PrizeSettingsService {
  // Get prize settings by serverid
  static async getPrizeSettings(serverid = 1) {
    try {
      const response = await fetcher(`/prizeSettings/${serverid}`)
      return response
    } catch (error) {
      console.error('Error fetching prize settings:', error)
      throw error
    }
  }

  // Update all prize settings
  static async updatePrizeSettings(data) {
    try {
      const response = await fetcher('/prizeSettings/update', {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error updating prize settings:', error)
      throw error
    }
  }

  // Increase total buy token
  static async increaseTotalBuyToken(serverid, increaseAmount) {
    try {
      const response = await fetcher('/prizeSettings/increase-total-buytoken', {
        method: 'POST',
        body: JSON.stringify({ 
          serverid: serverid,
          increase_amount: increaseAmount 
        })
      })
      return response
    } catch (error) {
      console.error('Error increasing total buy token:', error)
      throw error
    }
  }
}

export default PrizeSettingsService
