<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">📦 Packet Management</h1>
            <p class="text-slate-400">จัดการแพคเกจในเกม สร้าง แก้ไข และติดตามสถิติการขาย</p>
          </div>
          <button 
            type="button"
            @click="showCreateModal = true"
            class="create-btn flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span class="font-medium">สร้างแพคใหม่</span>
          </button>
        </div>
      </div>

    <!-- Statistics Cards -->
    <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="stat-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
            </svg>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Total Packets</p>
            <p class="text-2xl font-bold text-white">{{ statistics.totalPackets }}</p>
          </div>
        </div>
      </div>

      <div class="stat-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Active Packets</p>
            <p class="text-2xl font-bold text-white">{{ statistics.activePackets }}</p>
          </div>
        </div>
      </div>

      <div class="stat-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>
          <div>
            <p class="text-slate-400 text-sm">Featured Packets</p>
            <p class="text-2xl font-bold text-white">{{ statistics.featuredPackets }}</p>
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
            placeholder="ค้นหาแพคเกจ..."
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
          <label class="text-slate-300 text-sm font-medium">ประเภท:</label>
          <select 
            v-model="filters.packetType" 
            class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">ทุกประเภท</option>
            <option value="starter">Starter</option>
            <option value="equipment">Equipment</option>
            <option value="weapon">Weapon</option>
            <option value="special">Special</option>
            <option value="premium">Premium</option>
          </select>
        </div>

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
          <label class="text-slate-300 text-sm font-medium">แนะนำ:</label>
          <select 
            v-model="filters.isFeatured" 
            class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">ทั้งหมด</option>
            <option value="1">แนะนำ</option>
            <option value="0">ไม่แนะนำ</option>
          </select>
        </div>

        <div class="flex items-center space-x-2">
          <label class="text-slate-300 text-sm font-medium">เรียงตาม:</label>
          <select 
            v-model="filters.sortBy" 
            class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="created_at">วันที่สร้าง</option>
            <option value="name">ชื่อ</option>
            <option value="price">ราคา</option>
            <option value="sales_count">ยอดขาย</option>
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

    <!-- Packets Grid -->
    <div class="packets-grid">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p class="text-slate-400 mt-4">Loading packets...</p>
      </div>

      <div v-else-if="filteredPackets.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
        </svg>
        <p class="text-slate-400 text-lg">No packets found</p>
        <button 
          type="button"
          @click="showCreateModal = true"
          class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Create First Packet
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="packet in paginatedPackets" 
          :key="packet.id"
          class="packet-card bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-200 transform hover:scale-105"
        >
          <!-- Packet Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-2">
                <h3 class="text-lg font-bold text-white">{{ packet.name }}</h3>
              </div>
              <p class="text-slate-400 text-sm mb-2">{{ packet.description || 'No description' }}</p>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs rounded-full capitalize">
                  {{ packet.packet_type }}
                </span>
               
                <span 
                  :class="packet.is_active ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'"
                  class="px-2 py-1 border text-xs rounded-full"
                >
                  {{ packet.is_active ? 'Active' : 'Inactive' }}
                </span>

                <span 
                  v-if="packet.packet_rarity_name"
                  :style="getRarityColor(packet.packet_rarity_name)"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ packet.packet_rarity_name }}
                </span>
                
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                type="button"
                @click="editPacket(packet)"
                class="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                title="Edit Packet"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                type="button"
                @click="deletePacket(packet)"
                class="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200"
                title="Delete Packet"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Pricing Info -->
          <div class="pricing-info mb-4">
            <div class="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
              <div class="flex items-center space-x-4">
                <div v-if="packet.price_token > 0" class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span class="text-green-400 font-medium">{{ formatNumber(packet.price_token) }} Token</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-slate-400 text-xs">Level {{ packet.level_requirement || 1 }}+</p>
              </div>
            </div>
          </div>

          <!-- Packet Contents -->
          <div class="packet-contents mb-4">
            <!-- Equipment Items -->
            <div v-if="getPacketEquipment(packet).length > 0" class="mb-4">
              <div class="flex items-center mb-3">
                <svg class="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h4 class="text-blue-300 text-base font-semibold">อุปกรณ์ ({{ getPacketEquipment(packet).length }})</h4>
              </div>
              <div class="grid grid-cols-4 gap-2">
                <div 
                  v-for="item in getPacketEquipment(packet).slice(0, 16)" 
                  :key="'eq-' + item.id"
                  class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1.5 hover:bg-slate-600/40 transition-all duration-200 group"
                  :title="`${item.name} (Lv.${item.level})`"
                >
                  <!-- Equipment Icon -->
                  <div class="w-14 h-14 mx-auto mb-1.5 relative">
                    <!-- Equipment Icon -->
                    <div class="w-full h-full bg-slate-600/80 rounded-lg flex items-center justify-center">
                      <img 
                        v-if="getEquipmentIcon(item)"
                        :src="getEquipmentIcon(item)" 
                        :alt="item.name"
                        class="w-10 h-10 object-contain rounded-lg"
                        @error="handleImageError($event, item)"
                      >
                      <svg v-else class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                      </svg>
                    </div>
                    <!-- Quantity Badge -->
                    <div class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-lg border border-white px-1">
                      <span v-if="(item.quantity || 1) >= 1000000" class="text-xs">
                        {{ Math.floor((item.quantity || 1) / 1000000) }}M
                      </span>
                      <span v-else-if="(item.quantity || 1) >= 1000" class="text-xs">
                        {{ Math.floor((item.quantity || 1) / 1000) }}K
                      </span>
                      <span v-else class="text-xs">
                        {{ item.quantity || 1 }}
                      </span>
                  </div>
                  </div>
                  <!-- Equipment Info -->
                  <div class="text-center">
                    <div :class="getQualityColor(item.quality)" class="text-xs px-1 py-0.5 rounded-full font-bold">
                      ★{{ item.quality }}
                </div>
                    <div class="text-slate-400 text-xs mt-0.5">Lv.{{ item.level }}</div>
                  </div>
                </div>
                <div v-if="getPacketEquipment(packet).length > 16" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 text-center">
                  <span class="text-slate-400 text-sm">และอีก {{ getPacketEquipment(packet).length - 16 }} รายการ</span>
                </div>
              </div>
            </div>

            <!-- Game Items -->
            <div v-if="getPacketItems(packet).length > 0" class="mb-4">
              <div class="flex items-center mb-3">
                <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                </svg>
                <h4 class="text-green-300 text-base font-semibold">ไอเทม ({{ getPacketItems(packet).length }})</h4>
              </div>
              <div class="grid grid-cols-4 gap-2">
                <div 
                  v-for="item in getPacketItems(packet).slice(0, 16)" 
                  :key="'item-' + item.id"
                  class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1.5 hover:bg-slate-600/40 transition-all duration-200 group"
                  :title="`${item.name} (${item.category || 'ไอเทม'})`"
                >
                  <!-- Item Icon -->
                  <div class="w-14 h-14 mx-auto mb-1.5 relative">
                    <div class="w-full h-full bg-slate-600/50 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                      <img 
                        v-if="item.icon_url"
                        :src="item.icon_url" 
                        :alt="item.name"
                        class="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                        @error="console.log('Image load error:', item.name, item.icon_url)"                        
                      >
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <!-- Icon removed -->
                    </div>
                      <!-- Gradient overlay for better contrast -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                   
                    <!-- Quantity Badge -->
                    <div class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold shadow-lg border border-white px-1">
                      <span v-if="(item.quantity || 1) >= 1000000" class="text-xs">
                        {{ Math.floor((item.quantity || 1) / 1000000) }}M
                      </span>
                      <span v-else-if="(item.quantity || 1) >= 1000" class="text-xs">
                        {{ Math.floor((item.quantity || 1) / 1000) }}K
                      </span>
                      <span v-else class="text-xs">
                        {{ item.quantity || 1 }}
                      </span>
                  </div>
                </div>
                  <!-- Item Info -->
                  <div class="text-center">
                    <div :class="getRarityColor(item.rarity)" class="text-xs px-1 py-0.5 rounded-full font-bold">
                      {{ item.rarity || 'ธรรมดา' }}
                    </div>
                    <div class="text-slate-400 text-xs mt-0.5 capitalize">{{ item.category || 'ไอเทม' }}</div>
                  </div>
                </div>
                <div v-if="getPacketItems(packet).length > 16" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 text-center">
                  <span class="text-slate-400 text-sm">และอีก {{ getPacketItems(packet).length - 16 }} รายการ</span>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="getPacketEquipment(packet).length === 0 && getPacketItems(packet).length === 0" class="text-center py-8 bg-slate-700/20 border border-slate-600/30 rounded-xl">
              <svg class="w-16 h-16 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m14 0H4"/>
              </svg>
              <h4 class="text-slate-400 text-lg font-medium mb-2">แพคว่างเปล่า</h4>
              <p class="text-slate-500 text-sm">ไม่มีไอเทมหรืออุปกรณ์ในแพคนี้</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      &nbsp;
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

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="modal-content bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">
            {{ showEditModal ? 'Edit Packet' : 'Create New Packet' }}
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

        <form @submit.prevent="showEditModal ? updatePacket() : createPacket()">
          <!-- Basic Information Section -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
              📋 ข้อมูลพื้นฐาน
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">
                  📦 ชื่อแพค
                </label>
                <input 
                  v-model="packetForm.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="กรอกชื่อแพคเกจ"
                >
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">
                  🏷️ ประเภทแพค
                </label>
                <select 
                  v-model="packetForm.packet_type"
                  required
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">เลือกประเภท</option>
                  <option value="starter">Starter</option>
                  <option value="equipment">Equipment</option>
                  <option value="weapon">Weapon</option>
                  <option value="special">Special</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-slate-300 text-sm font-medium mb-2">
                  📝 คำอธิบายแพค
                </label>
                <textarea 
                  v-model="packetForm.description"
                  rows="3"
                  class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="กรอกคำอธิบายแพคเกจ (ไม่บังคับ)"
                ></textarea>
                <p class="text-slate-400 text-xs mt-1">คำอธิบายจะช่วยให้ผู้เล่นเข้าใจเนื้อหาในแพคได้ดีขึ้น</p>
              </div>

            </div>
          </div>

          <!-- Pricing Section -->
          <div class="mb-8">
         
            <!-- Main Price -->
            <div class="mb-6">
              <div class="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-6">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  </div>
                  <div>
                    <label class="block text-blue-300 text-base font-semibold">
                      ราคาหลักของแพค (Token) ⭐
                    </label>
                    
                  </div>
                </div>
                <input 
                  v-model.number="packetForm.price_token"
                  type="number" 
                  min="0"
                  class="w-full px-4 py-3 bg-slate-700/70 border border-blue-400/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="ระบุราคาแพคเกจ"
                >
                <p class="text-blue-400 text-xs mt-2 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  นี่คือราคาหลักที่ลูกค้าจะเห็นและต้องจ่ายเพื่อซื้อแพคเกจทั้งหมด
                </p>
              </div>
            </div>

            <!-- Packet Rarity Selection -->
            <div class="mb-6">
              <div class="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-6">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <label class="block text-purple-300 text-base font-semibold">
                      ความหายากของแพค ⭐
                    </label>
                  </div>
                </div>
                <select 
                  v-model="packetForm.packet_rarity"
                  @change="onRarityChange"
                  class="w-full px-4 py-3 bg-slate-700/70 border border-purple-400/50 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                >
                  <option value="">เลือกความหายาก</option>
                  <option 
                    v-for="(quality, id) in qualityOptions" 
                    :key="id" 
                    :value="quality.name"
                  >
                    {{ quality.name }}
                  </option>
                </select>
                <p class="text-purple-400 text-xs mt-2 flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  เลือกความหายากของแพคเกจนี้
                </p>
              </div>
            </div>

          </div>

          <!-- Item Selection Section -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
              🎒 เลือกไอเทมในแพค
            </h3>

            <!-- Selected Equipment Display -->
            <div v-if="selectedEquipment.length > 0" class="mb-6">
              <div class="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                <h4 class="text-blue-300 text-sm font-medium mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  อุปกรณ์ที่เลือก ({{ selectedEquipment.length }} รายการ)
                </h4>
                <div class="grid grid-cols-1 gap-4">
                  <div 
                    v-for="item in selectedEquipment" 
                    :key="item.id"
                    class="flex items-center space-x-4 bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 hover:bg-slate-600/50 transition-all duration-200"
                  >
                    <div class="w-12 h-12 rounded-lg bg-slate-600 flex items-center justify-center relative shadow-lg">
                      <!-- Equipment Icon -->
                      <div class="w-full h-full flex items-center justify-center">
                        <img 
                          v-if="getEquipmentIcon(item)"
                          :src="getEquipmentIcon(item)" 
                          :alt="item.name"
                          class="w-8 h-8 object-contain rounded-lg"
                          @error="handleImageError($event, item)"
                        >
                        
                      </div>
                      <!-- Quantity Badge -->
                      <div class="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                        {{ item.quantity || 1 }}
                      </div>
                    </div>
                    <div class="flex-1 min-w-0 pr-2">
                      <h4 class="text-white text-sm font-semibold mb-2 break-words" :title="item.name">{{ item.name }}</h4>
                      <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="capitalize text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{{ item.category || item.equipment_type }}</span>
                        <span class="text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">Lv.{{ item.level }}</span>
                        <span :class="getQualityColor(item.quality)" class="px-2 py-1 rounded-full font-bold whitespace-nowrap">★{{ item.quality }}</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="text-center">
                        <label class="text-slate-400 text-xs font-medium block mb-1">จำนวน</label>
                        <input 
                          v-model.number="item.quantity"
                          type="number"
                          min="1"
                          max="99999999"
                          class="w-18 px-3 py-2 bg-slate-600/70 border border-slate-500 text-white rounded-lg text-sm text-center font-semibold focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        >
                      </div>
                      <button 
                        type="button"
                        @click="removeEquipment(item.id)"
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
            </div>

            <!-- Selected Items Display -->
            <div v-if="selectedItems.length > 0" class="mb-6">
              <div class="bg-green-600/10 border border-green-500/30 rounded-lg p-4">
                <h4 class="text-green-300 text-sm font-medium mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  ไอเทมและทรัพยากรที่เลือก ({{ selectedItems.length }} รายการ)
                </h4>
                <div class="grid grid-cols-1 gap-4">
                  <div 
                    v-for="item in selectedItems" 
                    :key="`selected-item-${item.id}`"
                    class="flex items-center space-x-4 bg-green-600/20 border border-green-500/50 rounded-xl p-4 hover:bg-green-600/30 transition-all duration-200"
                  >
                    <div class="flex-shrink-0 relative">
                      <div class="w-14 h-14 rounded-lg overflow-hidden bg-slate-600/50 flex items-center justify-center relative shadow-md">
                        <!-- Item Icon -->
                        <img 
                          v-if="item.icon_url"
                          :src="item.icon_url" 
                          :alt="item.name"
                          class="w-10 h-10 object-contain rounded-lg"
                          @error="handleImageError($event, item)"
                        >
                        
                      </div>
                      <!-- Quantity Badge -->
                      <div class="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full min-w-[24px] h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white px-1">
                        {{ formatQuantity(item.quantity) }}
                      </div>
                    </div>
                    <div class="flex-1 min-w-0 pr-2">
                      <h4 class="text-white text-sm font-semibold mb-2 break-words" :title="item.name">{{ item.name }}</h4>
                      <div class="flex flex-wrap items-center gap-2 text-xs">
                        <span class="text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{{ item.category || 'ไอเทม' }}</span>
                        <span class="text-green-300 bg-green-600/30 px-2 py-1 rounded-full whitespace-nowrap">{{ item.rarity || 'ธรรมดา' }}</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="text-center">
                        <label class="text-slate-400 text-xs font-medium block mb-1">จำนวน</label>
                        <input 
                          :value="item.quantity"
                          @input="updateItemQuantity(item.id, $event.target.value)"
                          @click.stop
                          type="number" 
                          min="1"
                          max="99999999"
                          class="w-18 px-3 py-2 bg-slate-600/70 border border-slate-500 text-white rounded-lg text-sm text-center font-semibold focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                        >
                      </div>
                      <button 
                        type="button"
                        @click="removeItem(item.id)"
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
                          <svg v-else class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                          </svg>
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
                <div v-if="filteredItems.filter(item => !selectedItems.some(selected => selected.id === item.id)).length === 0" 
                     class="col-span-full text-center py-12">
                  <svg class="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m14 0H4"/>
                </svg>
                <p class="text-slate-400">ไม่มีไอเทมที่พร้อมใช้งาน</p>
                <p class="text-slate-500 text-sm mt-1">ไอเทมทั้งหมดถูกเลือกแล้ว หรือลองปรับเปลี่ยนการค้นหา</p>
                </div>

                <!-- Available Items -->
                <div 
                  v-for="item in filteredItems.filter(item => !selectedItems.some(selected => selected.id === item.id))" 
                  :key="`available-item-${item.id}`"
                  @click="toggleItem(item)"
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
                        @error="$event.target.style.display='none'; $event.target.nextElementSibling.style.display='block'"
                      />
                      <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: none;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                      </svg>
                      <svg v-if="!item.icon_url" class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
        
        
          <!-- Settings Section -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
              ⚙️ การตั้งค่า
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Requirements -->
              <div class="space-y-4">
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">
                    🏆 เลเวลขั้นต่ำ
                  </label>
                  <input 
                    v-model.number="packetForm.level_requirement"
                    type="number" 
                    min="1"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="1"
                  >
                </div>

                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">
                    🛒 จำกัดการซื้อต่อผู้ใช้
                  </label>
                  <input 
                    v-model.number="packetForm.max_purchases_per_user"
                    type="number" 
                    min="1"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="ไม่จำกัด"
                  >
                  <p class="text-slate-400 text-xs mt-1">เว้นว่างหากไม่ต้องการจำกัด</p>
                </div>

              </div>

              <!-- Status Options -->
              <div class="space-y-4">
                <div class="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
                  <h4 class="text-slate-300 text-sm font-medium mb-3">สถานะแพค</h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-center">
                      <input 
                        v-model="packetForm.is_active"
                        type="checkbox" 
                        id="is_active"
                        class="mr-3 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      >
                      <div>
                        <label for="is_active" class="text-slate-300 text-sm font-medium">เปิดใช้งาน</label>
                        <p class="text-slate-400 text-xs">แพคนี้จะแสดงในร้านค้า</p>
                      </div>
                    </div>

                    <div class="flex items-center">
                      <input 
                        v-model="packetForm.is_featured"
                        type="checkbox" 
                        id="is_featured"
                        class="mr-3 rounded border-slate-600 bg-slate-700 text-yellow-600 focus:ring-yellow-500 w-4 h-4"
                      >
                      <div>
                        <label for="is_featured" class="text-slate-300 text-sm font-medium">แพคแนะนำ</label>
                        <p class="text-slate-400 text-xs">แสดงในหน้าแรกและมีเครื่องหมายดาว</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
            <button 
              type="button"
              @click="closeModal"
              class="px-6 py-3 bg-slate-600/50 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-all duration-200 font-medium"
            >
              ยกเลิก
            </button>
            <button 
              type="submit"
              :disabled="saving"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 font-medium shadow-lg"
            >
              <span v-if="saving" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังบันทึก...
              </span>
              <span v-else>
                {{ showEditModal ? 'อัพเดทแพค' : 'สร้างแพค' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Toast Notification -->
    <div 
      v-if="notification.show"
      :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
      class="fixed top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300"
    >
      {{ notification.message }}
    </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import PacketService from '../services/PacketService.js'
import GameEquipService from '../services/GameEquipService.js'
import Navigation from './Navigation.vue'
import GameEquipManager  from '../utils/GameEquipManager.js'
import GameItemManager from '../utils/GameItemManager.js'
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

// Reactive Data
const packets = ref([])
const loading = ref(false)
const saving = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingPacket = ref(null)

// Statistics computed from packets
const statistics = computed(() => {
  const totalPackets = packets.value.length
  const activePackets = packets.value.filter(p => p.is_active).length
  const featuredPackets = packets.value.filter(p => p.is_featured).length
  
  return {
    totalPackets,
    activePackets,
    featuredPackets
  }
})

// Search and Filters
const searchQuery = ref('')
const filters = reactive({
  packetType: '',
  isActive: '1', // Default to active only
  isFeatured: '',
  sortBy: 'created_at',
  sortOrder: 'desc',
  limit: 6,
  offset: 0
})

// Pagination
const pagination = reactive({
  page: 1,
  totalPages: 1,
  total: 0
})

// Client-side pagination for packets
const packetsPagination = reactive({
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0,
  totalPages: 0
})

// Packet Form
const packetForm = reactive({
  name: '',
  description: '',
  packet_type: '',
  price_token: 0,
  level_requirement: 1,
  max_purchases_per_user: null,
  daily_purchase_limit: null,
  image_url: null,
  sort_order: 0,
  is_active: true,
  is_featured: false,
  packet_rarity: 'ทั่วไป',
  packet_rarity_id: '1',
  equipment_items: []
})

// Equipment Selection
const availableEquipment = ref([])
const selectedEquipment = ref([])
const loadingEquipment = ref(false)
const equipmentFilter = ref('all')
const equipmentLevelFilter = ref('all')
const equipmentSearch = ref('')

// Equipment Pagination
const equipmentPagination = reactive({
  currentPage: 1,
  itemsPerPage: 24,
  totalItems: 0,
  totalPages: 0
})

// Item Selection (สำหรับ gold, gems, ore และไอเทมอื่นๆ)
const availableItems = ref([])
const selectedItems = ref([])
const loadingItems = ref(false)
const itemFilter = ref('all')
const itemSearch = ref('')
const showItemsSection = ref(false)

// Current Selection Mode
const selectionMode = ref('equipment') // 'equipment' หรือ 'items'

// Quality options from GameEquipQuality.json
const qualityOptions = ref({})

// Notification
const notification = reactive({
  show: false,
  type: 'success',
  message: ''
})

// Computed Properties

// Filter and search packets
const filteredPackets = computed(() => {
  let filtered = Array.isArray(packets.value) ? packets.value : []

  // Search filter
  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(packet => {
      if (!packet) return false
      return String(packet.name || '').toLowerCase().includes(search) ||
        String(packet.description || '').toLowerCase().includes(search) ||
        String(packet.packet_type || '').toLowerCase().includes(search)
    })
  }

  // Type filter
  if (filters.packetType) {
    filtered = filtered.filter(packet => packet && packet.packet_type === filters.packetType)
  }

  // Active status filter
  if (filters.isActive !== '') {
    const isActive = parseInt(filters.isActive)
    filtered = filtered.filter(packet => packet && parseInt(packet.is_active) === isActive)
  }

  // Featured filter
  if (filters.isFeatured !== '') {
    const isFeatured = parseInt(filters.isFeatured)
    filtered = filtered.filter(packet => packet && parseInt(packet.is_featured) === isFeatured)
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (filters.sortBy) {
      case 'name':
        aValue = String(a.name || '').toLowerCase()
        bValue = String(b.name || '').toLowerCase()
        break
      case 'price':
        aValue = Number(a.price || 0)
        bValue = Number(b.price || 0)
        break
      case 'sales_count':
        aValue = Number(a.sales_count || 0)
        bValue = Number(b.sales_count || 0)
        break
      case 'created_at':
      default:
        aValue = new Date(a.created_at || 0)
        bValue = new Date(b.created_at || 0)
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
  return filters.packetType !== '' || 
         (filters.isActive !== '' && filters.isActive !== '1') || 
         filters.isFeatured !== '' ||
         filters.sortBy !== 'created_at' ||
         filters.sortOrder !== 'desc'
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
    // First sort by quality (higher quality first)
    if (a.quality !== b.quality) {
      return (b.quality || 0) - (a.quality || 0)
    }
    // Then sort by name alphabetically
    return a.name.localeCompare(b.name)
  })

  // Update pagination info
  equipmentPagination.totalItems = sorted.length
  equipmentPagination.totalPages = Math.ceil(sorted.length / equipmentPagination.itemsPerPage)
  
  // Ensure current page is valid
  if (equipmentPagination.currentPage > equipmentPagination.totalPages && equipmentPagination.totalPages > 0) {
    equipmentPagination.currentPage = equipmentPagination.totalPages
  }

  // Return paginated results
  const startIndex = (equipmentPagination.currentPage - 1) * equipmentPagination.itemsPerPage
  const endIndex = startIndex + equipmentPagination.itemsPerPage
  return sorted.slice(startIndex, endIndex)
})

// Computed property for unique equipment types with counts and styling
const uniqueEquipmentTypes = computed(() => {
  const typeCount = {}
  const typeIcons = {
    'weapon': { icon: '⚔️', label: 'อาวุธ', bgClass: 'bg-red-600' },
    'cloth': { icon: '�', label: 'เสื้อผ้า', bgClass: 'bg-blue-600' },
    'hat': { icon: '🎩', label: 'หมวก', bgClass: 'bg-purple-600' },
    'belt': { icon: '�', label: 'แหวน', bgClass: 'bg-yellow-600' },
    'pants': { icon: '👖', label: 'กางเกง', bgClass: 'bg-green-600' },
    'shoe': { icon: '👞', label: 'รองเท้า', bgClass: 'bg-orange-600' },
    'unknown': { icon: '📦', label: 'อื่นๆ', bgClass: 'bg-gray-600' }
  }

  // Count items by type with safety check
  if (Array.isArray(availableEquipment.value)) {
    availableEquipment.value.forEach(item => {
      if (!item || typeof item !== 'object') return
      
      const type = item.equipment_type || 'unknown'
      typeCount[type] = (typeCount[type] || 0) + 1
    })
  }

  // Create array of types with counts (without showing count)
  return Object.keys(typeCount).map(type => ({
    value: type,
    label: typeIcons[type]?.label || type,
    icon: typeIcons[type]?.icon || '📦',
    bgClass: typeIcons[type]?.bgClass || 'bg-gray-600',
    count: typeCount[type]
  })).sort((a, b) => b.count - a.count) // Sort by count descending
})

// Level filter options
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

// Computed property for filtered items
const filteredItems = computed(() => {
  let filtered = Array.isArray(availableItems.value) ? availableItems.value : []

  // Filter by type/category
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

  // Sort by id
  const sorted = filtered.sort((a, b) => {
    // Sort by id numerically
    const idA = parseInt(String(a.id)) || 0
    const idB = parseInt(String(b.id)) || 0
    return idA - idB
  })

  // Return all items (no limit)
  return sorted
})

// Computed property for unique item categories
const uniqueItemCategories = computed(() => {
  const categoryCount = {}
  const categoryItems = {} // เก็บไอเทมแรกในแต่ละหมวด
  
  // Count items by category and store first item of each category with safety check
  if (Array.isArray(availableItems.value)) {
    availableItems.value.forEach(item => {
      if (!item || typeof item !== 'object') return
      
      const category = String(item.category || item.type || 'misc')
      categoryCount[category] = (categoryCount[category] || 0) + 1
      
      // เก็บไอเทมแรกในหมวดนั้น (ถ้ายังไม่มี)
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

  // Create array of categories with counts and first item icons
  return Object.keys(categoryCount).map(category => {
    const firstItem = categoryItems[category]
    const defaults = categoryDefaults[category] || { label: category, bgClass: 'bg-gray-600' }
    
    return {
      value: category,
      label: defaults.label,
      icon_url: firstItem?.icon_url || null, // ใช้ icon_url ของไอเทมแรก
      fallback_icon: '📦', // fallback เมื่อโหลด icon ไม่ได้
      bgClass: defaults.bgClass,
      count: categoryCount[category]
    }
  }).sort((a, b) => b.count - a.count) // Sort by count descending
})

// Helper functions สำหรับการแปลง position เป็น type และ name ตาม GameEquipPos
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

const getEquipmentNameByPos = (pos) => {
  const nameMap = {
    1: 'อาวุธ',
    2: 'เสื้อผ้า',
    3: 'หมวก', 
    4: 'แหวน',
    5: 'กางเกง',
    6: 'รองเท้า'
  }
  return nameMap[pos] || 'ไม่ทราบ'
}

// Equipment Methods
const fetchEquipment = async () => {
  loadingEquipment.value = true
  try {
    // ใช้ GameEquipService เพื่อดึงข้อมูล equipment ทั้งหมดจาก JSON
    console.log('Fetching equipment from GameEquipService...')
    
    if (!GameEquipService || typeof GameEquipService.getAllEquips !== 'function') {
      console.warn('GameEquipService is not available')
      availableEquipment.value = []
      return
    }
    
    const allEquips = GameEquipService.getAllEquips()
    //console.log('Raw equipment data:', allEquips)
    
    if (allEquips && allEquips.length > 0) {
      // แปลงข้อมูลให้เข้ากับโครงสร้างที่ต้องการ
     
      availableEquipment.value = allEquips.map(item => {
        const equipDetails = GameEquipService.getEquipWithDetails ? GameEquipService.getEquipWithDetails(item.id) : null
      
        return {
          id: item.id,
          name: item.name || `Equipment ${item.id}`,
          equipment_type: getEquipmentTypeByPos(item.pos),
          quality: Math.min(Math.floor((item.level || 1) / 2) + 1, 10), // Convert level to quality (1-10)
          level: item.level || 1,
          pos: item.pos,
          icon_url: GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function' ? GameEquipManager.getEquipIconByIdq(item.id, Math.min(Math.floor((item.level || 1) / 2) + 1, 10)) : null, // จะใช้ icon จาก GameEquipManager แทน
          description: `Level ${item.level || 1} ${getEquipmentNameByPos(item.pos)}`,
          stats: {
            hp: item.hp || 0,
            atk: item.atk || 0,
            def: item.def || 0,
            atkspeed: item.atkspeed || 0
          },
          rarity: equipDetails?.rarity || 'Common',
          category: getEquipmentNameByPos(item.pos),
          original_data: item
        }
      })
      
      console.log(`Loaded ${availableEquipment.value.length} equipment items`)
  
    } else {
      console.warn('No equipment data found')
      availableEquipment.value = []
      showNotification('ไม่พบข้อมูลไอเทม', 'error')
    }
  } catch (error) {
    console.error('Error fetching equipment:', error)
    availableEquipment.value = []
    showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูลไอเทม', 'error')
  } finally {
    loadingEquipment.value = false
  }
}

// Item Methods  
const fetchItems = async () => {
  loadingItems.value = true
  try {
    console.log('Fetching items from GameItemManager...')
    
    if (!GameItemManager || typeof GameItemManager.getAllItems !== 'function') {
      console.warn('GameItemManager is not available')
      availableItems.value = []
      return
    }
    
    const allItems = GameItemManager.getAllItems()
    console.log(`Found ${allItems?.length || 0} items`)
    
    if (allItems && allItems.length > 0) {
      // แปลงข้อมูลให้เข้ากับโครงสร้างที่ต้องการ
      availableItems.value = allItems.map(item => {
        if (!item || typeof item !== 'object') return null
        
        const itemDetails = GameItemManager.getItemWithDetails ? GameItemManager.getItemWithDetails(item.id) : null
        const iconUrl = GameItemManager.getItemIcon ? GameItemManager.getItemIcon(item.id) : null
        
        return {
          id: String(item.id || ''),
          name: String(item.name || `Item ${item.id || 'Unknown'}`),
          type: String(item.type || 'misc'),
          category: String(item.category || item.type || 'misc'),
          description: String(item.description || `ไอเทม ${item.name || item.id || 'Unknown'}`),
          value: Number(item.value || 0),
          rarity: String(item.rarity || 'Common'),
          stackable: Boolean(item.stackable !== false),
          icon_url: iconUrl,
          original_data: item
        }
      }).filter(Boolean)
      
      console.log(`Loaded ${availableItems.value.length} items`)
      
      
    } else {
      
      availableItems.value = []
      showNotification('ไม่พบข้อมูลไอเทม', 'error')
    }
  } catch (error) {
    
    availableItems.value = []
    showNotification('เกิดข้อผิดพลาดในการโหลดข้อมูลไอเทม', 'error')
  } finally {
    loadingItems.value = false
  }
}

const toggleItem = (item) => {
  const index = selectedItems.value.findIndex(it => it.id === item.id)
  if (index >= 0) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push({
      ...item,
      quantity: 1
    })
  }
}

const toggleEquipment = (item) => {
  const index = selectedEquipment.value.findIndex(eq => eq.id === item.id)
  if (index >= 0) {
    selectedEquipment.value.splice(index, 1)
  } else {
    selectedEquipment.value.push({
      ...item,
      quantity: 1
    })
  }
}

const isEquipmentSelected = (itemId) => {
  return selectedEquipment.value.some(eq => eq.id === itemId)
}

const isItemSelected = (itemId) => {
  return selectedItems.value.some(item => item.id === itemId)
}

const removeEquipment = (itemId) => {
  const index = selectedEquipment.value.findIndex(eq => eq.id === itemId)
  if (index >= 0) {
    selectedEquipment.value.splice(index, 1)
  }
}

const removeItem = (itemId) => {
  const index = selectedItems.value.findIndex(item => item.id === itemId)
  if (index >= 0) {
    selectedItems.value.splice(index, 1)
  }
}

// Search and Filter Functions
const resetFilters = () => {
  searchQuery.value = ''
  filters.packetType = ''
  filters.isActive = '1' // Reset to active only
  filters.isFeatured = ''
  filters.sortBy = 'created_at'
  filters.sortOrder = 'desc'
  resetPacketsPagination()
}

const refreshData = async () => {
  await fetchPackets()
  showNotification('ข้อมูลได้รับการอัพเดทแล้ว', 'success')
}

const updateItemQuantity = (itemId, quantity) => {
  const index = selectedItems.value.findIndex(item => item.id === itemId)
  if (index >= 0) {
    const newQuantity = parseInt(quantity) || 1
    selectedItems.value[index].quantity = Math.max(1, Math.min(99999999, newQuantity))
  }
}

// Image Error Handler with Fallback Paths
const handleImageError = (event, item) => {
  console.log('Image error for item:', item.name, 'URL:', event.target.src)
  if (event && event.target) {
    // Hide the broken image
    event.target.style.display = 'none'
    
    // Find and show the fallback div
    const parent = event.target.parentElement
    if (parent) {
      const fallbackDiv = parent.querySelector('div[style*="display: none"]')
      if (fallbackDiv) {
        fallbackDiv.style.display = 'flex'
        console.log('Showing fallback for:', item.name)
      }
    }
  }
}

// Function to handle selection mode changes
const handleSelectionModeChange = (mode) => {
  selectionMode.value = mode
  console.log('selectionMode changed to:', mode)
  
  // Reset filters when switching modes
  if (mode === 'equipment') {
    // equipmentSearch.value = ''
    // equipmentFilter.value = 'all'
    // equipmentLevelFilter.value = 'all'
    resetEquipmentPagination()
  } else if (mode === 'items') {
    // itemSearch.value = ''
    // itemFilter.value = 'all'
  }
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

// ฟังก์ชันสำหรับแปลง level filter เป็น range
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

// ฟังก์ชันสำหรับดึง icon URL จาก GameEquipManager
const getEquipmentIcon = (item) => {
  try {
    if (item && item.id && GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function') {
      const iconUrl = GameEquipManager.getEquipIconByIdq(item.id, item.quality)
      //console.log('Equipment icon URL for', item.name, 'ID:', item.id, 'Quality:', item.quality, 'URL:', iconUrl)
      return iconUrl
    }
  } catch (error) {
    console.warn('Error getting equipment icon:', error)
  }
  console.log('No equipment icon for:', item.name, 'ID:', item.id)
  return null
}

// ฟังก์ชันสำหรับดึง background จาก GameEquipManager
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

// Equipment search function
let equipmentSearchTimeout = null
const debounceEquipmentSearch = () => {
  if (equipmentSearchTimeout) {
    clearTimeout(equipmentSearchTimeout)
  }
  equipmentSearchTimeout = setTimeout(() => {
    // Reset to first page when searching
    equipmentPagination.currentPage = 1
    console.log('Search for:', equipmentSearch.value, 'Found:', filteredEquipment.value.length, 'items')
  }, 300)
}

// Equipment pagination functions
const changeEquipmentPage = (page) => {
  if (page >= 1 && page <= equipmentPagination.totalPages) {
    equipmentPagination.currentPage = page
  }
}

const resetEquipmentPagination = () => {
  equipmentPagination.currentPage = 1
}

// Methods
const fetchPackets = async () => {
  loading.value = true
  try {
    // Fetch all packets without pagination
    const response = await PacketService.getPackets({ limit: 1000 })
    packets.value = response.data.packets || []
  } catch (error) {
    console.error('Error fetching packets:', error)
    showNotification('Error fetching packets', 'error')
  } finally {
    loading.value = false
  }
}



const createPacket = async () => {
  saving.value = true
  try {
    // Format selected items to match backend structure with safety checks
    const formattedGameItems = Array.isArray(selectedItems.value) ? selectedItems.value.map(item => {
      if (!item || typeof item !== 'object') return null
      return {
        id: String(item.id || ''),
        name: String(item.name || 'Unknown Item'),
        quantity: Number(item.quantity) || 1,
        drop_chance: 100, // Default 100% drop chance
        is_guaranteed: true // Default guaranteed
      }
    }).filter(Boolean) : []

    const formattedEquipmentItems = Array.isArray(selectedEquipment.value) ? selectedEquipment.value.map(item => {
      if (!item || typeof item !== 'object') return null
      return {
        id: String(item.id || ''),
        name: String(item.name || 'Unknown Equipment'),
        quantity: Number(item.quantity) || 1,
        rarity: parseInt(packetForm.packet_rarity_id) || 1,
        drop_chance: 80, // Default 80% drop chance for equipment
        is_guaranteed: false, // Default not guaranteed for equipment
        quality: Number(item.quality) || 1,
        level: Number(item.level) || 1,
        equipment_type: String(item.equipment_type || 'unknown')
      }
    }).filter(Boolean) : []

    // Prepare packet data with JSON strings
    const packetData = {
      name: String(packetForm.name).trim(),
      description: String(packetForm.description || '').trim() || null,
      packet_type: String(packetForm.packet_type),
      price_token: Number(packetForm.price_token) || 0,
      // Convert arrays to JSON strings before sending
      game_items: JSON.stringify(formattedGameItems),
      equipment_items: JSON.stringify(formattedEquipmentItems),
      is_active: packetForm.is_active ? 1 : 0,
      is_featured: packetForm.is_featured ? 1 : 0,
      level_requirement: Number(packetForm.level_requirement) || 1,
      max_purchases_per_user: packetForm.max_purchases_per_user ? Number(packetForm.max_purchases_per_user) : null,
      daily_purchase_limit: packetForm.daily_purchase_limit ? Number(packetForm.daily_purchase_limit) : null,
      image_url: packetForm.image_url ? String(packetForm.image_url).trim() : null,
      sort_order: Number(packetForm.sort_order) || 0,
      packet_rarity: packetForm.packet_rarity_id || null,
      packet_rarity_name: packetForm.packet_rarity || null
    }

    console.log('Creating packet with JSON strings:', {
      ...packetData,
      game_items: `JSON string with ${formattedGameItems.length} items`,
      equipment_items: `JSON string with ${formattedEquipmentItems.length} items`
    })
    
    const response = await PacketService.createPacket(packetData)
    if (response.success) {
      showNotification('สร้างแพคสำเร็จ!', 'success')
      closeModal()
      fetchPackets()
    }
  } catch (error) {
    console.error('Error creating packet:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message || 'ไม่สามารถสร้างแพคได้'}`, 'error')
  } finally {
    saving.value = false
  }
}

const editPacket = (packet) => {
  if (!packet) {
    console.warn('editPacket: packet is null or undefined')
    return
  }
  
  editingPacket.value = packet
  Object.assign(packetForm, {
    name: packet.name || '',
    description: packet.description || '',
    packet_type: packet.packet_type || '',
    price_token: packet.price_token || 0,
    level_requirement: packet.level_requirement || 1,
    max_purchases_per_user: packet.max_purchases_per_user || null,
    daily_purchase_limit: packet.daily_purchase_limit || null,
    is_active: !!packet.is_active,
    is_featured: !!packet.is_featured,
    packet_rarity: packet.packet_rarity_name || '',
    packet_rarity_id: packet.packet_rarity || '',
    equipment_items: Array.isArray(packet.equipment_items) ? packet.equipment_items : [],
    game_items: Array.isArray(packet.game_items) ? packet.game_items : []
  })
  
  // Set selected equipment and items with safety checks using helper functions
  selectedEquipment.value = [...getPacketEquipment(packet)]
  selectedItems.value = [...getPacketItems(packet)]
  
  
  showEditModal.value = true
}

const updatePacket = async () => {
  saving.value = true
  try {
    // Format selected items to match backend structure
    const formattedGameItems = Array.isArray(selectedItems.value) ? selectedItems.value.map(item => {
      if (!item || typeof item !== 'object') return null
      return {
        id: String(item.id || ''),
        name: String(item.name || 'Unknown Item'),
        quantity: Number(item.quantity) || 1,
        drop_chance: item.drop_chance || 100,
        is_guaranteed: item.is_guaranteed !== undefined ? item.is_guaranteed : true
      }
    }).filter(Boolean) : []

    const formattedEquipmentItems = Array.isArray(selectedEquipment.value) ? selectedEquipment.value.map(item => {
      if (!item || typeof item !== 'object') return null
      return {
        id: String(item.id || ''),
        name: String(item.name || 'Unknown Equipment'),
        quantity: Number(item.quantity) || 1,
        rarity: parseInt(packetForm.packet_rarity_id) || 1,
        drop_chance: item.drop_chance || 80,
        is_guaranteed: item.is_guaranteed !== undefined ? item.is_guaranteed : false,
        quality: Number(item.quality) || 1,
        level: Number(item.level) || 1,
        equipment_type: String(item.equipment_type || 'unknown')
      }
    }).filter(Boolean) : []

    // Prepare packet data with JSON strings
    const packetData = {
      name: String(packetForm.name).trim(),
      description: String(packetForm.description || '').trim() || null,
      packet_type: String(packetForm.packet_type),
      price_token: Number(packetForm.price_token) || 0,
      // Convert arrays to JSON strings before sending
      game_items: JSON.stringify(formattedGameItems),
      equipment_items: JSON.stringify(formattedEquipmentItems),
      is_active: packetForm.is_active ? 1 : 0,
      is_featured: packetForm.is_featured ? 1 : 0,
      level_requirement: Number(packetForm.level_requirement) || 1,
      max_purchases_per_user: packetForm.max_purchases_per_user ? Number(packetForm.max_purchases_per_user) : null,
      daily_purchase_limit: packetForm.daily_purchase_limit ? Number(packetForm.daily_purchase_limit) : null,
      image_url: packetForm.image_url ? String(packetForm.image_url).trim() : null,
      sort_order: Number(packetForm.sort_order) || 0,
      packet_rarity: packetForm.packet_rarity_id || null,
      packet_rarity_name: packetForm.packet_rarity || null
    }

    console.log('Updating packet with JSON strings:', {
      ...packetData,
      game_items: `JSON string with ${formattedGameItems.length} items`,
      equipment_items: `JSON string with ${formattedEquipmentItems.length} items`
    })
    
    const response = await PacketService.updatePacket(editingPacket.value.id, packetData)
    if (response.success) {
      showNotification('อัพเดทแพคสำเร็จ!', 'success')
      closeModal()
      fetchPackets()
    }
  } catch (error) {
    console.error('Error updating packet:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message || 'ไม่สามารถอัพเดทแพคได้'}`, 'error')
  } finally {
    saving.value = false
  }
}

const deletePacket = async (packet) => {
  if (!confirm(`Are you sure you want to delete "${packet.name}"?`)) return
  
  try {
    const response = await PacketService.deletePacket(packet.id)
    if (response.success) {
      showNotification('Packet deleted successfully!', 'success')
      fetchPackets()
    }
  } catch (error) {
    console.error('Error deleting packet:', error)
    showNotification('Error deleting packet', 'error')
  }
}


const changePage = (page) => {
  if (page >= 1 && page <= pagination.totalPages) {
    pagination.page = page
    fetchPackets()
  }
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

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingPacket.value = null
  selectedEquipment.value = []
  selectedItems.value = []
  equipmentFilter.value = 'all'
  equipmentLevelFilter.value = 'all'
  equipmentSearch.value = ''
  itemFilter.value = 'all'
  itemSearch.value = ''
  selectionMode.value = 'equipment'
  resetForm()
}

const resetForm = () => {
  Object.assign(packetForm, {
    name: '',
    description: '',
    packet_type: '',
    price_token: 0,
    level_requirement: 1,
    max_purchases_per_user: null,
    daily_purchase_limit: null,
    image_url: null,
    sort_order: 0,
    is_active: true,
    is_featured: false,
    packet_rarity: 'ทั่วไป',
    packet_rarity_id: '1',
    equipment_items: [],
    game_items: []
  })
}

const showNotification = (message, type = 'success') => {
  notification.message = message
  notification.type = type
  notification.show = true
  setTimeout(() => {
    notification.show = false
  }, 3000)
}

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num || 0)
}

// Helper functions for packet contents
const getPacketEquipment = (packet) => {
  if (!packet || !packet.equipment_items) return []
  
  try {
    // If it's already an array, return it
    if (Array.isArray(packet.equipment_items)) {
      return packet.equipment_items
    }
    
    // If it's a string, try to parse it as JSON
    if (typeof packet.equipment_items === 'string') {
      const parsed = JSON.parse(packet.equipment_items)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (error) {
    console.warn('Error parsing equipment_items:', error)
  }
  
  return []
}

const getPacketItems = (packet) => {
  if (!packet || !packet.game_items) return []
  
  try {
    let items = []
    
    // If it's already an array, use it
    if (Array.isArray(packet.game_items)) {
      items = packet.game_items
    }
    // If it's a string, try to parse it as JSON
    else if (typeof packet.game_items === 'string') {
      const parsed = JSON.parse(packet.game_items)
      items = Array.isArray(parsed) ? parsed : []
    }
    
    // Add icon_url to each item
    return items.map(item => {
      if (!item || !item.id) return item
      
      // Get icon_url from GameItemManager
      const iconUrl = GameItemManager?.getItemIcon ? GameItemManager.getItemIcon(item.id) : null
      
      return {
        ...item,
        icon_url: iconUrl
      }
    })
    
  } catch (error) {
    console.warn('Error parsing game_items:', error)
  }
  
  return []
}

// Handle rarity selection change
const onRarityChange = () => {
  // Find the ID for the selected rarity name
  const rarityEntry = Object.entries(qualityOptions.value).find(([id, quality]) => 
    quality.name === packetForm.packet_rarity
  )
  
  if (rarityEntry) {
    packetForm.packet_rarity_id = rarityEntry[0]
  } else {
    packetForm.packet_rarity_id = ''
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
      // Set default rarity ID after loading quality options
      if (packetForm.packet_rarity === 'ทั่วไป') {
        packetForm.packet_rarity_id = '1'
      }
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
  fetchEquipment()
  fetchItems()
  loadQualityOptions()
})
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.packet-card {
  transition: all 0.2s ease;
}

.packet-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.create-btn {
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.create-btn:hover {
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.packet-contents {
  background: rgba(15, 23, 42, 0.4);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(71, 85, 105, 0.4);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.packet-contents h4 {
  font-weight: 600;
  font-size: 1rem;
}

/* Enhanced quantity badge animations */
.quantity-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Enhanced hover effects for items */
.item-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

/* Enhanced equipment grid animations */
.equipment-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.equipment-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Gradient text effects */
.gradient-text {
  background: linear-gradient(135deg, #60a5fa 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Fix text display issues */
.text-wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Ensure icons are properly centered */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

/* Fix image loading */
img {
  max-width: 100%;
  height: auto;
}

/* Custom xs breakpoint */
@media (min-width: 475px) {
  .xs\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .xs\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Improve text readability */
.text-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

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