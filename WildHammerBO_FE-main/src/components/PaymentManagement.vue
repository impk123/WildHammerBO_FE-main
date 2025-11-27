<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <button @click="$emit('back')" class="p-2 text-slate-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-white">Payment Management</h1>
          <p class="text-slate-400">Monitor transactions and revenue analytics</p>
        </div>
      </div>
      <!-- Refresh All Button -->
      <button 
        @click="refreshAll" 
        class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg flex items-center space-x-2"
        title="Refresh all data"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <span>Refresh All</span>
      </button>
    </div>

    <!-- Analytics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Revenue</p>
            <p class="text-2xl font-bold text-green-400">${{ analytics.transaction_stats?.total_revenue?.toLocaleString() || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Total Transactions</p>
            <p class="text-2xl font-bold text-blue-400">{{ analytics.transaction_stats?.total_transactions || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Success Rate</p>
            <p class="text-2xl font-bold text-purple-400">{{ analytics.transaction_stats?.updated_transactions || 0 }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-slate-400 text-sm">Failed Transactions</p>
            <p class="text-2xl font-bold text-red-400">{{ ((analytics.transaction_stats?.total_transactions || 0) - (analytics.transaction_stats?.updated_transactions || 0)) }}</p>
          </div>
          <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
      <div class="flex border-b border-slate-700/50">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 px-6 py-4 text-sm font-medium transition-colors',
            activeTab === tab.id 
              ? 'bg-slate-700/50 text-white border-b-2 border-blue-500' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
          ]"
        >
          <div class="flex items-center justify-center space-x-2">
            <component :is="tab.icon" class="w-5 h-5" />
            <span>{{ tab.label }}</span>
          </div>
        </button>
      </div>


      <!-- Transactions Tab -->
      <div v-if="activeTab === 'transactions'" class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">Recent Transactions</h3>
          <div class="flex items-center space-x-4">
            <!-- Server Filter -->
            <select 
              v-model="selectedServerId" 
              @change="debouncedTransactionSearch"
              class="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
            >
              <option value="">All Servers</option>
              <option v-for="game in games" :key="game.id" :value="game.id">
                {{ game.name }}
              </option>
            </select>
            
            <input v-model="transactionSearch" @input="debouncedTransactionSearch" placeholder="Search transactions..." class="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-400">
            
            <!-- Refresh Button -->
            <button 
              @click="refreshTransactions" 
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
              title="Refresh transactions"
            >
              <svg 
                :class="['w-4 h-4', isLoading ? 'animate-spin' : '']" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span class="hidden sm:inline">{{ isLoading ? 'Refreshing...' : 'Refresh' }}</span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span class="ml-3 text-slate-400">Loading transactions...</span>
        </div>

        <!-- Empty State -->
        <div v-else-if="transactions.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-slate-400">No transactions found</p>
        </div>

        <!-- Transactions Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-700/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Payment ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Server</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Username</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr v-for="transaction in transactions" :key="transaction.id" class="hover:bg-slate-700/30 transition-colors">
                <!-- Date Created -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {{ formatDate(transaction.created_at) }}
                </td>
                <!-- Payment ID -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="font-mono text-sm text-blue-400">{{ transaction.transaction_id }}</span>
                </td>
                <!-- Server -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400">
                    Server {{ transaction.server_id }}
                  </span>
                </td>
                <!-- Username -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm text-white font-medium">{{ transaction.user_id }}</span>
                    <span class="text-xs text-slate-400">{{ transaction.receipt_email }}</span>
                  </div>
                </td>
                <!-- Amount -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col">
                    <span class="text-sm text-green-400 font-semibold">{{ transaction.amount.toLocaleString() }}</span>
                    <span class="text-xs text-slate-400 uppercase">{{ transaction.currency }}</span>
                  </div>
                </td>
                <!-- Method -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-400">
                    {{ transaction.payment_method_types }}
                  </span>
                </td>
                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusColor(transaction.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.totalPages > 1" class="flex items-center justify-between mt-6">
          <div class="text-sm text-slate-400">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="loadPage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-2 text-sm bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-2 text-sm text-slate-300">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button 
              @click="loadPage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.totalPages"
              class="px-3 py-2 text-sm bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'" class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-white">Payment Analytics</h3>
          <button 
            @click="refreshAnalytics" 
            class="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
            title="Refresh analytics"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span class="hidden sm:inline">Refresh Analytics</span>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Revenue Chart Placeholder -->
          <div class="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
            <h4 class="text-white font-semibold mb-4">Revenue Trends</h4>
            <div class="h-64 flex items-center justify-center text-slate-400">
              <div class="text-center">
                <svg class="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <p>Revenue chart would be displayed here</p>
                <p class="text-sm">Integration with chart library needed</p>
              </div>
            </div>
          </div>

          <!-- Top Packages -->
          <div class="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50">
            <h4 class="text-white font-semibold mb-4">Top Performing Packages</h4>
            <div class="space-y-4">
              <div v-for="(packageItem, index) in topPackages" :key="packageItem.package_id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span class="text-blue-400 font-semibold text-sm">{{ index + 1 }}</span>
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ packageItem.name }}</p>
                    <p class="text-slate-400 text-sm">${{ packageItem.price_usd }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-green-400 font-semibold">{{ packageItem.sales || 0 }} sales</p>
                  <p class="text-slate-400 text-sm">${{ (packageItem.revenue || 0).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import Navigation from './Navigation.vue'
import { fetcher } from '../../service/fetcher.js'
import { handleAuthError } from '../utils/auth.js'

// Emits
defineEmits(['back'])

// Icons as components

const TransactionIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' })
])

const AnalyticsIcon = () => h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

// Reactive data
const activeTab = ref('transactions')
const transactions = ref([])
const analytics = ref({})
const games = ref([])

const transactionSearch = ref('')
const selectedServerId = ref('')
const isLoading = ref(false)
const pagination = ref(null)

const tabs = ref([
  { id: 'transactions', label: 'Transactions', icon: TransactionIcon },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon }
])


// Methods

const fetchGames = async () => {
  try {
    const response = await fetcher('/games')
    if (response.success) {
      games.value = response.data
    }
  } catch (error) {
    console.error('Error fetching games:', error)
    
    // Handle authentication errors
    if (handleAuthError(error)) {
      return
    }
  }
}

const fetchTransactions = async (userId = null) => {
  try {
    isLoading.value = true
    
    // Build query parameters
    const params = new URLSearchParams()
    params.append('page', pagination.value?.page || '1')
    params.append('limit', pagination.value?.limit || '50')
    params.append('sort_by', 'create_at')
    params.append('sort_order', 'DESC')
    
    if (userId) {
      params.append('username', userId)
    }
    
    // Add search filter if exists
    if (transactionSearch.value) {
      params.append('username', transactionSearch.value)
    }
    
    // Add server filter if exists
    if (selectedServerId.value) {
      params.append('server_id', selectedServerId.value)
    }
    
    const queryString = params.toString()
    const url = `/paymentHistory${queryString ? `?${queryString}` : ''}`
    
    const response = await fetcher(url)
    
    if (response.success) {
      // Transform data to match the expected format
      transactions.value = response.data.map(item => ({
        id: item.id,
        transaction_id: item.payment_id,
        user_id: item.username,
        package_id: item.payment_method_types,
        package_name: `${item.payment_method_types} - ${item.currency.toUpperCase()}`,
        amount: parseFloat(item.amount),
        currency: item.currency,
        status: item.is_updated_data ? 'completed' : 'pending',
        created_at: item.create_at,
        server_id: item.server_id,
        receipt_email: item.receipt_email,
        payment_method_types: item.payment_method_types,
        is_updated_data: item.is_updated_data
      }))
      
      // Update pagination info
      if (response.pagination) {
        pagination.value = response.pagination
      }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    
    // Handle authentication errors
    if (handleAuthError(error)) {
      return
    }
    
    // Fallback to empty array on error
    transactions.value = []
  } finally {
    isLoading.value = false
  }
}

const fetchAnalytics = async () => {
  try {
    const data = await fetcher('/payments/admin/analytics')
    //console.log(data.data);
    analytics.value = data.data
  } catch (error) {
    console.error('Error fetching analytics:', error)
    
    // Handle authentication errors
    if (handleAuthError(error)) {
      return
    }
  }
}



const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-900/50 text-green-400',
    pending: 'bg-yellow-900/50 text-yellow-400',
    failed: 'bg-red-900/50 text-red-400',
    canceled: 'bg-slate-900/50 text-slate-400'
  }
  return colors[status] || 'bg-slate-900/50 text-slate-400'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok'
  }) + ' (GMT+7)'
}

