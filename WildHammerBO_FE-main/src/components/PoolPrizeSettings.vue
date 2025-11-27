<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <Navigation />
    
    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white mb-2">🏆 Pool Prize Settings</h1>
        <p class="text-slate-300">จัดการการตั้งค่ารางวัลและระบบ Token ของเกม</p>
      </div>

      <!-- Server Selection -->
      <div class="mb-6 flex justify-center">
        <div class="max-w-md w-full">
          <label class="block text-sm font-medium text-slate-300 mb-2 text-center">
            🖥️ เลือกเซิฟเวอร์
          </label>
          <select
            v-model="selectedServerId"
            @change="onServerChange"
            class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
            <option value="1">Server 1</option>
            <option value="2">Server 2</option>
            <option value="3">Server 3</option>            
          </select>
          <p class="text-xs text-slate-500 mt-1 text-center">เลือกเซิฟเวอร์ที่ต้องการจัดการการตั้งค่า</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>

      <!-- Settings Form -->
      <div v-else class="max-w-4xl mx-auto">
        <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-white mb-2">การตั้งค่ารางวัล</h2>
            <p class="text-slate-400 text-sm">ปรับแต่งค่าต่างๆ สำหรับระบบรางวัลและ Token</p>
          </div>

          <form @submit.prevent="updateSettings" class="space-y-6">
            <!-- Initial Prize -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  💰 Initial Prize
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.initial_prize"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-400 text-sm">฿</span>
                  </div>
                </div>
                <p class="text-xs text-slate-500">รางวัลเริ่มต้น</p>
              </div>

              <!-- Total Buy Token -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  🪙 Total Buy Token
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.tota_buytoken"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-400 text-sm">Token</span>
                  </div>
                </div>
                <p class="text-xs text-slate-500">จำนวน Token ที่ซื้อทั้งหมด</p>
              </div>
            </div>

            <!-- Percent Addon & Addon Prize -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  📊 Percent Addon
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.percent_addon"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <p class="text-xs text-slate-500">เปอร์เซ็นต์เพิ่มเติม</p>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-slate-300">
                  🎁 Addon Prize
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.addon_prize"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    required
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-slate-400 text-sm">฿</span>
                  </div>
                </div>
                <p class="text-xs text-slate-500">รางวัลเพิ่มเติม</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700/50">
              <button
                type="submit"
                :disabled="saving"
                class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg v-if="saving" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{{ saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า' }}</span>
              </button>

              <button
                type="button"
                @click="loadSettings"
                :disabled="loading"
                class="flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>รีเฟรชข้อมูล</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Current Values Display -->
        <div class="mt-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">📊 ค่าปัจจุบัน</h3>
          
          <!-- Prize Pool Total -->
          <div class="mb-6 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-xl p-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-emerald-400 mb-2">
                {{ formatCurrency(totalPrizePool) }}
              </div>
              <div class="text-sm text-emerald-300 font-medium">🏆 Prize Pool รวม</div>
              <div class="text-xs text-slate-400 mt-1">
                Initial Prize + Addon Prize
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-slate-700/30 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-400">{{ formatCurrency(settings.initial_prize) }}</div>
              <div class="text-sm text-slate-400">Initial Prize</div>
            </div>
            <div class="bg-slate-700/30 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-400">{{ formatNumber(settings.tota_buytoken) }}</div>
              <div class="text-sm text-slate-400">Total Buy Token</div>
            </div>
            <div class="bg-slate-700/30 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ formatNumber(settings.percent_addon) }}%</div>
              <div class="text-sm text-slate-400">Percent Addon</div>
            </div>
            <div class="bg-slate-700/30 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-400">{{ formatCurrency(settings.addon_prize) }}</div>
              <div class="text-sm text-slate-400">Addon Prize</div>
            </div>
          </div>
        </div>

        <!-- Prize By Rank Management -->
        <div class="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-white mb-2">🏆 Prize By Rank Management</h2>
            <p class="text-slate-400 text-sm">จัดการรางวัลตามอันดับของผู้เล่น</p>
          </div>

          <!-- Summary and Add Button -->
          <div class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <!-- Percentage Summary -->
            <div class="flex items-center space-x-4">
              <div class="bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2">
                <div class="text-sm text-slate-400">ผลรวมเปอร์เซ็นต์</div>
                <div class="text-lg font-bold" :class="totalPercentage === 100 ? 'text-green-400' : totalPercentage > 100 ? 'text-red-400' : 'text-yellow-400'">
                  {{ totalPercentage.toFixed(2) }}%
                </div>
              </div>
              <div v-if="totalPercentage !== 100" class="text-sm" :class="totalPercentage > 100 ? 'text-red-400' : 'text-yellow-400'">
                <span v-if="totalPercentage > 100">⚠️ เกิน 100%</span>
                <span v-else>⚠️ ไม่ครบ 100%</span>
              </div>
              <div v-else class="text-sm text-green-400">
                ✅ ครบ 100%
              </div>
            </div>
            
            <!-- Add Button -->
            <button
              @click="showAddPrizeByRankModal = true"
              class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <span>เพิ่มรางวัลตามอันดับ</span>
            </button>
          </div>

          <!-- Prize By Rank Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-slate-300">
              <thead class="text-xs text-slate-400 uppercase bg-slate-700/50">
                <tr>
                  <th scope="col" class="px-6 py-3">ID</th>
                  <th scope="col" class="px-6 py-3">เซิฟเวอร์</th>
                  <th scope="col" class="px-6 py-3">อันดับ</th>
                  <th scope="col" class="px-6 py-3">เปอร์เซ็นต์รางวัล</th>
                  <th scope="col" class="px-6 py-3">รางวัลที่ได้รับ</th>
                  <th scope="col" class="px-6 py-3">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="prizeByRankLoading" class="bg-slate-800/30 border-b border-slate-700/50">
                  <td colspan="6" class="px-6 py-4 text-center">
                    <div class="flex justify-center items-center">
                      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                      <span class="ml-2">กำลังโหลด...</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="prizeByRankList.length === 0" class="bg-slate-800/30 border-b border-slate-700/50">
                  <td colspan="6" class="px-6 py-4 text-center text-slate-400">
                    ไม่มีข้อมูลรางวัลตามอันดับ
                  </td>
                </tr>
                <tr v-else v-for="item in prizeByRankList" :key="item.id" class="bg-slate-800/30 border-b border-slate-700/50 hover:bg-slate-700/40">
                  <td class="px-6 py-4 font-medium text-white">{{ item.id }}</td>
                  <td class="px-6 py-4">
                    <span class="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                      Server {{ item.serverid }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                      {{ item.from_rank === item.to_rank ? item.from_rank : `${item.from_rank}-${item.to_rank}` }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                      {{ item.percent_prize }}%
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span class="bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                      {{ formatCurrency(calculatePrizeAmount(item.percent_prize)) }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <button
                        @click="editPrizeByRank(item)"
                        class="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                        title="แก้ไข"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button
                        @click="deletePrizeByRank(item.id)"
                        class="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200"
                        title="ลบ"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add/Edit Prize By Rank Modal -->
  <div v-if="showAddPrizeByRankModal || showEditPrizeByRankModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">
          {{ showAddPrizeByRankModal ? 'เพิ่มรางวัลตามอันดับ' : 'แก้ไขรางวัลตามอันดับ' }}
        </h3>
        <button
          @click="closePrizeByRankModal"
          class="text-slate-400 hover:text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <form @submit.prevent="savePrizeByRank" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">เซิฟเวอร์</label>
          <select
            v-model.number="prizeByRankForm.serverid"
            class="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="1">Server 1</option>
            <option value="2">Server 2</option>
            <option value="3">Server 3</option>
            <option value="4">Server 4</option>
            <option value="5">Server 5</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">อันดับเริ่มต้น</label>
          <input
            v-model.number="prizeByRankForm.from_rank"
            type="number"
            min="1"
            class="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="1"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">อันดับสิ้นสุด</label>
          <input
            v-model.number="prizeByRankForm.to_rank"
            type="number"
            min="1"
            class="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="10"
            required
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">เปอร์เซ็นต์รางวัล</label>
          <div class="relative">
            <input
              v-model.number="prizeByRankForm.percent_prize"
              type="number"
              step="0.01"
              min="0"
              max="100"
              class="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="10.00"
              required
            >
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-slate-400 text-sm">%</span>
            </div>
          </div>
        </div>

        <div class="flex space-x-3 pt-4">
          <button
            type="submit"
            :disabled="prizeByRankSaving"
            class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg v-if="prizeByRankSaving" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ prizeByRankSaving ? 'กำลังบันทึก...' : 'บันทึก' }}</span>
          </button>
          <button
            type="button"
            @click="closePrizeByRankModal"
            class="flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import Navigation from './Navigation.vue'
