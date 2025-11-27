class GameEquipQualityManager {
  constructor() {
    this.qualityData = null
    this.initialized = false
    this.initializing = false
  }

  async initialize() {
    if (this.initialized) return
    if (this.initializing) return

    this.initializing = true

    try {
      const response = await fetch('/bundle/config/game/GameEquipQuality.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      this.qualityData = await response.json()
      this.initialized = true
      console.log('GameEquipQuality loaded successfully')
    } catch (error) {
      console.error('Error loading GameEquipQuality:', error)
      this.qualityData = {}
    } finally {
      this.initializing = false
    }
  }

  async getQualityInfo(quality) {
    await this.initialize()
    return this.qualityData?.[quality] || null
  }

  async getQualityName(quality) {
    const qualityInfo = await this.getQualityInfo(quality)
    return qualityInfo?.name || 'Unknown'
  }

  async getQualityColor(quality) {
    const qualityInfo = await this.getQualityInfo(quality)
    return qualityInfo?.color || 'a69a7f'
  }

  async getQualityBackground(quality) {
    const qualityInfo = await this.getQualityInfo(quality)
    if (!qualityInfo?.bg) return null
    
    // Convert bg name to actual image path
    // img_zbtb_1 -> /bundle/common/texture/img_zbtb_1.png
    const bgName = qualityInfo.bg
    return `/bundle/common/texture/${bgName}.png`
  }

  async getAllQualities() {
    await this.initialize()
    return this.qualityData || {}
  }
}

// Export singleton instance
export default new GameEquipQualityManager()