const debouncedTransactionSearch = debounce(() => {
  // Reset pagination when searching/filtering
  pagination.value = { ...pagination.value, page: 1 }
  // Implement transaction search
  fetchTransactions()
}, 500)

const loadPage = async (page) => {
  if (page < 1 || (pagination.value && page > pagination.value.totalPages)) return
  pagination.value.page = page
  await fetchTransactions()
}

// Refresh transactions function
const refreshTransactions = async () => {
  try {
    // Clear search and server filter to get all transactions
    transactionSearch.value = ''
    selectedServerId.value = ''
    // Reset pagination to first page
    pagination.value = null
    // Fetch fresh data
    await fetchTransactions()
  } catch (error) {
    console.error('Error refreshing transactions:', error)
  }
}

// Refresh analytics function
const refreshAnalytics = async () => {
  try {
    await fetchAnalytics()
  } catch (error) {
    console.error('Error refreshing analytics:', error)
  }
}


// Refresh all data function
const refreshAll = async () => {
  try {
    // Clear search and server filter, reset pagination for transactions
    transactionSearch.value = ''
    selectedServerId.value = ''
    pagination.value = null
    
    // Fetch all data in parallel
    await Promise.all([
      fetchGames(),
      fetchTransactions(),
      fetchAnalytics()
    ])
  } catch (error) {
    console.error('Error refreshing all data:', error)
  }
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
  fetchGames()
  fetchTransactions()
  fetchAnalytics()
})
</script>