import PrizeSettingsService from '../services/PrizeSettingsService.js'
import PrizeByRankService from '../services/PrizeByRankService.js'

// Reactive data
const loading = ref(false)
const saving = ref(false)
const settings = ref({})
const selectedServerId = ref(1)
const form = reactive({
  serverid: 1,
  initial_prize: 0,
  tota_buytoken: 0,
  percent_addon: 0,
  addon_prize: 0
})

// Prize By Rank data
const prizeByRankList = ref([])
const prizeByRankLoading = ref(false)
const prizeByRankSaving = ref(false)
const showAddPrizeByRankModal = ref(false)
const showEditPrizeByRankModal = ref(false)
const prizeByRankForm = reactive({
  id: null,
  serverid: 1,
  from_rank: 1,
  to_rank: 10,
  percent_prize: 10.00
})

// Computed property for total prize pool
const totalPrizePool = computed(() => {
  const initial = parseFloat(settings.value.initial_prize) || 0
  const addon = parseFloat(settings.value.addon_prize) || 0
  return initial + addon
})

// Calculate prize amount for a rank
const calculatePrizeAmount = (percent) => {
  const totalPool = totalPrizePool.value
  const percentage = parseFloat(percent) || 0
  return (totalPool * percentage) / 100
}

// Calculate total percentage of all ranks
const totalPercentage = computed(() => {
  return prizeByRankList.value.reduce((total, item) => {
    return total + (parseFloat(item.percent_prize) || 0)
  }, 0)
})

