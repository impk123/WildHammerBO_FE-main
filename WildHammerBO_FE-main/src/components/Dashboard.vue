<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p class="text-slate-400">Welcome back! Here's what's happening with your game.</p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div class="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-300 text-sm font-medium">Total Revenue</p>
              <p class="text-2xl font-bold text-white">${{ stats.totalRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-cyan-600/20 to-cyan-700/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-300 text-sm font-medium">Total Transactions</p>
              <p class="text-2xl font-bold text-white">{{ stats.totalTransactions.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-300 text-sm font-medium">Success Rate</p>
              <p class="text-2xl font-bold text-white">{{ stats.successTransactions.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-red-300 text-sm font-medium">Failed Transactions</p>
              <p class="text-2xl font-bold text-white">{{ stats.failedTransactions.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Management Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Gift Code Management -->
        <router-link to="/gift-codes" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Gift Code Management</h3>
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
            </svg>
          </div>
          <p class="text-slate-400 text-sm mb-4">Create, manage, and monitor gift codes for your game.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Active Codes</span>
              <span class="text-green-400">{{ stats.activeCodes }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Total Used</span>
              <span class="text-blue-400">{{ stats.totalRedemptions }}</span>
            </div>
          </div>
        </router-link>

        <!-- Payment Management -->
        <router-link to="/payments" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 cursor-pointer block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Payment Management</h3>
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <p class="text-slate-400 text-sm mb-4">Monitor transactions, packages, and revenue analytics.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Revenue</span>
              <span class="text-green-400">${{ stats.totalRevenue.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Transactions</span>
              <span class="text-blue-400">{{ stats.totalTransactions }}</span>
            </div>
          </div>
        </router-link>

        <!-- Admin Management -->
        <router-link to="/admin-management" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Admin Management</h3>
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <p class="text-slate-400 text-sm mb-4">Manage administrator accounts and permissions.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Admin Users</span>
              <span class="text-purple-400">3</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Permissions</span>
              <span class="text-blue-400">All Access</span>
            </div>
          </div>
        </router-link>

         <!-- User Management -->
        <router-link to="/user-management" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">User Management</h3>
            <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="text-slate-400 text-sm mb-4">Manage user accounts and roles.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Total Users</span>
              <span class="text-purple-300">50</span>
            </div>
          </div>
        </router-link>

        <!-- Ranking System -->
        <router-link to="/ranking" class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer block">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-white">Ranking System</h3>
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m0-5l-4-4-4 4m8 5H4m16 0h-4"/>
            </svg>
          </div>
          <p class="text-slate-400 text-sm mb-4">View and manage player rankings and stats.</p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Total Players</span>
              <span class="text-cyan-400">1200</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-400">Highest Level</span>
              <span class="text-cyan-400">99</span>
            </div>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './Navigation.vue'
import { fetcher } from '../../service/fetcher.js'
import { handleAuthError } from '../utils/auth.js'

// Reactive data
const stats = ref({
  totalRevenue: 0,
  totalTransactions: 0,
  successTransactions: 0,
  failedTransactions: 0
})

// Methods
const fetchStats = async () => {
  try {
    // Fetch payment analytics stats
    const analyticsData = await fetcher('/payments/admin/analytics')
    if (analyticsData.success) {
      stats.value.totalRevenue = analyticsData.data.transaction_stats?.total_revenue || 0
      stats.value.totalTransactions = analyticsData.data.transaction_stats?.total_transactions || 0
      stats.value.successTransactions = analyticsData.data.transaction_stats?.updated_transactions || 0
      stats.value.failedTransactions = analyticsData.data.transaction_stats?.pending_transactions || 0
    } else {
      // Fallback: fetch from payment history with pagination
      const paymentData = await fetcher('/paymentHistory?limit=1000')
      if (paymentData.success) {
        const transactions = paymentData.data || []
        stats.value.totalTransactions = transactions.length
        stats.value.totalRevenue = transactions.reduce((sum, transaction) => {
          return sum + (parseFloat(transaction.amount) || 0)
        }, 0)
      }
    }
    
  } catch (error) {
    console.error('Error fetching stats:', error)
    
    // Handle authentication errors
    if (handleAuthError(error)) {
      return
    }
  }
}

// Lifecycle
onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
/* Component-specific styles */
</style>
