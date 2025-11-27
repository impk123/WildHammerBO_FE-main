<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white">Gift Code Management</h1>
          <p class="text-slate-400">Create and manage gift codes for your idle game</p>
        </div>
      </div>
      <button @click="showCreateForm = true" class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>Create Gift Code</span>
        </div>
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Codes</p>
            <p class="text-2xl font-bold text-white">{{ statistics.total_codes || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Active Codes</p>
            <p class="text-2xl font-bold text-green-400">{{ statistics.active_codes || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Expired Codes</p>
            <p class="text-2xl font-bold text-red-400">{{ statistics.expired_codes || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Redemptions</p>
            <p class="text-2xl font-bold text-purple-400">{{ statistics.total_redemptions || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div class="relative">
            <input v-model="searchQuery" @input="debouncedSearch" placeholder="Search gift codes..." class="w-full sm:w-64 pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-400">
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <select v-model="filterType" @change="fetchGiftCodes" class="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
            <option value="">All Types</option>
            <option value="single">Single Use</option>
            <option value="multi">Multi Use</option>
            <option value="unlimited">Unlimited</option>
          </select>

          <select v-model="filterStatus" @change="fetchGiftCodes" class="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div class="flex items-center space-x-2">
          <button @click="generatePreviewCode" class="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Generate Sample</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Gift Codes Table -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-700/50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Code</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rewards</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Usage</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-700/50">
            <tr v-for="giftCode in giftCodes" :key="giftCode.id" class="hover:bg-slate-700/30 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="font-mono text-sm bg-slate-700/50 px-3 py-1 rounded-lg">
                    <span class="text-blue-400">{{ giftCode.code }}</span>
                  </div>
                  <button @click="copyToClipboard(giftCode.code)" class="ml-2 p-1 text-slate-400 hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getTypeColor(giftCode.type)">
                  {{ giftCode.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">
                  <div v-for="(value, key) in giftCode.rewards" :key="key" class="flex items-center space-x-2">
                    <span class="capitalize">{{ key }}:</span>
                    <span class="text-yellow-400 font-semibold">{{ value.toLocaleString() }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-white">
                  <div class="flex items-center space-x-2">
                    <span>{{ giftCode.used_count || 0 }}</span>
                    <span class="text-slate-400">/</span>
                    <span>{{ giftCode.max_usage || '∞' }}</span>
                  </div>
                  <div class="w-full bg-slate-700 rounded-full h-2 mt-1">
                    <div class="bg-blue-500 h-2 rounded-full" :style="{ width: getUsagePercentage(giftCode) + '%' }"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="giftCode.is_active ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'">
                  {{ giftCode.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button v-if="giftCode.is_active" @click="toggleGiftCodeStatus(giftCode.id, false)" class="text-yellow-400 hover:text-yellow-300 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </button>
                  <button v-else @click="toggleGiftCodeStatus(giftCode.id, true)" class="text-green-400 hover:text-green-300 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V3a1 1 0 011-1h1a1 1 0 011 1v3M9 7h6"/>
                    </svg>
                  </button>
                  <button @click="viewGiftCodeDetails(giftCode)" class="text-blue-400 hover:text-blue-300 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-slate-700/30 px-6 py-4 flex items-center justify-between">
        <div class="text-sm text-slate-400">
          Showing {{ Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1, pagination.totalItems || 0) }} to {{ Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems || 0) }} of {{ pagination.totalItems || 0 }} results
        </div>
        <div class="flex items-center space-x-2">
          <button @click="changePage(pagination.currentPage - 1)" :disabled="(pagination.currentPage || 1) <= 1" class="px-3 py-2 text-sm bg-slate-700/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600/50 transition-colors">
            Previous
          </button>
          <span class="px-3 py-2 text-sm text-white">
            Page {{ pagination.currentPage || 1 }} of {{ pagination.totalPages || 1 }}
          </span>
          <button @click="changePage(pagination.currentPage + 1)" :disabled="(pagination.currentPage || 1) >= (pagination.totalPages || 1)" class="px-3 py-2 text-sm bg-slate-700/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600/50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Create Gift Code Modal -->
    <div v-if="showCreateForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="showCreateForm = false">
      <div class="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700/50">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Create Gift Code</h3>
          <button @click="showCreateForm = false" class="text-slate-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createGiftCode" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Gift Code</label>
            <div class="flex space-x-2">
              <input v-model="newGiftCode.code" required class="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white" placeholder="WELCOME2024">
              <button type="button" @click="generateRandomCode" class="px-4 py-2 bg-slate-600/50 hover:bg-slate-500/50 text-white rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Type</label>
            <select v-model="newGiftCode.type" required class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
              <option value="single">Single Use</option>
              <option value="multi">Multi Use</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Coins</label>
              <input v-model.number="newGiftCode.rewards.coins" type="number" min="0" class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Gems</label>
              <input v-model.number="newGiftCode.rewards.gems" type="number" min="0" class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Usage Limit</label>
            <input v-model.number="newGiftCode.usageLimit" type="number" min="1" required class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Expires At</label>
            <input v-model="newGiftCode.expiresAt" type="datetime-local" class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
          </div>

          <div class="flex space-x-4 pt-4">
            <button type="button" @click="showCreateForm = false" class="flex-1 px-4 py-2 bg-slate-600/50 hover:bg-slate-500/50 text-white rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="isCreating" class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-colors disabled:opacity-50">
              {{ isCreating ? 'Creating...' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './Navigation.vue'
import { fetcher } from '../../service/fetcher.js'

// Emits
defineEmits(['back'])

// Reactive data
const giftCodes = ref([])
const statistics = ref({
  total_codes: 0,
  active_codes: 0,
  expired_codes: 0,
  total_redemptions: 0,
  avg_redemptions_per_code: 0
})
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
})

const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')
const showCreateForm = ref(false)
const isCreating = ref(false)

const newGiftCode = ref({
  code: '',
  type: 'multi',
  rewards: {
    coins: 0,
    gems: 0
  },
  usageLimit: 100,
  expiresAt: ''
})

// Methods
const fetchGiftCodes = async (page = 1) => {
  try {
    const token = localStorage.getItem('adminToken')
    const params = new URLSearchParams({
      page: page.toString(),
      limit: pagination.value.itemsPerPage.toString()
    })
    
    if (searchQuery.value) params.append('search', searchQuery.value)
    if (filterType.value) params.append('type', filterType.value)
    if (filterStatus.value) params.append('isActive', filterStatus.value)
    
    const data = await fetcher(`/giftCodes?${params}`)
    
    giftCodes.value = data.data.giftCodes || []
    pagination.value = data.data.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10
    }
  } catch (error) {
    console.error('Error fetching gift codes:', error)
  }
}

const fetchStatistics = async () => {
  try {
    const data = await fetcher('/giftCodes/statistics')
    statistics.value = data.data || {
      total_codes: 0,
      active_codes: 0,
      expired_codes: 0,
      total_redemptions: 0,
      avg_redemptions_per_code: 0
    }
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

const createGiftCode = async () => {
  isCreating.value = true
  try {
    await fetcher('/giftCodes/create', {
      method: 'POST',
      body: JSON.stringify(newGiftCode.value)
    })
    
    showCreateForm.value = false
    resetNewGiftCode()
    await fetchGiftCodes(1)
    await fetchStatistics()
  } catch (error) {
    console.error('Error creating gift code:', error)
  } finally {
    isCreating.value = false
  }
}

const toggleGiftCodeStatus = async (id, activate) => {
  try {
    const endpoint = activate ? 'activate' : 'deactivate'
    await fetcher(`/giftCodes/${id}/${endpoint}`, {
      method: 'PATCH'
    })
    
    await fetchGiftCodes(pagination.value.currentPage || 1)
    await fetchStatistics()
  } catch (error) {
    console.error('Error toggling gift code status:', error)
  }
}

const generateRandomCode = async () => {
  try {
    const data = await fetcher('/giftCodes/generate-preview')
    newGiftCode.value.code = data.data.code
  } catch (error) {
    console.error('Error generating random code:', error)
  }
}

const generatePreviewCode = async () => {
  try {
    const data = await fetcher('/giftCodes/generate-preview')
    alert(`Sample code: ${data.data.code}`)
  } catch (error) {
    console.error('Error generating preview code:', error)
  }
}

const resetNewGiftCode = () => {
  newGiftCode.value = {
    code: '',
    type: 'multi',
    rewards: {
      coins: 0,
      gems: 0
    },
    usageLimit: 100,
    expiresAt: ''
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= (pagination.value.totalPages || 1)) {
    fetchGiftCodes(page)
  }
}

const debouncedSearch = debounce(() => {
  fetchGiftCodes(1)
}, 500)

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
  } catch (error) {
    console.error('Error copying to clipboard:', error)
  }
}

const getTypeColor = (type) => {
  const colors = {
    single: 'bg-yellow-900/50 text-yellow-400',
    multi: 'bg-purple-900/50 text-purple-400',
    unlimited: 'bg-green-900/50 text-green-400'
  }
  return colors[type] || 'bg-slate-900/50 text-slate-400'
}

const getUsagePercentage = (giftCode) => {
  if (!giftCode.max_usage || giftCode.max_usage === 0) return 0
  const used = giftCode.used_count || 0
  return Math.min((used / giftCode.max_usage) * 100, 100)
}

const viewGiftCodeDetails = (giftCode) => {
  // You could implement a detailed view modal here
  console.log('View details for:', giftCode)
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Lifecycle
onMounted(() => {
  fetchGiftCodes(1)
  fetchStatistics()
})
</script>