// Load settings from API
const loadSettings = async () => {
  try {
    loading.value = true
    const response = await PrizeSettingsService.getPrizeSettings(selectedServerId.value)
    settings.value = response.data
    
    // Update form with current values
    form.serverid = selectedServerId.value
    form.initial_prize = parseFloat(response.data.initial_prize) || 0
    form.tota_buytoken = parseFloat(response.data.tota_buytoken) || 0
    form.percent_addon = parseFloat(response.data.percent_addon) || 0
    form.addon_prize = parseFloat(response.data.addon_prize) || 0
  } catch (error) {
    console.error('Error loading settings:', error)    
  } finally {
    loading.value = false
  }
}

// Handle server change
const onServerChange = () => {
  form.serverid = selectedServerId.value
  prizeByRankForm.serverid = selectedServerId.value
  loadSettings()
  loadPrizeByRank()
}

// Update settings
const updateSettings = async () => {
  try {
    saving.value = true
    
    const payload = {
      serverid: parseInt(form.serverid),
      initial_prize: parseFloat(form.initial_prize),
      tota_buytoken: parseFloat(form.tota_buytoken),
      percent_addon: parseFloat(form.percent_addon),
      addon_prize: parseFloat(form.addon_prize)
    }
    
    await PrizeSettingsService.updatePrizeSettings(payload)
    
    // Reload settings to get updated values
    await loadSettings()
  } catch (error) {
    console.error('Error updating settings:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    saving.value = false
  }
}

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2
  }).format(value || 0)
}

// Format number
const formatNumber = (value) => {
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value || 0)
}

// Prize By Rank functions
const loadPrizeByRank = async () => {
  try {
    prizeByRankLoading.value = true
    const response = await PrizeByRankService.getAllPrizeByRank(selectedServerId.value)
    prizeByRankList.value = response.data || []
  } catch (error) {
    console.error('Error loading prize by rank:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูลรางวัลตามอันดับ')
  } finally {
    prizeByRankLoading.value = false
  }
}

const savePrizeByRank = async () => {
  try {
    prizeByRankSaving.value = true
    
    const payload = {
      serverid: parseInt(prizeByRankForm.serverid),
      from_rank: parseInt(prizeByRankForm.from_rank),
      to_rank: parseInt(prizeByRankForm.to_rank),
      percent_prize: parseFloat(prizeByRankForm.percent_prize)
    }
    
    if (showEditPrizeByRankModal.value) {
      // Update existing record
      await PrizeByRankService.updatePrizeByRank(prizeByRankForm.id, payload)
    } else {
      // Create new record
      await PrizeByRankService.createPrizeByRank(payload)
    }
    
    closePrizeByRankModal()
    loadPrizeByRank()
  } catch (error) {
    console.error('Error saving prize by rank:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    prizeByRankSaving.value = false
  }
}

const editPrizeByRank = (item) => {
  prizeByRankForm.id = item.id
  prizeByRankForm.serverid = item.serverid
  prizeByRankForm.from_rank = item.from_rank
  prizeByRankForm.to_rank = item.to_rank
  prizeByRankForm.percent_prize = item.percent_prize
  showEditPrizeByRankModal.value = true
}

const deletePrizeByRank = async (id) => {
  if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?')) {
    try {
      await PrizeByRankService.deletePrizeByRank(id)
      loadPrizeByRank()
    } catch (error) {
      console.error('Error deleting prize by rank:', error)
      alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}

const closePrizeByRankModal = () => {
  showAddPrizeByRankModal.value = false
  showEditPrizeByRankModal.value = false
  prizeByRankForm.id = null
  prizeByRankForm.serverid = selectedServerId.value
  prizeByRankForm.from_rank = 1
  prizeByRankForm.to_rank = 10
  prizeByRankForm.percent_prize = 10.00
}

// Load settings on component mount
onMounted(() => {
  loadSettings()
  loadPrizeByRank()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Input focus effects */
input:focus {
  box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

button:active:not(:disabled) {
  transform: translateY(0);
}
</style>
