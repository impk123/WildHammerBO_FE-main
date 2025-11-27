<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">User Management</h1>
        <p class="text-slate-400">Manage game users, servers, and roles.</p>
      </div>

      <!-- Filter Section -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Server Filter -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Filter by Server</label>
            <select v-model="filters.serverId" @change="fetchGameServers"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Servers</option>
              <option v-for="server in gameServers" :key="server.id" :value="server.id">
                {{ server.server_name }} ({{ server.status }})
              </option>
            </select>
          </div>

          <!-- User Search -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Search User</label>
            <input v-model="filters.username" @input="debouncedSearch" type="text"
              placeholder="Enter username or user ID"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <!-- Role Filter -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Filter by Role</label>
            <select v-model="filters.role" @change="applyFilters"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-end space-x-2">
            <button @click="clearFilters"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200">
              Clear Filters
            </button>
            <button @click="refreshData"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs for Different User Types -->
      <div class="mb-6">
        <nav class="flex space-x-8">
          <button @click="activeTab = 'game-users'" :class="activeTab === 'game-users'
            ? 'border-blue-500 text-blue-400'
            : 'border-transparent text-slate-400 hover:text-slate-300'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
            Game Users
          </button>
          <button @click="activeTab = 'backend-users'" :class="activeTab === 'backend-users'
            ? 'border-blue-500 text-blue-400'
            : 'border-transparent text-slate-400 hover:text-slate-300'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
            Backend Users
          </button>
          <button @click="activeTab = 'game-servers'" :class="activeTab === 'game-servers'
            ? 'border-blue-500 text-blue-400'
            : 'border-transparent text-slate-400 hover:text-slate-300'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
            Game Servers
          </button>
        </nav>
      </div>

      <!-- Game Users Tab -->
      <div v-if="activeTab === 'game-users'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50">
            <h3 class="text-lg font-semibold text-white">Game Users</h3>
            <p class="text-sm text-slate-400">Manage in-game users and their equipment</p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="p-8 text-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p class="text-slate-400 mt-2">Loading users...</p>
          </div>

          <!-- Game Users Table -->
          <div v-else-if="gameUsers.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-700/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User Info
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Server
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Created
                    Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider flex justify-center">Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                <tr v-for="user in gameUsers" :key="user.id" class="hover:bg-slate-700/30">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">
                          {{ (user.name || user.userid || 'U').charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">{{ user.name || 'Unknown' }}</div>
                        <div class="text-sm text-slate-400">User ID: {{ user.userid }}</div>
                        <div class="text-xs text-slate-500">ID: {{ user.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300">
                      Server {{ user.serverid }}
                    </span>
                    <div class="text-xs text-slate-400 mt-1">
                      Origin: {{ user.originServerid }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="user.status === 0
                      ? 'bg-green-900/50 text-green-300'
                      : 'bg-red-900/50 text-red-300'"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ user.status === 0 ? 'Active' : 'Inactive' }}
                    </span>
                    <div class="text-xs text-slate-400 mt-1">
                      {{ user.isng ? 'NG User' : 'Normal User' }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-white">{{ formatDate(user.createdAt) }}</div>
                    <div class="text-xs text-slate-400">
                      Updated: {{ formatDate(user.updatedAt) }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2 justify-center">
                      <button @click="viewUserInventory(user)" class="text-purple-400 hover:text-purple-300"
                        title="View Inventory">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </button>
                      <!-- <button @click="editUser(user)" class="text-blue-400 hover:text-blue-300" title="Edit User">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="viewUserDetails(user)" class="text-green-400 hover:text-green-300"
                        title="View Details">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="text-slate-400">No game users found</p>
          </div>
        </div>
      </div>

      <!-- Backend Users Tab -->
      <div v-if="activeTab === 'backend-users'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50">
            <h3 class="text-lg font-semibold text-white">Backend Users</h3>
            <p class="text-sm text-slate-400">Manage admin and backend users</p>
          </div>

          <!-- Backend Users Table -->
          <div v-if="backendUsers.length > 0" class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-700/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User Info
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Real Money
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Game Info
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-700/50">
                <tr v-for="user in backendUsers" :key="user.id" class="hover:bg-slate-700/30">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span class="text-white text-sm font-medium">
                          {{ (user.channelUserId || user.email || 'U').charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-white">{{ user.channelUserId || 'Unknown' }}</div>
                        <div class="text-sm text-slate-400">{{ user.email || 'No email' }}</div>
                        <div class="text-xs text-slate-500">ID: {{ user.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span :class="getRoleColor(determineUserRole(user))"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ determineUserRole(user) }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-lg font-semibold text-green-400">฿{{ parseFloat(user.realMoney ||
                      0).toLocaleString() }}</div>
                    <div class="text-xs text-slate-400">
                      {{ parseFloat(user.realMoney || 0) >= 10000 ? 'High Value' : parseFloat(user.realMoney || 0) >=
                        5000 ? 'Medium Value' : 'Standard' }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-white">Game ID: {{ user.gameId }}</div>
                    <div class="text-xs text-slate-400">Channel: {{ user.channelType }}</div>
                    <div class="text-xs text-slate-500">App ID: {{ user.channelAppId }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <span :class="user.verified === 1
                        ? 'bg-green-900/50 text-green-300'
                        : 'bg-red-900/50 text-red-300'"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ user.verified === 1 ? '✓ Verified' : '✗ Unverified' }}
                      </span>
                      <div class="text-xs text-slate-400">
                        Codes: {{ user.countGetCode }}/{{ user.verifyCode }}
                      </div>
                      <div class="text-xs text-slate-500">
                        Updated: {{ formatDate(user.updatedAt) }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button @click="editBackendUser(user)" class="text-blue-400 hover:text-blue-300"
                        title="Edit User">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button @click="updateUserRealmoney(user)" class="text-green-400 hover:text-green-300"
                        title="Update Real Money">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </button>
                      <button @click="updateUserPassword(user)" class="text-yellow-400 hover:text-yellow-300"
                        title="Update Password">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <p class="text-slate-400">No backend users found</p>
          </div>
        </div>
      </div>

      <!-- Game Servers Tab -->
      <div v-if="activeTab === 'game-servers'" class="space-y-6">
        <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-700/50">
            <h3 class="text-lg font-semibold text-white">Game Servers</h3>
            <p class="text-sm text-slate-400">Monitor and manage game servers</p>
          </div>

          <!-- Game Servers Grid -->
          <div v-if="gameServers.length > 0" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="server in gameServers" :key="server.id"
                class="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-lg font-semibold text-white">{{ server.server_name }}</h4>
                  <span :class="server.status === 'online'
                    ? 'bg-green-900/50 text-green-300'
                    : 'bg-red-900/50 text-red-300'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ server.status }}
                  </span>
                </div>

                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Region:</span>
                    <span class="text-white">{{ server.server_region || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Players:</span>
                    <span class="text-white">{{ server.player_count?.toLocaleString() || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Capacity:</span>
                    <span class="text-white">{{ server.max_capacity?.toLocaleString() || 'N/A' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-slate-400">Last Updated:</span>
                    <span class="text-white">{{ formatDate(server.last_updated) }}</span>
                  </div>
                </div>

                <div class="mt-4 pt-4 border-t border-slate-600/50">
                  <button @click="manageServer(server)"
                    class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    Manage Server
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="p-8 text-center">
            <p class="text-slate-400">No game servers found</p>
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
          <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1"
            class="px-3 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600">
            Previous
          </button>
          <button v-for="page in getPageNumbers()" :key="page" @click="changePage(page)"
            :class="page === pagination.page ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'"
            class="px-3 py-2 text-white rounded-lg transition-colors duration-200">
            {{ page }}
          </button>
          <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600">
            Next
          </button>
        </div>
      </div>
    </main>

    <!-- Inventory Modal -->
    <div v-if="showInventoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-white">
            Game Info - {{ selectedUser?.name || selectedUser?.userid || 'Unknown User' }}
          </h3>
          <button @click="showInventoryModal = false" class="text-slate-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- User Info -->
        <div class="bg-slate-700/50 rounded-lg p-4 mb-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-slate-400">User ID:</span>
              <span class="text-white ml-2">{{ selectedUser?.userid }}</span>
            </div>
            <div>
              <span class="text-slate-400">Server:</span>
              <span class="text-white ml-2">{{ selectedUser?.serverid }}</span>
            </div>
            <div>
              <span class="text-slate-400">Status:</span>
              <span :class="selectedUser?.status === 0 ? 'text-green-400' : 'text-red-400'" class="ml-2">
                {{ selectedUser?.status === 0 ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div>
              <span class="text-slate-400">Total Items:</span>
              <span class="text-white ml-2">{{ userInventory.length }}</span>
            </div>
          </div>
        </div>

        <!-- Tabs for Game Info and Equipment -->
        <div class="mb-6">
          <nav class="flex space-x-8">
            <button @click="activeInventoryTab = 'game-info'" :class="activeInventoryTab === 'game-info'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'"
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
              Game Info
            </button>
            <button @click="activeInventoryTab = 'equipment'" :class="activeInventoryTab === 'equipment'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-300'"
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200">
              Equipment ({{ userEquipments.length }})
            </button>
          </nav>
        </div>

        <!-- Game Info Tab -->
        <div v-if="activeInventoryTab === 'game-info'" class="overflow-y-auto max-h-96">
          <div v-if="userInventory.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="item in userInventory" :key="item.id"
              class="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
              <div class="flex items-center justify-between mb-2">
                <h4 class="text-white font-medium">{{ item.item_name }}</h4>
                <span :class="getRarityColor(item.rarity)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ item.rarity }}
                </span>
              </div>
              <div class="text-sm text-slate-400">
                Value: <span class="text-white font-semibold text-lg">{{ item.quantity.toLocaleString() }}</span>
              </div>
              <div class="text-xs text-slate-500 mt-1">
                Type: {{ item.type }}
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-slate-400">No game info found for this user</p>
          </div>
        </div>

        <!-- Equipment Tab -->
        <div v-if="activeInventoryTab === 'equipment'" class="h-full overflow-y-auto pb-10 scrollbar-hide max-h-96">
          <div v-if="userEquipments.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="equip in userEquipments" :key="equip.eid"
              class="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50 relative">
              <!-- Equipment Background -->
              <!-- <div v-if="equip.background" class="absolute inset-0 rounded-lg opacity-30" :style="{
                backgroundImage: `url(${equip.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }"></div> -->

              <!-- Background Overlay for better text readability -->
              <div class="absolute inset-0 rounded-lg bg-slate-800/40"></div>

              <!-- Equipment Icon -->
              <div class="relative z-10 flex items-center justify-center mb-4">
                <div
                  class="w-20 h-20 bg-slate-600/30 rounded-lg flex  items-center justify-center border-2 border-slate-500/30 shadow-lg">
                  <img v-if="equip.icon" :src="equip.icon" :alt="equip.name"
                    class="w-16 h-16 object-contain drop-shadow-lg z-10" @error="$event.target.style.display = 'none'" />


                  <div class="w-20 h-20 object-contain drop-shadow-lg left-[50%] top-[50%] z-0 translate-x-[-50%] translate-y-[-50%] absolute inset-0">
                    <img v-if="equip.icon" :src="equip.background" :alt="equip.name"
                      class="w-full h-full object-contain drop-shadow-lg" @error="$event.target.style.display = 'none'" />
                  </div>

                </div>
              </div>

              <!-- Equipment Info -->
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-white font-semibold text-sm drop-shadow-lg">{{ equip.name }}</h4>
                  <!-- <span :class="getRarityColor(equip.rarity)"
                    class="px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                    {{ equip.rarity }}
                  </span> -->
                </div>

                <div class="space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-300 font-medium">Level:</span>
                    <span class="text-white font-semibold">{{ equip.level }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-300 font-medium">Quality:</span>
                    <span class="text-yellow-400 font-semibold">{{ equip.qid }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-300 font-medium">Breakthrough:</span>
                    <span class="text-green-400 font-semibold">{{ equip.bper }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-300 font-medium">Category:</span>
                    <span class="text-white font-semibold">{{ equip.category }}</span>
                  </div>
                </div>

                <!-- Stats -->
                <div class="mt-3 pt-3 border-t border-slate-600/50">
                  <div class="grid grid-cols-2 gap-1 text-xs">
                    <div class="flex justify-between">
                      <span class="text-slate-300 font-medium">HP:</span>
                      <span class="text-red-400 font-semibold">{{ equip.stats.hp.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-300 font-medium">ATK:</span>
                      <span class="text-orange-400 font-semibold">{{ equip.stats.atk.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-300 font-medium">DEF:</span>
                      <span class="text-blue-400 font-semibold">{{ equip.stats.def.toLocaleString() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-slate-300 font-medium">SPD:</span>
                      <span class="text-yellow-400 font-semibold">{{ equip.stats.atkspeed.toLocaleString() }}</span>
                    </div>
                  </div>

                  <!-- Additional Stats -->
                  <div v-if="equip.add" class="mt-2 pt-2 border-t border-slate-600/30">
                    <div class="text-xs text-slate-300 font-medium mb-1">Additional Stats:</div>
                    <div v-for="(addGroup, addKey) in equip.add" :key="addKey" class="space-y-1">
                      <div v-for="(value, statId) in addGroup" :key="statId" class="flex justify-between text-xs">
                        <span class="text-slate-300 font-medium">+{{ statId }}:</span>
                        <span class="text-green-400 font-semibold">+{{ value.toLocaleString() }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8">
            <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p class="text-slate-400">No equipment found for this user</p>
          </div>
        </div>

        <!-- Modal Actions -->
        <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-700/50">
          <button @click="showInventoryModal = false"
            class="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200">
            Close
          </button>
          <button @click="refreshInventory"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
            Refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Real Money Update Modal -->
    <div v-if="showRealmoneyModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">Update Real Money</h3>
          <button @click="closeRealmoneyModal" class="text-slate-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <p class="text-sm text-slate-300 mb-2">User: <span class="text-white font-medium">{{ selectedBackendUser?.channelUserId }}</span></p>
            <p class="text-sm text-slate-300">Current Balance: <span class="text-green-400 font-medium">฿{{ parseFloat(selectedBackendUser?.realMoney || 0).toLocaleString() }}</span></p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">New Real Money Amount</label>
            <input 
              v-model="realmoneyForm.realMoney"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter new amount"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Reason (Optional)</label>
            <textarea 
              v-model="realmoneyForm.reason"
              placeholder="Enter reason for update"
              rows="3"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              @click="submitRealmoneyUpdate"
              :disabled="updateLoading || !realmoneyForm.realMoney"
              class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
            >
              <span v-if="updateLoading">Updating...</span>
              <span v-else>Update Real Money</span>
            </button>
            <button 
              @click="closeRealmoneyModal"
              class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Password Update Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">Update Password</h3>
          <button @click="closePasswordModal" class="text-slate-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <p class="text-sm text-slate-300 mb-2">User: <span class="text-white font-medium">{{ selectedBackendUser?.channelUserId }}</span></p>
            <p class="text-sm text-slate-300">Email: <span class="text-white font-medium">{{ selectedBackendUser?.email }}</span></p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">New Password</label>
            <input 
              v-model="passwordForm.newPassword"
              type="password"
              placeholder="Enter new password (min 3 characters)"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
            <input 
              v-model="passwordForm.confirmPassword"
              type="password"
              placeholder="Confirm new password"
              class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div v-if="passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword" class="text-red-400 text-sm">
            Passwords do not match
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              @click="submitPasswordUpdate"
              :disabled="updateLoading || !passwordForm.newPassword || !passwordForm.confirmPassword || passwordForm.newPassword !== passwordForm.confirmPassword"
              class="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
            >
              <span v-if="updateLoading">Updating...</span>
              <span v-else>Update Password</span>
            </button>
            <button 
              @click="closePasswordModal"
              class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import axios from 'axios'
import { getGameUsers } from '../../service/gameUser/gameUser.js'
import { getGameInfoByUserId } from '../../service/gameUser/gameInfo.js'
import gameEquipManager from '../utils/GameEquipManager.js'

export default {
  name: 'UserManagement',
  components: {
    Navigation
  },
  data() {
    return {
      activeTab: 'game-users',
      loading: false,
      gameUsers: [],
      backendUsers: [],
      gameServers: [],
      filters: {
        serverId: '',
        username: '',
        role: ''
      },
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0
      },
      searchTimeout: null,
      showInventoryModal: false,
      selectedUser: null,
      userInventory: [],
      userEquipments: [],
      activeInventoryTab: 'game-info',
      
      // Backend User Update Modals
      showRealmoneyModal: false,
      showPasswordModal: false,
      selectedBackendUser: null,
      realmoneyForm: {
        realMoney: '',
        reason: ''
      },
      passwordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      updateLoading: false
    }
  },
  mounted() {
    this.fetchData()

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
        if (this.activeTab === 'game-users') {
          await this.fetchGameUsers()
        } else if (this.activeTab === 'backend-users') {
          await this.fetchBackendUsers()
        } else if (this.activeTab === 'game-servers') {
          await this.fetchGameServers()
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        this.$toast?.error('Failed to fetch data')
      } finally {
        this.loading = false
      }
    },

    async fetchGameUsers() {
      try {
        this.loading = true
        const response = await getGameUsers()

        console.log('Game Users Response:', response)

        // Handle the response data - adjust based on actual API response structure
        this.gameUsers = response.data || response || []

        // Update pagination if available
        if (response.pagination) {
          this.pagination = response.pagination
        } else {
          this.pagination.total = this.gameUsers.length
          this.pagination.totalPages = Math.ceil(this.gameUsers.length / this.pagination.limit)
        }

      } catch (error) {
        console.error('Error fetching game users:', error)
        this.gameUsers = []
        this.$toast?.error('Failed to fetch game users')
      } finally {
        this.loading = false
      }
    },


    async fetchGameInfoByUserId() {
      try {
        const response = await getGameInfoByUserId(this.selectedUser.id)
        this.gameInfoByUserId = response.data || []
        this.pagination = response.data.pagination || this.pagination



      } catch (error) {
        console.error('Error fetching game info by user id:', error)
        this.gameInfoByUserId = []
        this.$toast?.error('Failed to fetch game info by user id')
      } finally {
        this.loading = false
      }
    },



    async fetchGameServers() {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axios.get('/api/gameservers', {
          headers: { Authorization: `Bearer ${token}` },
        })

        this.gameServers = response.data.data || []
        this.pagination = response.data.pagination || this.pagination
      } catch (error) {
        console.error('Error fetching game servers:', error)
        this.gameServers = []
      }
    },

    async fetchBackendUsers() {
      try {
        this.loading = true
        const token = localStorage.getItem('adminToken')
        const response = await axios.get('/api/backenduser', {
          headers: { Authorization: `Bearer ${token}` }
        })

        console.log('Backend Users Response:', response.data)

        // ใช้ข้อมูลโดยตรงจาก API และจัดเรียงตาม realMoney
        this.backendUsers = (response.data || []).sort((a, b) =>
          parseFloat(b.realMoney || 0) - parseFloat(a.realMoney || 0)
        )

        this.pagination.total = this.backendUsers.length
        this.pagination.totalPages = Math.ceil(this.backendUsers.length / this.pagination.limit)

      } catch (error) {
        console.error('Error fetching backend users:', error)
        this.backendUsers = []
      } finally {
        this.loading = false
      }
    },


    determineUserRole(user) {
      // กำหนด role ตาม realMoney และสถานะ verified
      const realMoney = parseFloat(user.realMoney || 0)

      if (realMoney >= 10000) {
        return 'admin'
      } else if (realMoney >= 5000) {
        return 'moderator'
      } else if (user.verified === 1) {
        return 'user'
      } else {
        return 'guest'
      }
    },

    getRoleColor(role) {
      const colors = {
        'super_admin': 'bg-purple-900/50 text-purple-300',
        'admin': 'bg-blue-900/50 text-blue-300',
        'moderator': 'bg-green-900/50 text-green-300',
        'user': 'bg-gray-900/50 text-gray-300',
        'guest': 'bg-red-900/50 text-red-300'
      }
      return colors[role] || colors.user
    },

    formatDate(dateString) {
      if (!dateString) return 'Never'
      return new Date(dateString).toLocaleDateString()
    },

    debouncedSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.applyFilters()
      }, 500)
    },

    applyFilters() {
      this.pagination.page = 1
      this.fetchData()
    },

    clearFilters() {
      this.filters = {
        serverId: '',
        username: '',
        role: ''
      }
      this.applyFilters()
    },

    refreshData() {
      this.fetchData()
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
    },

    viewUserDetails(user) {
      // TODO: Implement user details view
      console.log('View user details:', user)
      this.$toast?.info('User details view coming soon')
    },

    async viewUserInventory(user) {
      try {
        console.log('View user inventory:', user)
        this.selectedUser = user
        this.showInventoryModal = true

        // เรียก API เพื่อดึงข้อมูล game info ของ user
        const gameInfoResponse = await getGameInfoByUserId(user.id)
        console.log('Game Info Response:', gameInfoResponse)

        // เรียก API เพื่อดึงข้อมูล equipment ของ user
        const token = localStorage.getItem('adminToken')
        const equipResponse = await axios.get(`/api/gameequip/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log('Equipment Response:', equipResponse.data)

        // แปลงข้อมูล game info เป็น inventory format
        if (gameInfoResponse.success && gameInfoResponse.data) {
          this.userInventory = [
            {
              id: 1,
              item_name: 'Role Level',
              quantity: gameInfoResponse.data.rolelevel || 0,
              rarity: 'Level',
              type: 'rolelevel'
            },
            {
              id: 2,
              item_name: 'Experience',
              quantity: gameInfoResponse.data.exp || 0,
              rarity: 'Experience',
              type: 'exp'
            },
            {
              id: 3,
              item_name: 'Game Level',
              quantity: gameInfoResponse.data.gamelevels || 0,
              rarity: 'Game Level',
              type: 'gamelevels'
            }
          ]
        } else {
          this.userInventory = []
        }

        // แปลงข้อมูล equipment
        if (equipResponse.data && equipResponse.data.data && Array.isArray(equipResponse.data.data)) {
          this.userEquipments = []

          equipResponse.data.data.forEach(equip => {
            const equipInfo = equip.info

            // ดึงข้อมูล equipment ทั้งหมดจาก info object
            Object.keys(equipInfo).forEach(equipKey => {
              const equipData = equipInfo[equipKey]

              if (equipData && equipData.id) {
                // ดึงข้อมูล equipment จาก GameEquipManager
                const equipDetails = gameEquipManager.getEquipById(equipData.id)
                const equipPos = gameEquipManager.getEquipPosById(equipDetails?.pos)

                const equipmentData = {
                  id: equipData.id,
                  eid: equipData.eid,
                  qid: equipData.qid,
                  bper: equipData.bper,
                  add: equipData.add,
                  tmphid: equipData.tmphid,
                  name: equipDetails?.name || 'Unknown Equipment',
                  level: equipDetails?.level || 0,
                  icon: gameEquipManager.getEquipIconByIdq(equipData.id, equipData.qid),
                  background: gameEquipManager.getEquipBGByIdq(equipData.qid),
                  category: equipPos?.name || 'Unknown',
                  stats: {
                    hp: equipDetails?.hp || 0,
                    atk: equipDetails?.atk || 0,
                    def: equipDetails?.def || 0,
                    atkspeed: equipDetails?.atkspeed || 0
                  },
                  rarity: gameEquipManager.getRarityByLevel(equipDetails?.level || 0)
                }
                console.log('Equip POS:', equipPos)
                console.log('Equipment Data:', equipmentData)
                console.log('Background Path:', equipmentData.background)

                this.userEquipments.push(equipmentData)
              }
            })
          })
        } else {
          this.userEquipments = []
        }

        this.$toast?.info(`Loading game info for user: ${user.name || user.userid}`)
      } catch (error) {
        console.error('Error loading user game info:', error)
        this.userInventory = []
        this.userEquipments = []
        this.$toast?.error('Failed to load user game info')
      }
    },

    editUser(user) {
      // TODO: Implement user editing
      console.log('Edit user:', user)
      this.$toast?.info('User editing coming soon')
    },


    editBackendUser(user) {
      // TODO: Implement backend user editing
      console.log('Edit backend user:', user)
      this.$toast?.info('Backend user editing coming soon')
    },

    manageServer(server) {
      // TODO: Implement server management
      console.log('Manage server:', server)
      this.$toast?.info('Server management coming soon')
    },

    getRarityColor(rarity) {
      const colors = {
        'Legendary': 'bg-yellow-900/50 text-yellow-300',
        'Epic': 'bg-purple-900/50 text-purple-300',
        'Rare': 'bg-blue-900/50 text-blue-300',
        'Uncommon': 'bg-green-900/50 text-green-300',
        'Common': 'bg-gray-900/50 text-gray-300',
        'Level': 'bg-blue-900/50 text-blue-300',
        'Experience': 'bg-green-900/50 text-green-300',
        'Game Level': 'bg-purple-900/50 text-purple-300'
      }
      return colors[rarity] || colors.Common
    },

    async refreshInventory() {
      if (this.selectedUser) {
        await this.viewUserInventory(this.selectedUser)
        this.$toast?.success('Inventory refreshed')
      }
    },

    updateUserRealmoney(user) {
      this.selectedBackendUser = user
      this.realmoneyForm = {
        realMoney: user.realMoney || '0',
        reason: ''
      }
      this.showRealmoneyModal = true
    },

    updateUserPassword(user) {
      this.selectedBackendUser = user
      this.passwordForm = {
        newPassword: '',
        confirmPassword: ''
      }
      this.showPasswordModal = true
    },

    async submitRealmoneyUpdate() {
      if (!this.selectedBackendUser) return

      try {
        this.updateLoading = true
        const token = localStorage.getItem('adminToken')
        
        const response = await axios.put(`/api/backenduser/realmoney/${this.selectedBackendUser.id}`, {
          realMoney: this.realmoneyForm.realMoney,
          reason: this.realmoneyForm.reason || 'Administrative adjustment'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.data.success) {
          this.$toast?.success('Real money updated successfully')
          this.showRealmoneyModal = false
          this.fetchBackendUsers() // Refresh data
        } else {
          this.$toast?.error(response.data.message || 'Failed to update real money')
        }
      } catch (error) {
        console.error('Error updating real money:', error)
        this.$toast?.error(error.response?.data?.message || 'Failed to update real money')
      } finally {
        this.updateLoading = false
      }
    },

    async submitPasswordUpdate() {
      if (!this.selectedBackendUser) return

      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$toast?.error('Passwords do not match')
        return
      }

      if (this.passwordForm.newPassword.length < 3) {
        this.$toast?.error('Password must be at least 3 characters long')
        return
      }

      try {
        this.updateLoading = true
        const token = localStorage.getItem('adminToken')
        
        const response = await axios.put(`/api/backenduser/password/${this.selectedBackendUser.id}`, {
          newPassword: this.passwordForm.newPassword,
          confirmPassword: this.passwordForm.confirmPassword
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (response.data.success) {
          this.$toast?.success('Password updated successfully')
          this.showPasswordModal = false
          this.fetchBackendUsers() // Refresh data
        } else {
          this.$toast?.error(response.data.message || 'Failed to update password')
        }
      } catch (error) {
        console.error('Error updating password:', error)
        this.$toast?.error(error.response?.data?.message || 'Failed to update password')
      } finally {
        this.updateLoading = false
      }
    },

    closeRealmoneyModal() {
      this.showRealmoneyModal = false
      this.selectedBackendUser = null
      this.realmoneyForm = {
        realMoney: '',
        reason: ''
      }
    },

    closePasswordModal() {
      this.showPasswordModal = false
      this.selectedBackendUser = null
      this.passwordForm = {
        newPassword: '',
        confirmPassword: ''
      }
    }
  }
}


</script>

<style scoped>
/* Add any component-specific styles here */
</style>
