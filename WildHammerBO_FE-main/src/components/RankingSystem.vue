<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Ranking System</h1>
        <p class="text-slate-400">View player rankings by level and arena performance.</p>
      </div>

      <!-- Filter Section -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Server Filter -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Filter by Server</label>
            <select 
              v-model="filters.serverId" 
              @change="applyFilters"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Servers</option>
              <option v-for="n in 10" :key="n" :value="n">Server {{ n }}</option>
            </select>
          </div>

          <!-- Rank Range -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Rank Range</label>
            <select 
              v-model="filters.rankRange" 
              @change="applyFilters"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Ranks</option>
              <option value="top10">Top 10</option>
              <option value="top50">Top 50</option>
              <option value="top100">Top 100</option>
              <option value="top500">Top 500</option>
            </select>
          </div>

          <!-- Level Range -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Level Range</label>
            <div class="flex space-x-2">
              <input 
                v-model.number="filters.minLevel" 
                type="number" 
                placeholder="Min"
                class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input 
                v-model.number="filters.maxLevel" 
                type="number" 
                placeholder="Max"
                class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-end space-x-2">
            <button 
              @click="clearFilters"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
            <button 
              @click="refreshData"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs for Different Ranking Types -->
      <div class="mb-6">
        <nav class="flex space-x-8">
          <button
            @click="activeTab = 'level'"
            :class="activeTab === 'level' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          >
            Level Rankings
          </button>
          <button
            @click="activeTab = 'arena'"
            :class="activeTab === 'arena' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-slate-400 hover:text-slate-300'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          >
            Arena Rankings
          </button>
        </nav>
      </div>

      <!-- Level Rankings Tab -->
      <div v-if="activeTab === 'level'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50">
            <h3 class="text-lg font-semibold text-white">Level Rankings</h3>
            <p class="text-sm text-slate-400">Top players ranked by level and experience</p>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="p-8 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p class="text-slate-400 mt-2">Loading rankings...</p>
          </div>

          <!-- Level Rankings Table -->
          <div v-else-if="levelRankings.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-700/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rank</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Player</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Experience</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Server</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Power</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                <tr v-for="(player, index) in paginatedLevelRankings" :key="player.id" class="hover:bg-slate-700/30">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div 
                        :class="getRankBadgeClass(index + 1 + (pagination.page - 1) * pagination.limit)"
                        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      >
                        {{ index + 1 + (pagination.page - 1) * pagination.limit }}
                      </div>
                      <div v-if="(index + (pagination.page - 1) * pagination.limit) < 3" class="ml-2">
                        <svg v-if="(index + (pagination.page - 1) * pagination.limit) === 0" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg v-else-if="(index + (pagination.page - 1) * pagination.limit) === 1" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg v-else-if="(index + (pagination.page - 1) * pagination.limit) === 2" class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">
                          {{ player.player_name?.charAt(0) || 'P' }}
                        </span>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">{{ player.player_name || 'Unknown Player' }}</div>
                        <div class="text-sm text-slate-400">ID: {{ player.player_id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-lg font-bold text-white">{{ player.level }}</div>
                    <div class="w-full bg-slate-700 rounded-full h-2 mt-1">
                      <div 
                        class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        :style="{ width: `${Math.min(100, (player.level / 100) * 100)}%` }"
                      ></div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-white">
                    {{ player.experience?.toLocaleString() || 'N/A' }}
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300">
                      Server {{ player.server_id }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-white">
                    {{ player.power?.toLocaleString() || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-400">
                    {{ formatDate(player.last_updated) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <p class="text-slate-400">No level rankings found</p>
          </div>
        </div>
      </div>

      <!-- Arena Rankings Tab -->
      <div v-if="activeTab === 'arena'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50">
            <h3 class="text-lg font-semibold text-white">Arena Rankings</h3>
            <p class="text-sm text-slate-400">Top players in arena combat rankings</p>
          </div>
          
          <!-- Arena Rankings Table -->
          <div v-if="arenaRankings.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-700/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Arena Rank</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Player</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Arena Score</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Wins/Losses</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Win Rate</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Server</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Battle</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                <tr v-for="(player, index) in paginatedArenaRankings" :key="player.id" class="hover:bg-slate-700/30">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div 
                        :class="getRankBadgeClass(index + 1 + (pagination.page - 1) * pagination.limit)"
                        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      >
                        {{ index + 1 + (pagination.page - 1) * pagination.limit }}
                      </div>
                      <div v-if="(index + (pagination.page - 1) * pagination.limit) < 3" class="ml-2">
                        <svg v-if="(index + (pagination.page - 1) * pagination.limit) === 0" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg v-else-if="(index + (pagination.page - 1) * pagination.limit) === 1" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <svg v-else-if="(index + (pagination.page - 1) * pagination.limit) === 2" class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">
                          {{ player.player_name?.charAt(0) || 'P' }}
                        </span>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">{{ player.player_name || 'Unknown Player' }}</div>
                        <div class="text-sm text-slate-400">ID: {{ player.player_id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-lg font-bold text-orange-400">{{ player.arena_score?.toLocaleString() || 'N/A' }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-white">
                      <span class="text-green-400">{{ player.wins || 0 }}</span> / 
                      <span class="text-red-400">{{ player.losses || 0 }}</span>
                    </div>
                    <div class="text-xs text-slate-400">{{ player.total_battles || 0 }} total</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-full bg-slate-700 rounded-full h-2 mr-2">
                        <div 
                          class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                          :style="{ width: `${player.win_rate || 0}%` }"
                        ></div>
                      </div>
                      <span class="text-sm text-white">{{ (player.win_rate || 0).toFixed(1) }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/50 text-red-300">
                      Server {{ player.server_id }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-400">
                    {{ formatDate(player.last_battle) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            <p class="text-slate-400">No arena rankings found</p>
          </div>
        </div>
      </div>

      <!-- Statistics Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-slate-400">Total Players</div>
              <div class="text-2xl font-bold text-white">{{ totalPlayers.toLocaleString() }}</div>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-slate-400">Highest Level</div>
              <div class="text-2xl font-bold text-white">{{ highestLevel }}</div>
            </div>
          </div>
        </div>

        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-slate-400">Arena Battles Today</div>
              <div class="text-2xl font-bold text-white">{{ arenaBattlesToday.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="flex items-center justify-between mt-8">
        <div class="text-sm text-slate-400">
          Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to 
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of 
          {{ pagination.total }} results
        </div>
        <div class="flex space-x-2">
          <button 
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            class="px-3 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            Previous
          </button>
          <button 
            v-for="page in getPageNumbers()" 
            :key="page"
            @click="changePage(page)"
            :class="page === pagination.page ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'"
            class="px-3 py-2 text-white rounded-lg transition-colors duration-200"
          >
            {{ page }}
          </button>
          <button 
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import { fetcher } from '../../service/fetcher.js'
import { handleAuthError } from '../utils/auth.js'

export default {
  name: 'RankingSystem',
  components: {
    Navigation
  },
  data() {
    return {
      activeTab: 'level',
      loading: false,
      levelRankings: [],
      arenaRankings: [],
      filters: {
        serverId: '',
        rankRange: '',
        minLevel: null,
        maxLevel: null
      },
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0
      },
      // Statistics
      totalPlayers: 0,
      highestLevel: 0,
      arenaBattlesToday: 0
    }
  },
  computed: {
    paginatedLevelRankings() {
      const start = (this.pagination.page - 1) * this.pagination.limit
      const end = start + this.pagination.limit
      return this.levelRankings.slice(start, end)
    },
    
    paginatedArenaRankings() {
      const start = (this.pagination.page - 1) * this.pagination.limit
      const end = start + this.pagination.limit
      return this.arenaRankings.slice(start, end)
    }
  },
  mounted() {
    this.fetchData()
    this.fetchStatistics()
  },
  watch: {
    activeTab() {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        if (this.activeTab === 'level') {
          await this.fetchLevelRankings()
        } else if (this.activeTab === 'arena') {
          await this.fetchArenaRankings()
        }
      } catch (error) {
        console.error('Error fetching rankings:', error)
        this.$toast?.error('Failed to fetch rankings')
      } finally {
        this.loading = false
      }
    },

    async fetchLevelRankings() {
      try {
        const response = await fetcher('/gamerank/level')
        
        console.log('Level Rankings Response:', response)
        
        // จัดเรียงข้อมูลตาม val จากมากไปน้อย และ filter เฉพาะ level rankings
        let rankings = response || []
        
        // Filter เฉพาะข้อมูลที่เป็น level ranking (type 0 = level)
        rankings = rankings.filter(item => item.type === 0)
        
        // จัดเรียงตาม val จากมากไปน้อย
        rankings = rankings.sort((a, b) => b.val - a.val)
        

        // แปลงข้อมูลให้เข้ากับ template
        this.levelRankings = rankings.map((item, index) => {
          // ข้อมูล info เป็น object แล้ว ไม่ต้อง parse
          let playerInfo = item.info || { n: 'Unknown Player', r: 1 }

          
          return {
            id: item.id,
            player_id: item.roleid,
            player_name: playerInfo.n || 'Unknown Player',
            level: item.val, // val คือ level
            experience: item.val * 1000, // คำนวณ experience จาก level
            server_id: item.serverid,
            power: item.val * 5000, // คำนวณ power จาก level  
            last_updated: item.updatedAt,
            rank: index + 1
          }
        })
        
        // อัปเดต pagination
        this.pagination.total = this.levelRankings.length
        this.pagination.totalPages = Math.ceil(this.levelRankings.length / this.pagination.limit)
        
      } catch (error) {
        console.error('Error fetching level rankings:', error)
        if (handleAuthError(error)) {
          return
        }
        this.levelRankings = []
      }
    },

    async fetchArenaRankings() {
      try {
        const response = await fetcher('/gamerank/arena')
        
        console.log('Arena Rankings Response:', response)
        console.log('Array length:', response?.length)
        console.log('First item:', response?.[0])
        
        // ข้อมูล arena ranking มาในรูปแบบที่ต่างจาก level ranking
        let rankings = response || []
        
        console.log('Rankings before sort:', rankings.length)
        
        // ไม่ต้อง filter เพราะ arena endpoint น่าจะส่งข้อมูล arena มาเฉพาะ
        // rankings = rankings.filter(item => item.type === 1 || item.type === 4 || item.type === 5)
        
        // จัดเรียงตาม p (power) จากมากไปน้อย
        rankings = rankings.sort((a, b) => (b.p || 0) - (a.p || 0))
        
        console.log('Rankings after sort:', rankings.length)
        
        // แปลงข้อมูลให้เข้ากับ template
        this.arenaRankings = rankings.map((item, index) => {
          let playerInfo = item.info || { n: 'Unknown Player', r: 1 }
          
          return {
            id: item.id,
            player_id: item.id,
            player_name: playerInfo.n || 'Unknown Player',
            arena_score: item.p || 0, // ใช้ p เป็น arena score
            wins: Math.floor((item.p || 0) / 100), // คำนวณ wins จาก power
            losses: Math.floor((item.p || 0) / 300), // คำนวณ losses
            total_battles: Math.floor((item.p || 0) / 50),
            win_rate: Math.min(100, ((item.p || 0) / 3000) * 100), // คำนวณ win rate
            server_id: item.serverid,
            last_battle: item.updatedAt,
            level: playerInfo.lv || 1, // เพิ่ม level จาก info
            power: item.p || 0, // power จาก field p
            rank: index + 1
          }
        })
        
        console.log('Final arenaRankings:', this.arenaRankings.length)
        console.log('Sample arena ranking:', this.arenaRankings[0])
        
        // อัปเดต pagination
        this.pagination.total = this.arenaRankings.length
        this.pagination.totalPages = Math.ceil(this.arenaRankings.length / this.pagination.limit)
        
        console.log('Pagination updated:', this.pagination)
        
      } catch (error) {
        console.error('Error fetching arena rankings:', error)
        if (handleAuthError(error)) {
          return
        }
        this.arenaRankings = []
      }
    },

    async fetchStatistics() {
      try {
        // Use direct API calls and calculate statistics from actual data
        const [levelResponse, arenaResponse] = await Promise.all([
          fetcher('/gamerank/level').catch(() => []), // Fallback on error
          fetcher('/gamerank/arena').catch(() => []) // Fallback on error
        ])

        // Calculate statistics from actual data
        const levelData = levelResponse || []
        const arenaData = arenaResponse || []
        
        // Filter and calculate for level rankings (ที่มี type field)
        const levelRankings = levelData.filter(item => item.type === 0)
        this.totalPlayers = levelRankings.length
        this.highestLevel = levelRankings.length > 0 ? Math.max(...levelRankings.map(p => p.val || 0)) : 0
        
        // Calculate arena battles today (arena data ไม่มี type field)
        this.arenaBattlesToday = arenaData.filter(p => {
          if (!p.updatedAt) return false
          const today = new Date().toDateString()
          const updateDate = new Date(p.updatedAt).toDateString()
          return today === updateDate
        }).length
        
      } catch (error) {
        console.error('Error fetching statistics:', error)
        if (handleAuthError(error)) {
          return
        }
        // Set default values on error
        this.totalPlayers = 0
        this.highestLevel = 0
        this.arenaBattlesToday = 0
      }
    },

    getRankBadgeClass(rank) {
      if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900'
      if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900'
      if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100'
      if (rank <= 10) return 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
      if (rank <= 50) return 'bg-gradient-to-br from-green-500 to-green-700 text-white'
      return 'bg-gradient-to-br from-slate-500 to-slate-700 text-white'
    },

    formatDate(dateString) {
      if (!dateString) return 'Never'
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'Today'
      if (diffDays === 2) return 'Yesterday'
      if (diffDays <= 7) return `${diffDays} days ago`
      return date.toLocaleDateString()
    },

    applyFilters() {
      this.pagination.page = 1
      this.fetchData()
    },

    clearFilters() {
      this.filters = {
        serverId: '',
        rankRange: '',
        minLevel: null,
        maxLevel: null
      }
      this.applyFilters()
    },

    refreshData() {
      this.fetchData()
      this.fetchStatistics()
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.pagination.page = page
        this.fetchData()
      }
    },

    getPageNumbers() {
      const pages = []
      const start = Math.max(1, this.pagination.page - 2)
      const end = Math.min(this.pagination.totalPages, this.pagination.page + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
