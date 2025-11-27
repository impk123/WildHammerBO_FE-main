<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="gacha-management">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">🎰 Gacha Packets Management</h1>
            <p class="text-slate-400">จัดการไอเท็มที่ใช้สุ่มในกาชา</p>
          </div>
          <button 
            @click="showCreateModal = true"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>สร้าง Gacha Packet</span>
          </button>
        </div>

        <!-- Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-slate-400 text-sm">Total Packets</p>
                <p class="text-2xl font-bold text-white">{{ statistics.total_packets || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-slate-400 text-sm">Active Packets</p>
                <p class="text-2xl font-bold text-green-400">{{ statistics.active_packets || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-slate-400 text-sm">Equipment Packets</p>
                <p class="text-2xl font-bold text-purple-400">{{ statistics.equipment_packets || 0 }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
            <p class="text-slate-400 text-sm">Sum Prob Rate</p>
            <p class="text-2xl font-bold text-yellow-400">{{ (parseFloat(statistics.sum_prob_rate) || 0).toFixed(2) }}%</p>
              </div>
              <div class="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="filters-section bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
          <!-- Search Bar -->
          <div class="mb-4">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input 
                v-model="searchQuery"
                @input="debounceSearch"
                type="text"
                placeholder="ค้นหา gacha packet..."
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
              <div v-if="searchQuery && filteredPackets.length === 0" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span class="text-orange-400 text-sm">ไม่พบ</span>
              </div>
            </div>
            <div v-if="searchQuery || hasActiveFilters" class="mt-2 text-xs text-slate-400">
              พบ {{ filteredPackets.length }} รายการ
            </div>
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label class="text-slate-300 text-sm font-medium">สถานะ:</label>
              <select 
                v-model="filters.isActive" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ทุกสถานะ</option>
                <option value="1">เปิดใช้งาน</option>
                <option value="0">ปิดใช้งาน</option>
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <label class="text-slate-300 text-sm font-medium">ประเภท:</label>
              <select 
                v-model="filters.isEquipment" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ทุกประเภท</option>
                <option value="1">Equipment</option>
                <option value="0">Non-Equipment</option>
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <label class="text-slate-300 text-sm font-medium">เรียงตาม:</label>
              <select 
                v-model="filters.sortBy" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updated_at">วันที่แก้ไข</option>
                <option value="created_at">วันที่สร้าง</option>
                <option value="name">ชื่อ</option>
                <option value="prob_rate">อัตรา</option>
              </select>
              <select 
                v-model="filters.sortOrder" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="desc">มาก → น้อย</option>
                <option value="asc">น้อย → มาก</option>
              </select>
            </div>

            <button 
              type="button"
              @click="resetFilters"
              class="px-4 py-2 bg-slate-600/50 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors duration-200 text-sm"
            >
              รีเซ็ต
            </button>

            <button 
              type="button"
              @click="refreshData"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600/50 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                :class="{ 'animate-spin': loading }"
                class="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>รีเฟรช</span>
            </button>
          </div>
        </div>

        <!-- Gacha Packets Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="packet in paginatedPackets" 
            :key="packet.id"
            class="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200"
          >
            <!-- Packet Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-1">{{ packet.name }}</h3>
                <div class="flex items-center space-x-2 mb-2 ">
                  <span 
                    :class="packet.is_active ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ packet.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                  </span>
                  <span 
                    :class="packet.is_equipment ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ packet.is_equipment ? 'Equipment' : 'Item' }}
                  </span>
                  <span 
                    v-if="packet.item_rarity"
                    :style="getRarityColor(packet.item_rarity)"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ packet.item_rarity }}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="toggleActive(packet)"
                  :class="packet.is_active ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'"
                  class="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  :title="packet.is_active ? 'ปิดใช้งาน' : 'เปิดใช้งาน'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="packet.is_active" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  @click="editPacket(packet)"
                  class="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  title="แก้ไข"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="deletePacket(packet)"
                  class="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  title="ลบ"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Item Info -->
            <div class="bg-slate-700/30 rounded-lg p-4 mb-4">
              <h4 class="text-sm font-medium text-slate-300 mb-2">Item Details</h4>
              <div class="flex items-center space-x-3 mb-3">
                <!-- Item Icon -->
                <div class="w-14 h-14 rounded-lg bg-slate-600 flex items-center justify-center relative shadow-lg">
                  <img 
                    v-if="getPacketItemIcon(packet)"
                    :src="getPacketItemIcon(packet)" 
                    :alt="getPacketItemName(packet)"
                    class="w-full h-full object-contain rounded-lg"
                    @error="handleImageError($event, packet)"
                  >
                  
                  <!-- Quantity Badge -->
                  <div class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[24px] h-6 flex items-center justify-center font-bold shadow-lg border border-white px-1">
                    {{ formatQuantity(getPacketItemQuantityNumber(packet)) }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-white text-sm font-medium">{{ getPacketItemName(packet) }}</div>
                </div>
              </div>
            
            </div>

            <!-- Probability Rate -->
            <div class="flex items-center justify-between">
              <span class="text-slate-400 text-sm">Probability Rate:</span>
              <span class="text-yellow-400 font-bold">{{ packet.prob_rate }}%</span>
            </div>

            <!-- Updated At -->
            <div class="text-xs text-slate-500 mt-2">
              อัพเดท: {{ formatDate(packet.updated_at) }}
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="!loading && packetsPagination.totalPages > 1" class="flex items-center justify-between mb-8">
          <div class="text-sm text-slate-400">
            แสดง {{ (packetsPagination.currentPage - 1) * packetsPagination.itemsPerPage + 1 }}-{{ Math.min(packetsPagination.currentPage * packetsPagination.itemsPerPage, packetsPagination.totalItems) }} 
            จาก {{ packetsPagination.totalItems }} รายการ
          </div>
          
          <div class="flex items-center space-x-2">
            <button 
              @click="changePacketsPage(packetsPagination.currentPage - 1)"
              :disabled="packetsPagination.currentPage <= 1"
              :class="packetsPagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'"
              class="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg transition-colors duration-200 text-sm flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>ก่อนหน้า</span>
            </button>
            
            <div class="flex items-center space-x-1">
              <button 
                v-for="page in getVisiblePages()" 
                :key="page"
                @click="changePacketsPage(page)"
                :class="page === packetsPagination.currentPage ? 'bg-blue-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                class="px-3 py-2 rounded-lg transition-colors duration-200 text-sm min-w-[40px]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="changePacketsPage(packetsPagination.currentPage + 1)"
              :disabled="packetsPagination.currentPage >= packetsPagination.totalPages"
              :class="packetsPagination.currentPage >= packetsPagination.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'"
              class="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg transition-colors duration-200 text-sm flex items-center space-x-2"
            >
              <span>ถัดไป</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && filteredPackets.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
          </svg>
          <h3 class="text-lg font-medium text-slate-300 mb-2">ไม่มี Gacha Packets</h3>
          <p class="text-slate-400 mb-4">เริ่มสร้าง gacha packet แรกของคุณ</p>
          <button 
            @click="showCreateModal = true"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            สร้าง Gacha Packet
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <svg class="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <p class="text-slate-400">กำลังโหลด...</p>
        </div>

        <!-- Create/Edit Modal -->
        <div v-if="showCreateModal || showEditModal" class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="modal-content bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white">
                {{ showCreateModal ? 'สร้าง Gacha Packet' : 'แก้ไข Gacha Packet' }}
              </h2>
              <button 
                type="button"
                @click="closeModal"
                class="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <form @submit.prevent="savePacket">
              <!-- Name -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  ชื่อ Gacha Packet <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="packetForm.name"
                  type="text"
                  required
                  maxlength="100"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ชื่อของ gacha packet"
                >
              </div>

              <!-- Status -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">สถานะ</label>
                  <select 
                    v-model="packetForm.is_active" 
                    class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option :value="1">เปิดใช้งาน</option>
                    <option :value="0">ปิดใช้งาน</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-2">ประเภท</label>
                  <select 
                    v-model="packetForm.is_equipment" 
                    class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option :value="1">Equipment</option>
                    <option :value="0">Item</option>
                  </select>
                </div>
              </div>

              <!-- Item Rarity -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  ความหายาก <span class="text-red-400">*</span>
                </label>
                <select 
                  v-model="packetForm.item_rarity" 
                  required
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">เลือกความหายาก</option>
                  <option 
                    v-for="(quality, id) in qualityOptions" 
                    :key="id" 
                    :value="id"
                  >
                    {{ quality.name }}
                  </option>
                </select>
              </div>

              <!-- Item Selection Section -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                  🎒 เลือกไอเทมในแพค
                </h3>

                <!-- Selected Item Display -->
                <div v-if="packetForm.selected_item_id && selectedItemInfo" class="mb-6">
                  <div class="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 class="text-blue-300 text-sm font-medium mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      ไอเท็มที่เลือก
                    </h4>
                    <div class="flex items-center space-x-4 bg-slate-700/50 border border-slate-600/50 rounded-xl p-4">
                      <div class="w-12 h-12 rounded-lg bg-slate-600 flex items-center justify-center relative shadow-lg">
                        <img 
                          v-if="selectedItemInfo.icon_url"
                          :src="selectedItemInfo.icon_url" 
                          :alt="selectedItemInfo.name"
                          class="w-full h-full object-contain rounded-lg"
                          @error="handleImageError($event, selectedItemInfo)"
                        >
                        
                      </div>
                      <div class="flex-1 min-w-0 pr-2">
                        <h4 class="text-white text-sm font-semibold mb-2 break-words" :title="selectedItemInfo.name">{{ selectedItemInfo.name }}</h4>
                        <div class="flex flex-wrap items-center gap-2 text-xs">
                          <span class="capitalize text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{{ selectedItemInfo.type || selectedItemInfo.category || 'Item' }}</span>
                          <span v-if="selectedItemInfo.level" class="text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">Lv.{{ selectedItemInfo.level }}</span>
                          <span v-if="selectedItemInfo.rarity" :class="getRarityColor(selectedItemInfo.rarity)" class="px-2 py-1 rounded-full font-bold whitespace-nowrap">{{ selectedItemInfo.rarity }}</span>
                        </div>
                      </div>
                      <div class="flex items-center space-x-3">
                        <div class="text-center">
                          <label class="text-slate-400 text-xs font-medium block mb-1">จำนวน</label>
                          <input 
                            v-model.number="packetForm.item_quantity"
                            type="number"
                            min="1"
                            max="99999999"
                            class="w-18 px-3 py-2 bg-slate-600/70 border border-slate-500 text-white rounded-lg text-sm text-center font-semibold focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                          >
                        </div>
                      <button 
                        type="button"
                        @click="clearSelectedItem"
                        class="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-200"
                        title="ลบออก"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Selection Mode Toggle -->
                <div class="mb-6">
                  <label class="block text-slate-300 text-sm font-medium mb-3">ประเภทไอเทม</label>
                  <div class="flex space-x-2 bg-slate-700/30 rounded-lg p-1">
                    <button
                      type="button"
                      @click="handleSelectionModeChange('equipment')"
                      :class="selectionMode === 'equipment' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'"
                      class="flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      ⚔️ อุปกรณ์
                    </button>
                    <button
                      type="button"
                      @click="handleSelectionModeChange('items')"
                      :class="selectionMode === 'items' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'"
                      class="flex-1 px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                      </svg>
                      💎 ไอเทม & ทรัพยากร
                    </button>
                  </div>
                </div>

                <!-- Equipment Section -->
                <div v-show="selectionMode === 'equipment'">
                  <!-- Equipment Type Filter -->
                  <div class="mb-4">
                    <label class="block text-slate-300 text-sm font-medium mb-3">หมวดหมู่อุปกรณ์</label>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        type="button"
                        @click="equipmentFilter = 'all'"
                        :class="equipmentFilter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                        class="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        ทั้งหมด
                      </button>
                      <button 
                        type="button"
                        v-for="type in uniqueEquipmentTypes" 
                        :key="type.value"
                        @click="equipmentFilter = type.value"
                        :class="equipmentFilter === type.value ? `${type.bgClass} text-white shadow-lg` : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                        class="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        {{ type.icon }} {{ type.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Equipment Level Filter -->
                  <div class="mb-4">
                    <label class="block text-slate-300 text-sm font-medium mb-3">ระดับอุปกรณ์</label>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        type="button"
                        v-for="option in levelFilterOptions" 
                        :key="option.value"
                        @click="equipmentLevelFilter = option.value"
                        :class="equipmentLevelFilter === option.value ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                        class="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>

                  <!-- Search Equipment -->
                  <div class="mb-4">
                    <label class="block text-slate-300 text-sm font-medium mb-2">ค้นหาไอเทม</label>
                    <div class="relative">
                      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <input 
                        v-model="equipmentSearch"
                        @input="debounceEquipmentSearch"
                        type="text"
                        placeholder="ค้นหาไอเทม..."
                        class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      >
                      <div v-if="equipmentSearch && filteredEquipment.length === 0" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span class="text-orange-400 text-sm">ไม่พบ</span>
                      </div>
                    </div>
                    <div v-if="equipmentSearch || equipmentFilter !== 'all' || equipmentLevelFilter !== 'all'" class="mt-2 text-xs text-slate-400">
                      พบ {{ filteredEquipment.length }} รายการ
                    </div>
                  </div>

                  <!-- Equipment Grid -->
                  <div class="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                    <div v-if="loadingEquipment" class="text-center py-12">
                      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                      <p class="text-slate-400">กำลังโหลดไอเทม...</p>
                    </div>
                    
                    <div v-else-if="filteredEquipment.length === 0" class="text-center py-12">
                      <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m14 0H4"/>
                      </svg>
                      <p class="text-slate-400">ไม่พบไอเทมที่ตรงกับเงื่อนไข</p>
                      <p class="text-slate-500 text-sm mt-1">ลองปรับเปลี่ยนการค้นหาหรือฟิลเตอร์</p>
                    </div>
                    
                    <div v-else>
                      <!-- Equipment Info -->
                      <div class="mb-4 flex items-center justify-between">
                        <div class="text-sm text-slate-400">
                          แสดง {{ (equipmentPagination.currentPage - 1) * equipmentPagination.itemsPerPage + 1 }}-{{ Math.min(equipmentPagination.currentPage * equipmentPagination.itemsPerPage, equipmentPagination.totalItems) }} 
                          จาก {{ equipmentPagination.totalItems }} รายการ
                        </div>
                        <div class="text-sm text-slate-400">
                          หน้า {{ equipmentPagination.currentPage }} จาก {{ equipmentPagination.totalPages }}
                        </div>
                      </div>

                      <!-- Pagination Controls - Top -->
                      <div v-if="equipmentPagination.totalPages > 1" class="mb-4 flex items-center justify-center space-x-2">
                        <button 
                          type="button"
                          @click="changeEquipmentPage(equipmentPagination.currentPage - 1)"
                          :disabled="equipmentPagination.currentPage <= 1"
                          :class="equipmentPagination.currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'"
                          class="px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg transition-colors duration-200 text-sm"
                        >
                          ก่อนหน้า
                        </button>
                        
                        <div class="flex items-center space-x-1">
                          <button 
                            v-for="page in Math.min(5, equipmentPagination.totalPages)" 
                            :key="page"
                            @click="changeEquipmentPage(page)"
                            :class="page === equipmentPagination.currentPage ? 'bg-blue-600 text-white' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                            class="px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                          >
                            {{ page }}
                          </button>
                        </div>
                        
                        <button 
                          type="button"
                          @click="changeEquipmentPage(equipmentPagination.currentPage + 1)"
                          :disabled="equipmentPagination.currentPage >= equipmentPagination.totalPages"
                          :class="equipmentPagination.currentPage >= equipmentPagination.totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'"
                          class="px-3 py-2 bg-slate-700/50 text-slate-300 rounded-lg transition-colors duration-200 text-sm"
                        >
                          ถัดไป
                        </button>
                      </div>
                      
                      <!-- Equipment Grid -->
                      <div class="max-h-80 overflow-y-auto">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          <div 
                            v-for="item in filteredEquipment" 
                            :key="item.id"
                            @click="toggleEquipment(item)"
                            :class="isEquipmentSelected(item.id) ? 'ring-3 ring-blue-400 bg-blue-600/20 scale-105 shadow-lg shadow-blue-500/25' : 'hover:bg-slate-600/50 hover:scale-105 hover:shadow-lg'"
                            class="cursor-pointer bg-slate-800/60 rounded-xl p-4 border border-slate-600/50 transition-all duration-300 hover:border-slate-500"
                          >
                            <div class="text-center relative">
                              <!-- Equipment Icon -->
                              <div class="w-16 h-16 mx-auto mb-3 bg-slate-600/80 rounded-lg flex items-center justify-center shadow-lg">
                                <img 
                                  v-if="getEquipmentIcon(item)"
                                  :src="getEquipmentIcon(item)" 
                                  :alt="item.name"
                                  class="w-12 h-12 object-contain rounded-lg"
                                  @error="handleImageError($event, item)"
                                >
                                <!-- Icon removed -->
                              </div>
                              <h4 class="text-white text-sm font-semibold mb-2 leading-tight min-h-[2.5rem] flex items-center justify-center text-center" :title="item.name">
                                {{ item.name }}
                              </h4>
                              <p class="text-slate-400 text-xs capitalize mb-2 text-center">{{ item.category || item.equipment_type }}</p>
                              <div class="flex justify-center items-center space-x-2 mb-2">
                                <span 
                                  :class="getQualityColor(item.quality)"
                                  class="px-2 py-1 rounded-full text-xs font-bold shadow-sm"
                                >
                                  ★{{ item.quality }}
                                </span>
                                <span class="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded-full">Lv.{{ item.level }}</span>
                              </div>
                              <div v-if="item.stats && (item.stats.hp > 0 || item.stats.atk > 0 || item.stats.def > 0)" class="mt-2 text-xs text-slate-300 bg-slate-700/50 rounded-lg p-2">
                                <div v-if="item.stats.hp > 0" class="flex justify-between">
                                  <span class="text-red-400">❤ HP:</span>
                                  <span class="font-semibold">{{ item.stats.hp }}</span>
                                </div>
                                <div v-if="item.stats.atk > 0" class="flex justify-between">
                                  <span class="text-orange-400">⚔ ATK:</span>
                                  <span class="font-semibold">{{ item.stats.atk }}</span>
                                </div>
                                <div v-if="item.stats.def > 0" class="flex justify-between">
                                  <span class="text-blue-400">🛡 DEF:</span>
                                  <span class="font-semibold">{{ item.stats.def }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Items Section -->
                <div v-show="selectionMode === 'items'">
                  <!-- Item Category Filter -->
                  <div class="mb-4">
                    <label class="block text-slate-300 text-sm font-medium mb-3">หมวดหมู่ไอเทม</label>
                    <div class="flex flex-wrap gap-2">
                      <button 
                        type="button"
                        @click="itemFilter = 'all'"
                        :class="itemFilter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                        class="px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        ทั้งหมด
                      </button>
                      <button 
                        type="button"
                        v-for="category in uniqueItemCategories" 
                        :key="category.value"
                        @click="itemFilter = category.value"
                        :class="itemFilter === category.value ? `${category.bgClass} text-white shadow-lg` : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'"
                        class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        <!-- Category Icon -->
                        <div class="w-5 h-5 flex items-center justify-center">
                          <img 
                            v-if="category.icon_url"
                            :src="category.icon_url" 
                            :alt="category.label"
                            class="w-full h-full object-contain"
                            @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='inline'"
                          />
                          <span 
                            class="text-lg"
                            style="display: none;"
                          >
                            {{ category.fallback_icon }}
                          </span>
                          <span v-if="!category.icon_url" class="text-lg">
                            {{ category.fallback_icon }}
                          </span>
                        </div>
                        <span>{{ category.label }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Item Search -->
                  <div class="mb-4">
                    <label class="block text-slate-300 text-sm font-medium mb-2">🔍 ค้นหาไอเทม</label>
                    <div class="relative">
                      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <input 
                        v-model="itemSearch"
                        type="text" 
                        class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="ค้นหาชื่อไอเทม, หมวดหมู่, คำอธิบาย..."
                      >
                      <div v-if="itemSearch && filteredItems.length === 0" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <span class="text-orange-400 text-sm">ไม่พบ</span>
                      </div>
                    </div>
                    <div v-if="itemSearch || itemFilter !== 'all'" class="mt-2 text-xs text-slate-400">
                      พบ {{ filteredItems.length }} รายการ
                    </div>
                  </div>

                  <!-- Loading State for Items -->
                  <div v-if="loadingItems" class="flex items-center justify-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span class="ml-3 text-slate-400">กำลังโหลดไอเทม...</span>
                  </div>

                  <!-- Available Items Grid Header -->
                  <div v-if="!loadingItems" class="mb-3">
                    <h4 class="text-slate-300 text-sm font-medium flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                      ไอเทมที่พร้อมใช้งาน
                    </h4>
                    <p class="text-slate-400 text-xs mt-1">คลิกเพื่อเลือกไอเทมเข้าแพค</p>
                  </div>

                  <!-- Available Items Grid (exclude selected items) -->
                  <div v-if="!loadingItems" class="max-h-80 overflow-y-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      <!-- No Available Items Message -->
                      <div v-if="filteredItems.filter(item => !isItemSelected(item.id)).length === 0" 
                          class="col-span-full text-center py-12">
                        <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m14 0H4"/>
                        </svg>
                        <p class="text-slate-400">ไม่มีไอเทมที่พร้อมใช้งาน</p>
                        <p class="text-slate-500 text-sm mt-1">ไอเทมทั้งหมดถูกเลือกแล้ว หรือลองปรับเปลี่ยนการค้นหา</p>
                      </div>

                      <!-- Available Items -->
                      <div 
                        v-for="item in filteredItems.filter(item => !isItemSelected(item.id))" 
                        :key="`available-item-${item.id}`"
                        :class="isItemSelected(item.id) ? 'ring-3 ring-green-400 bg-green-600/20 scale-105 shadow-lg shadow-green-500/25' : 'hover:bg-slate-600/50 hover:scale-105 hover:shadow-lg'"
                        class="cursor-pointer bg-slate-800/60 rounded-xl p-4 border border-slate-600/50 transition-all duration-300 hover:border-slate-500"
                      >
                        <div class="text-center relative">
                          <!-- Item Icon Container -->
                          <div class="w-16 h-16 mx-auto mb-3 bg-slate-600/50 rounded-lg flex items-center justify-center shadow-lg relative">
                            <img 
                              v-if="item.icon_url"
                              :src="item.icon_url" 
                              :alt="item.name"
                              loading="lazy"
                              class="w-12 h-12 object-contain rounded-lg"
                              @error="handleImageError($event, item)"
                            />
                            <svg v-else class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                            </svg>
                          </div>
                          <h4 class="text-white text-sm font-semibold mb-2 leading-tight min-h-[2.5rem] flex items-center justify-center text-center" :title="item.name">
                            {{ item.name }}
                          </h4>
                          <p class="text-slate-400 text-xs capitalize mb-2 text-center">{{ item.category || 'ไอเทม' }}</p>
                          <div class="flex justify-center items-center space-x-2 mb-2">
                            <span class="text-slate-300 bg-slate-700 px-2 py-1 rounded-full text-xs">{{ item.rarity || 'ธรรมดา' }}</span>
                          </div>
                          <!-- Quantity Selection -->
                          <div v-if="itemToSelect && itemToSelect.id === item.id" class="mt-3 p-2 bg-slate-700/50 rounded-lg">
                            <div class="flex items-center justify-between mb-2">
                              <span class="text-xs text-slate-300">จำนวน:</span>
                              <span class="text-xs text-blue-400">{{ tempQuantity }}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                              <button 
                                @click.stop="decreaseQuantity"
                                class="w-6 h-6 bg-slate-600 hover:bg-slate-500 text-white rounded text-xs font-bold flex items-center justify-center"
                              >
                                -
                              </button>
                              <input 
                                v-model.number="tempQuantity"
                                @click.stop
                                type="number"
                                min="1"
                                max="999999"
                                class="w-16 px-2 py-1 bg-slate-600 border border-slate-500 text-white rounded text-xs text-center"
                              >
                              <button 
                                @click.stop="increaseQuantity"
                                class="w-6 h-6 bg-slate-600 hover:bg-slate-500 text-white rounded text-xs font-bold flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <div class="flex space-x-1 mt-2">
                              <button 
                                @click.stop="confirmSelectItem(item)"
                                class="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium"
                              >
                                ตกลง
                              </button>
                              <button 
                                @click.stop="cancelSelectItem"
                                class="flex-1 px-2 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded text-xs font-medium"
                              >
                                ยกเลิก
                              </button>
                            </div>
                          </div>
                          <!-- Select Button -->
                          <button 
                            v-else
                            @click.stop="startSelectItem(item)"
                            class="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
                          >
                            เลือก
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Probability Rate -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  อัตราความน่าจะเป็น (%) <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="packetForm.prob_rate"
                  type="number"
                  step="0.00001"
                  min="0.00000"
                  max="100.00000"
                  required
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.000 - 100.000"
                >
              </div>

              <!-- Form Actions -->
              <div class="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                <button 
                  type="button"
                  @click="closeModal"
                  class="px-6 py-2 bg-slate-600/50 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors duration-200"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  :disabled="saving"
                  class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg v-if="saving" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <span>{{ saving ? 'กำลังบันทึก...' : 'บันทึก' }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="bg-slate-800 rounded-lg w-full max-w-md">
            <div class="p-6">
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">ยืนยันการลบ</h3>
                  <p class="text-slate-400 text-sm">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                </div>
              </div>
              
              <p class="text-slate-300 mb-6">
                คุณต้องการลบ gacha packet 
                <span class="font-semibold text-white">"{{ packetToDelete?.name }}"</span> 
                หรือไม่?
              </p>

              <div class="flex items-center justify-end space-x-4">
                <button 
                  @click="showDeleteModal = false"
                  class="px-4 py-2 bg-slate-600/50 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors duration-200"
                >
                  ยกเลิก
                </button>
                <button 
                  @click="confirmDelete"
                  :disabled="deleting"
                  class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <svg v-if="deleting" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  <span>{{ deleting ? 'กำลังลบ...' : 'ลบ' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification -->
        <div v-if="notification.show" class="fixed top-4 right-4 z-50">
          <div 
            :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
            class="px-6 py-3 rounded-lg text-white shadow-lg flex items-center space-x-2"
          >
            <svg v-if="notification.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <span>{{ notification.message }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import Navigation from './Navigation.vue'
import GachaService from '../services/GachaService.js'
import GameItemManager from '../utils/GameItemManager.js'
import GameEquipService from '../services/GameEquipService.js'
import GameEquipManager from '../utils/GameEquipManager.js'
import GameEquipQualityManager from '../utils/GameEquipQualityManager.js'

// Debounce utility function
const debounce = (func, wait) => {
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

const formatQuantity = (quantity) => {
  if (!quantity) return '1'
  
  // ถ้าเป็นตัวเลขใหญ่ ใช้รูปแบบย่อ
  if (quantity >= 1000000) {
    return (quantity / 1000000).toFixed(1) + 'M'
  } else if (quantity >= 1000) {
    return (quantity / 1000).toFixed(1) + 'K'
  }
  
  return quantity.toString()
}

// Reactive state
const packets = ref([])
const statistics = ref({})
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)

// Search and filters
const searchQuery = ref('')
const filters = reactive({
  isActive: '1', // Default to active only
  isEquipment: '',
  sortBy: 'updated_at',
  sortOrder: 'desc'
})

// Modals
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// Form data
const packetForm = reactive({
  name: '',
  is_active: 1,
  is_equipment: 0,
  item_rarity: '1', // Default to "ทั่วไป"
  prob_rate: 0,
  selected_item_id: '',
  item_quantity: 1
})

const packetToDelete = ref(null)

// Item search
const itemSearch = ref('')
const availableItems = ref([])
const availableEquipment = ref([])

// Selection mode
const selectionMode = ref('equipment') // 'equipment' or 'items'

// Equipment filters
const equipmentFilter = ref('all')
const equipmentLevelFilter = ref('all')
const equipmentSearch = ref('')
const loadingEquipment = ref(false)

// Item filters
const itemFilter = ref('all')
const loadingItems = ref(false)

// Item selection state
const itemToSelect = ref(null)
const tempQuantity = ref(1)

// Equipment pagination
const equipmentPagination = reactive({
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0,
  totalPages: 0
})

// Gacha packets pagination
const packetsPagination = reactive({
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0,
  totalPages: 0
})

// Quality options from GameEquipQuality.json
const qualityOptions = ref({})

// Notification
const notification = reactive({
  show: false,
  message: '',
  type: 'success'
})

// Computed
const filteredPackets = computed(() => {
  let filtered = Array.isArray(packets.value) ? packets.value : []

  // Search filter
  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(packet => {
      if (!packet) return false
      return String(packet.name || '').toLowerCase().includes(search)
    })
  }

  // Status filter
  if (filters.isActive !== '') {
    const isActive = parseInt(filters.isActive)
    filtered = filtered.filter(packet => packet && parseInt(packet.is_active) === isActive)
  }

  // Equipment filter
  if (filters.isEquipment !== '') {
    const isEquipment = parseInt(filters.isEquipment)
    filtered = filtered.filter(packet => packet && parseInt(packet.is_equipment) === isEquipment)
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (filters.sortBy) {
      case 'name':
        aValue = String(a.name || '').toLowerCase()
        bValue = String(b.name || '').toLowerCase()
        break
      case 'prob_rate':
        aValue = Number(a.prob_rate || 0)
        bValue = Number(b.prob_rate || 0)
        break
      case 'updated_at':
      default:
        aValue = new Date(a.updated_at || 0)
        bValue = new Date(b.updated_at || 0)
        break
    }

    if (filters.sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Update pagination info
  packetsPagination.totalItems = filtered.length
  packetsPagination.totalPages = Math.ceil(filtered.length / packetsPagination.itemsPerPage)
  
  if (packetsPagination.currentPage > packetsPagination.totalPages && packetsPagination.totalPages > 0) {
    packetsPagination.currentPage = packetsPagination.totalPages
  }

  return filtered
})

// Paginated packets for display
const paginatedPackets = computed(() => {
  const startIndex = (packetsPagination.currentPage - 1) * packetsPagination.itemsPerPage
  const endIndex = startIndex + packetsPagination.itemsPerPage
  return filteredPackets.value.slice(startIndex, endIndex)
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return filters.isActive !== '' || 
         filters.isEquipment !== '' ||
         filters.sortBy !== 'updated_at' ||
         filters.sortOrder !== 'desc'
})

// Combined items and equipment for search
const combinedItems = computed(() => {
  const items = [...availableItems.value]
  const equipment = availableEquipment.value.map(eq => ({
    ...eq,
    type: 'equipment',
    category: eq.equipment_type || 'equipment'
  }))
  return [...items, ...equipment]
})


// Selected item info
const selectedItemInfo = computed(() => {
  if (!packetForm.selected_item_id) return null
  return combinedItems.value.find(item => item.id === packetForm.selected_item_id)
})

// Equipment computed properties
const uniqueEquipmentTypes = computed(() => {
  const typeCount = {}
  const typeIcons = {
    'weapon': { icon: '⚔️', label: 'อาวุธ', bgClass: 'bg-red-600' },
    'cloth': { icon: '👕', label: 'เสื้อผ้า', bgClass: 'bg-blue-600' },
    'hat': { icon: '🎩', label: 'หมวก', bgClass: 'bg-purple-600' },
    'belt': { icon: '💍', label: 'แหวน', bgClass: 'bg-yellow-600' },
    'pants': { icon: '👖', label: 'กางเกง', bgClass: 'bg-green-600' },
    'shoe': { icon: '👞', label: 'รองเท้า', bgClass: 'bg-orange-600' },
    'unknown': { icon: '📦', label: 'อื่นๆ', bgClass: 'bg-gray-600' }
  }

  if (Array.isArray(availableEquipment.value)) {
    availableEquipment.value.forEach(item => {
      if (!item || typeof item !== 'object') return
      const type = item.equipment_type || 'unknown'
      typeCount[type] = (typeCount[type] || 0) + 1
    })
  }

  return Object.keys(typeCount).map(type => ({
    value: type,
    label: typeIcons[type]?.label || type,
    icon: typeIcons[type]?.icon || '📦',
    bgClass: typeIcons[type]?.bgClass || 'bg-gray-600',
    count: typeCount[type]
  })).sort((a, b) => b.count - a.count)
})

const levelFilterOptions = computed(() => {
  return [
    { value: 'all', label: 'ทุกระดับ' },
    { value: '1-20', label: 'ระดับ 1-20' },
    { value: '21-40', label: 'ระดับ 21-40' },
    { value: '41-60', label: 'ระดับ 41-60' },
    { value: '61-80', label: 'ระดับ 61-80' },
    { value: '81-100', label: 'ระดับ 81-100' },
    { value: '101+', label: 'ระดับ 101+' }
  ]
})

const filteredEquipment = computed(() => {
  let filtered = Array.isArray(availableEquipment.value) ? availableEquipment.value : []

  // Filter by type
  if (equipmentFilter.value !== 'all') {
    filtered = filtered.filter(item => item && item.equipment_type === equipmentFilter.value)
  }

  // Filter by level
  if (equipmentLevelFilter.value !== 'all') {
    const levelRange = getLevelRange(equipmentLevelFilter.value)
    if (levelRange) {
      filtered = filtered.filter(item => 
        item && item.level >= levelRange.min && item.level <= levelRange.max
      )
    }
  }

  // Filter by search
  if (equipmentSearch.value) {
    const search = equipmentSearch.value.toLowerCase().trim()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(search) ||
      item.equipment_type.toLowerCase().includes(search) ||
      (item.description && item.description.toLowerCase().includes(search))
    )
  }

  // Sort by quality and name
  const sorted = filtered.sort((a, b) => {
    if (a.quality !== b.quality) {
      return (b.quality || 0) - (a.quality || 0)
    }
    return a.name.localeCompare(b.name)
  })

  // Update pagination info
  equipmentPagination.totalItems = sorted.length
  equipmentPagination.totalPages = Math.ceil(sorted.length / equipmentPagination.itemsPerPage)
  
  if (equipmentPagination.currentPage > equipmentPagination.totalPages && equipmentPagination.totalPages > 0) {
    equipmentPagination.currentPage = equipmentPagination.totalPages
  }

  // Return paginated results
  const startIndex = (equipmentPagination.currentPage - 1) * equipmentPagination.itemsPerPage
  const endIndex = startIndex + equipmentPagination.itemsPerPage
  return sorted.slice(startIndex, endIndex)
})

// Item computed properties
const uniqueItemCategories = computed(() => {
  const categoryCount = {}
  const categoryItems = {}
  
  if (Array.isArray(availableItems.value)) {
    availableItems.value.forEach(item => {
      if (!item || typeof item !== 'object') return
      
      const category = String(item.category || item.type || 'misc')
      categoryCount[category] = (categoryCount[category] || 0) + 1
      
      if (!categoryItems[category]) {
        categoryItems[category] = item
      }
    })
  }

  const categoryDefaults = {
    'currency': { label: 'เงินตรา', bgClass: 'bg-yellow-600' },
    'resource': { label: 'ทรัพยากร', bgClass: 'bg-orange-600' },
    'potion': { label: 'ยา', bgClass: 'bg-green-600' },
    'scroll': { label: 'คัมภีร์', bgClass: 'bg-purple-600' },
    'gem': { label: 'อัญมณี', bgClass: 'bg-blue-600' },
    'material': { label: 'วัสดุ', bgClass: 'bg-gray-600' },
    'food': { label: 'อาหาร', bgClass: 'bg-red-600' },
    'misc': { label: 'อื่นๆ', bgClass: 'bg-slate-600' }
  }

  return Object.keys(categoryCount).map(category => {
    const firstItem = categoryItems[category]
    const defaults = categoryDefaults[category] || { label: category, bgClass: 'bg-gray-600' }
    
    return {
      value: category,
      label: defaults.label,
      icon_url: firstItem?.icon_url || null,
      fallback_icon: '📦',
      bgClass: defaults.bgClass,
      count: categoryCount[category]
    }
  }).sort((a, b) => b.count - a.count)
})

const filteredItems = computed(() => {
  let filtered = Array.isArray(availableItems.value) ? availableItems.value : []

  // Filter by category
  if (itemFilter.value !== 'all') {
    filtered = filtered.filter(item => 
      item && (item.category === itemFilter.value || item.type === itemFilter.value)
    )
  }

  // Filter by search
  if (itemSearch.value) {
    const search = itemSearch.value.toLowerCase().trim()
    filtered = filtered.filter(item => {
      if (!item) return false
      return String(item.name || '').toLowerCase().includes(search) ||
        (item.description && String(item.description).toLowerCase().includes(search)) ||
        (item.category && String(item.category).toLowerCase().includes(search)) ||
        (item.type && String(item.type).toLowerCase().includes(search))
    })
  }

  return filtered.sort((a, b) => a.name.localeCompare(b.name))
})

// Methods
const fetchPackets = async () => {
  try {
    loading.value = true
    const response = await GachaService.getAllPackets({limit: 1000})
    
    if (response.success) {
      packets.value = response.data.packets || []
    } else {
      showNotification('ไม่สามารถโหลดข้อมูล gacha packets ได้', 'error')
    }
  } catch (error) {
    console.error('Error fetching packets:', error)
    showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error')
  } finally {
    loading.value = false
  }
}

const fetchStatistics = async () => {
  try {
    const response = await GachaService.getStatistics()
    
    if (response.success) {
      statistics.value = response.data.statistics || {}
    }
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

const debounceSearch = debounce(() => {
  // Search is handled by computed property
}, 300)

const resetFilters = () => {
  searchQuery.value = ''
  filters.isActive = '1' // Reset to active only
  filters.isEquipment = ''
  filters.sortBy = 'updated_at'
  filters.sortOrder = 'desc'
  resetPacketsPagination()
}

const refreshData = async () => {
  await Promise.all([
    fetchPackets(),
    fetchStatistics()
  ])
  showNotification('ข้อมูลได้รับการอัพเดทแล้ว', 'success')
}

const toggleActive = async (packet) => {
  try {
    const response = await GachaService.toggleActive(packet.id)
    
    if (response.success) {
      // Update local data
      const index = packets.value.findIndex(p => p.id === packet.id)
      if (index >= 0) {
        packets.value[index].is_active = response.data.is_active
        packets.value[index].updated_at = response.data.updated_at
      }
      showNotification(`สถานะ ${response.data.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'} แล้ว`, 'success')
    } else {
      showNotification('ไม่สามารถเปลี่ยนสถานะได้', 'error')
    }
  } catch (error) {
    console.error('Error toggling active status:', error)
    showNotification('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ', 'error')
  }
}

const editPacket = (packet) => {
  packetForm.name = packet.name
  packetForm.is_active = packet.is_active
  packetForm.is_equipment = packet.is_equipment
  
  // Convert rarity name back to ID for editing
  const rarityId = Object.entries(qualityOptions.value).find(([id, quality]) => 
    quality.name === packet.item_rarity
  )?.[0] || packet.item_rarity || '1'
  
  packetForm.item_rarity = rarityId
  packetForm.prob_rate = packet.prob_rate
  
  // Load selected item data from packet.item
  if (packet.item && packet.item.items && packet.item.items.length > 0) {
    const firstItem = packet.item.items[0]
    packetForm.selected_item_id = firstItem.item_id.toString()
    packetForm.item_quantity = firstItem.quantity || 1
  } else {
    packetForm.selected_item_id = ''
    packetForm.item_quantity = 1
  }
  
  packetForm.id = packet.id
  showEditModal.value = true
}

const deletePacket = (packet) => {
  packetToDelete.value = packet
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!packetToDelete.value) return
  
  try {
    deleting.value = true
    const response = await GachaService.deletePacket(packetToDelete.value.id)
    
    if (response.success) {
      // Remove from local data
      const index = packets.value.findIndex(p => p.id === packetToDelete.value.id)
      if (index >= 0) {
        packets.value.splice(index, 1)
      }
      
      showDeleteModal.value = false
      packetToDelete.value = null
      showNotification('ลบ gacha packet สำเร็จ', 'success')
    } else {
      showNotification('ไม่สามารถลบ gacha packet ได้', 'error')
    }
  } catch (error) {
    console.error('Error deleting packet:', error)
    showNotification('เกิดข้อผิดพลาดในการลบ', 'error')
  } finally {
    deleting.value = false
  }
}

const savePacket = async () => {
  try {
    saving.value = true
    
    // Validate required fields
    if (!packetForm.selected_item_id) {
      showNotification('กรุณาเลือกไอเท็ม', 'error')
      return
    }
    
    // Prepare data for API
    const itemInfo = selectedItemInfo.value || {}
    
    const rarityName = qualityOptions.value[packetForm.item_rarity]?.name || packetForm.item_rarity
    
    
    const itemData = {
      item_id: parseInt(packetForm.selected_item_id),
      quantity: packetForm.item_quantity,
      rarity: parseInt(packetForm.item_rarity),
      type: packetForm.is_equipment ? 'equipment' : 'item'
    }

    
    const packetData = {
      name: packetForm.name,
      is_active: packetForm.is_active,
      is_equipment: packetForm.is_equipment,
      item_rarity: rarityName,
      prob_rate: packetForm.prob_rate,
      item: {
        items: [itemData],
        description: `Gacha packet: ${packetForm.name}`
      }
    }
    
    const response = packetForm.id 
      ? await GachaService.updatePacket(packetForm.id, packetData)
      : await GachaService.createPacket(packetData)
    
    if (response.success) {
      if (packetForm.id) {
        // Update existing packet
        const index = packets.value.findIndex(p => p.id === packetForm.id)
        if (index >= 0) {
          packets.value[index] = response.data
        }
        showNotification('อัพเดท gacha packet สำเร็จ', 'success')
      } else {
        // Add new packet
        packets.value.unshift(response.data)
        showNotification('สร้าง gacha packet สำเร็จ', 'success')
      }
      
      closeModal()
      await fetchStatistics() // Refresh statistics
    } else {
      showNotification(response.message || 'ไม่สามารถบันทึกข้อมูลได้', 'error')
    }
  } catch (error) {
    console.error('Error saving packet:', error)
    showNotification('เกิดข้อผิดพลาดในการบันทึก', 'error')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  
  // Reset form
  packetForm.name = ''
  packetForm.is_active = 1
  packetForm.is_equipment = 0
  packetForm.item_rarity = '1' // Default to "ทั่วไป"
  packetForm.prob_rate = 0
  packetForm.selected_item_id = ''
  packetForm.item_quantity = 1
  packetForm.id = null
  
  // Reset search and filters
  itemSearch.value = ''
  equipmentSearch.value = ''
  equipmentFilter.value = 'all'
  equipmentLevelFilter.value = 'all'
  itemFilter.value = 'all'
  selectionMode.value = 'equipment'
  resetEquipmentPagination()
  
  // Reset item selection
  itemToSelect.value = null
  tempQuantity.value = 1
}

const showNotification = (message, type = 'success') => {
  notification.show = true
  notification.message = message
  notification.type = type
  
  setTimeout(() => {
    notification.show = false
  }, 3000)
}

const getRarityColor = (rarity) => {
  // Try to find the quality by name in qualityOptions
  const qualityEntry = Object.entries(qualityOptions.value).find(([id, quality]) => 
    quality.name === rarity || id === rarity
  )
  
  if (qualityEntry) {
    const [id, quality] = qualityEntry
    return `background-color: ${quality.color}; color: white;`
  }
  
  // Fallback to default
  return 'background-color: rgb(166, 154, 127); color: white;'
}

const getQualityName = (quality) => {
  if (qualityOptions.value && qualityOptions.value[quality]) {
    return qualityOptions.value[quality].name
  }
  
  // Fallback quality names
  const qualityNames = {
    1: 'ทั่วไป',
    2: 'หายาก',
    3: 'มหัศจรรย์',
    4: 'ตำนาน',
    5: 'ตำนานพิเศษ',
    6: 'ตำนานพิเศษ',
    7: 'ตำนานพิเศษ',
    8: 'ตำนานพิเศษ',
    9: 'ทำลายล้างโลก'
  }
  return qualityNames[quality] || 'ทั่วไป'
}

const selectItem = (item) => {
  packetForm.selected_item_id = item.id
  itemSearch.value = ''
}

const clearSelectedItem = () => {
  packetForm.selected_item_id = ''
  itemSearch.value = ''
}

const toggleEquipment = (item) => {
  if (packetForm.selected_item_id === item.id) {
    packetForm.selected_item_id = ''
  } else {
    packetForm.selected_item_id = item.id
  }
}

const startSelectItem = (item) => {
  itemToSelect.value = item
  tempQuantity.value = 1
}

const confirmSelectItem = (item) => {
  packetForm.selected_item_id = item.id
  packetForm.item_quantity = tempQuantity.value
  itemToSelect.value = null
  tempQuantity.value = 1
}

const cancelSelectItem = () => {
  itemToSelect.value = null
  tempQuantity.value = 1
}

const increaseQuantity = () => {
  if (tempQuantity.value < 999999) {
    tempQuantity.value++
  }
}

const decreaseQuantity = () => {
  if (tempQuantity.value > 1) {
    tempQuantity.value--
  }
}

const toggleItem = (item) => {
  if (packetForm.selected_item_id === item.id) {
    packetForm.selected_item_id = ''
  } else {
    packetForm.selected_item_id = item.id
  }
}

const isEquipmentSelected = (itemId) => {
  return packetForm.selected_item_id === itemId
}

const isItemSelected = (itemId) => {
  return packetForm.selected_item_id === itemId
}

const handleSelectionModeChange = (mode) => {
  selectionMode.value = mode
  packetForm.selected_item_id = ''
}

const debounceEquipmentSearch = debounce(() => {
  equipmentPagination.currentPage = 1
}, 300)

const debounceItemSearch = debounce(() => {
  // Search is handled by computed property
}, 300)

const changeEquipmentPage = (page) => {
  if (page >= 1 && page <= equipmentPagination.totalPages) {
    equipmentPagination.currentPage = page
  }
}

const resetEquipmentPagination = () => {
  equipmentPagination.currentPage = 1
}

const changePacketsPage = (page) => {
  if (page >= 1 && page <= packetsPagination.totalPages) {
    packetsPagination.currentPage = page
  }
}

const resetPacketsPagination = () => {
  packetsPagination.currentPage = 1
}

const getVisiblePages = () => {
  const current = packetsPagination.currentPage
  const total = packetsPagination.totalPages
  const maxVisible = 5
  
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const getLevelRange = (filter) => {
  switch (filter) {
    case '1-20':
      return { min: 1, max: 20 }
    case '21-40':
      return { min: 21, max: 40 }
    case '41-60':
      return { min: 41, max: 60 }
    case '61-80':
      return { min: 61, max: 80 }
    case '81-100':
      return { min: 81, max: 100 }
    case '101+':
      return { min: 101, max: 999 }
    default:
      return null
  }
}

const getEquipmentIcon = (item) => {
  try {
    if (item && item.id && GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function') {
      return GameEquipManager.getEquipIconByIdq(item.id, item.quality)
    }
  } catch (error) {
    console.warn('Error getting equipment icon:', error)
  }
  return null
}

const getEquipmentBackground = (quality) => {
  try {
    if (GameEquipManager && typeof GameEquipManager.getEquipBGByIdq === 'function') {
      return GameEquipManager.getEquipBGByIdq(quality)
    }
  } catch (error) {
    console.warn('Error getting equipment background:', error)
  }
  return null
}

const getQualityColor = (quality) => {
  const qualityColors = {
    1: 'bg-gray-600 text-gray-200',
    2: 'bg-green-600 text-green-200',
    3: 'bg-blue-600 text-blue-200',
    4: 'bg-purple-600 text-purple-200',
    5: 'bg-orange-600 text-orange-200',
    6: 'bg-red-600 text-red-200',
    7: 'bg-yellow-600 text-yellow-200',
    8: 'bg-pink-600 text-pink-200',
    9: 'bg-cyan-600 text-cyan-200',
    10: 'bg-indigo-600 text-indigo-200'
  }
  return qualityColors[quality] || 'bg-gray-600 text-gray-200'
}

const handleImageError = (event, item) => {
  console.log('Image error for item:', item.name, 'URL:', event.target.src)
  if (event && event.target) {
    // Hide the broken image
    event.target.style.display = 'none'
    
    // Find and show the fallback SVG
    const parent = event.target.parentElement
    if (parent) {
      const fallbackSvg = parent.querySelector('svg')
      if (fallbackSvg) {
        fallbackSvg.style.display = 'block'
      }
    }
  }
}

const fetchItemsAndEquipment = async () => {
  try {
    // Fetch items from GameItemManager
    if (typeof GameItemManager !== 'undefined' && GameItemManager.getAllItems) {
      const items = GameItemManager.getAllItems()
      availableItems.value = items.map(item => ({
        id: String(item.id),
        name: item.name || `Item ${item.id}`,
        type: String(item.type || 'item'),
        category: String(item.category || item.type || 'item'),
        description: item.description || '',
        rarity: item.rarity || 'common',
        icon_url: GameItemManager.getItemIcon ? GameItemManager.getItemIcon(item.id) : null,
        original_data: item
      }))
    }

    // Fetch equipment from GameEquipService
    if (typeof GameEquipService !== 'undefined' && GameEquipService.getAllEquips) {
      const equipment = GameEquipService.getAllEquips()
      availableEquipment.value = equipment.map(eq => ({
        id: String(eq.id),
        name: eq.name || `Equipment ${eq.id}`,
        equipment_type: getEquipmentTypeByPos(eq.pos),
        level: eq.level || 1,
        quality: Math.min(Math.floor((eq.level || 1) / 2) + 1, 10),
        rarity: 'common', // Default rarity
        icon_url: GameEquipManager && GameEquipManager.getEquipIconByIdq ? 
          GameEquipManager.getEquipIconByIdq(eq.id, Math.min(Math.floor((eq.level || 1) / 2) + 1, 10)) : null,
        original_data: eq
      }))
    }
  } catch (error) {
    console.error('Error fetching items and equipment:', error)
    showNotification('เกิดข้อผิดพลาดในการโหลดไอเท็มและอุปกรณ์', 'error')
  }
}

const getEquipmentTypeByPos = (pos) => {
  const typeMap = {
    1: 'weapon',
    2: 'cloth', 
    3: 'hat',
    4: 'belt',
    5: 'pants',
    6: 'shoe'
  }
  return typeMap[pos] || 'unknown'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('th-TH')
}

const getPacketItemIcon = (packet) => {
  try {
    if (!packet || !packet.item || !packet.item.items || packet.item.items.length === 0) {
      return null
    }
    
    const firstItem = packet.item.items[0]
    const itemId = firstItem.item_id
    
    // Try to find in combined items
    const combinedItems = [...availableItems.value, ...availableEquipment.value.map(eq => ({
      ...eq,
      type: 'equipment',
      category: eq.equipment_type || 'equipment'
    }))]
    
    const foundItem = combinedItems.find(item => item.id === itemId.toString())
    
    if (foundItem && foundItem.icon_url) {
      return foundItem.icon_url
    }
    
    // If not found in combined, try GameItemManager
    if (GameItemManager && GameItemManager.getItemIcon) {
      return GameItemManager.getItemIcon(itemId)
    }
    
    // If not found, try GameEquipManager
    if (GameEquipManager && GameEquipManager.getEquipIconByIdq) {
      return GameEquipManager.getEquipIconByIdq(itemId, firstItem.quality || 1)
    }
    
  } catch (error) {
    console.warn('Error getting packet item icon:', error)
  }
  
  return null
}

const getPacketItemName = (packet) => {
  try {
    if (!packet || !packet.item || !packet.item.items || packet.item.items.length === 0) {
      return 'Unknown Item'
    }
    
    const firstItem = packet.item.items[0]
    const itemId = firstItem.item_id
    
    // Try to find in combined items
    const combinedItems = [...availableItems.value, ...availableEquipment.value.map(eq => ({
      ...eq,
      type: 'equipment',
      category: eq.equipment_type || 'equipment'
    }))]
    
    const foundItem = combinedItems.find(item => item.id === itemId.toString())
    
    if (foundItem && foundItem.name) {
      return foundItem.name
    }
    
    // Fallback to item ID
    return `Item ${itemId}`
    
  } catch (error) {
    console.warn('Error getting packet item name:', error)
    return 'Unknown Item'
  }
}

const getPacketItemQuantity = (packet) => {
  try {
    if (!packet || !packet.item || !packet.item.items || packet.item.items.length === 0) {
      return 'Quantity: 1'
    }
    
    const firstItem = packet.item.items[0]
    const quantity = firstItem.quantity || 1
    
    return `Quantity: ${formatQuantity(quantity)}`
  } catch (error) {
    console.warn('Error getting packet item quantity:', error)
    return 'Quantity: 1'
  }
}

const getPacketItemQuantityNumber = (packet) => {
  try {
    if (!packet || !packet.item || !packet.item.items || packet.item.items.length === 0) {
      return 1
    }
    
    const firstItem = packet.item.items[0]
    return firstItem.quantity || 1
    
  } catch (error) {
    console.warn('Error getting packet item quantity:', error)
    return 'Quantity: 1'
  }
}


// Watchers for resetting pagination
watch([equipmentFilter, equipmentLevelFilter], () => {
  resetEquipmentPagination()
})

watch([searchQuery, filters], () => {
  resetPacketsPagination()
}, { deep: true })

// Load quality options from GameEquipQuality.json
const loadQualityOptions = async () => {
  try {
    // Direct fetch from JSON file
    const response = await fetch('/bundle/config/game/GameEquipQuality.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const qualityData = await response.json()
    
    if (qualityData) {
      qualityOptions.value = qualityData
      
    } else {
      console.warn('No quality data found')
    }
  } catch (error) {
    console.error('Error loading quality options:', error)
  }
}

// Lifecycle
onMounted(() => {
  fetchPackets()
  fetchStatistics()
  fetchItemsAndEquipment()
  loadQualityOptions()
})
</script>

<style scoped>
.modal-overlay {
  animation: fadeIn 0.2s ease;
}

.modal-content {
  animation: slideIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Custom scrollbar */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #334155;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #64748b;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
