<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="email-management">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">📧 Email Management</h1>
            <p class="text-slate-400">จัดการส่งอีเมลในเกม</p>
          </div>
          <button 
            @click="showCreateModal = true"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>สร้างอีเมล</span>
          </button>
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
                placeholder="ค้นหาอีเมล..."
                class="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
              <div v-if="searchQuery && filteredEmailPackets.length === 0" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span class="text-orange-400 text-sm">ไม่พบ</span>
              </div>
            </div>
            <div v-if="searchQuery || hasActiveFilters" class="mt-2 text-xs text-slate-400">
              พบ {{ filteredEmailPackets.length }} รายการ
            </div>
          </div>

          <!-- Filter Controls -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label class="text-slate-300 text-sm font-medium">สถานะ:</label>
              <select 
                v-model="statusFilter" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">ทุกสถานะ</option>
                <option value="active">เปิดใช้งาน</option>
                <option value="inactive">ปิดใช้งาน</option>
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <label class="text-slate-300 text-sm font-medium">เรียงตาม:</label>
              <select 
                v-model="sortBy" 
                class="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="created_at">วันที่สร้าง</option>
                <option value="updated_at">วันที่แก้ไข</option>
                <option value="title">ชื่อ</option>
                <option value="total_sent">จำนวนการส่ง</option>
              </select>
              <select 
                v-model="sortOrder" 
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


        <!-- Email Packets Grid -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p class="text-slate-400 mt-4">Loading email packets...</p>
        </div>

        <div v-else-if="emailPackets.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
          </svg>
          <p class="text-slate-400 text-lg">No email packets found</p>
          <button 
            type="button"
            @click="showCreateModal = true"
            class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Create First Email Packet
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            v-for="packet in filteredEmailPackets" 
            :key="packet.id"
            class="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800/70 transition-colors duration-200"
          >
            <!-- Packet Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-1">{{ packet.title }}</h3>
                <p class="text-slate-400 text-sm mb-2">{{ packet.content }}</p>
                <div class="flex items-center space-x-2 mb-2">
                  <span 
                    :class="packet.is_active ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ packet.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                  </span>
                  <span 
                    v-if="packet.packet_rarity_name"
                    :style="getRarityColor(packet.packet_rarity_name)"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ packet.packet_rarity_name }}
                  </span>
                  <span class="text-slate-400 text-xs">
                    ส่งแล้ว: {{ packet.total_sent || 0 }} ครั้ง
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
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
                  @click="sendEmail(packet)"
                  class="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                  title="ส่งอีเมล"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
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

            <!-- Items Preview -->
            <div class="bg-slate-700/30 rounded-lg p-4 mb-4">
              <h4 class="text-sm font-medium text-slate-300 mb-2">Items Preview</h4>
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
                        v-if="getItemIcon(item)"
                        :src="getItemIcon(item)" 
                        :alt="item.name"
                        class="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                        @error="handleImageError($event, item)"
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
                    <div class="text-slate-400 text-xs mt-0.5 capitalize">{{ item.category || 'ไอเทม' }}</div>
                  </div>
                </div>
                <div v-if="getPacketItems(packet).length > 16" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 text-center">
                  <span class="text-slate-400 text-sm">และอีก {{ getPacketItems(packet).length - 16 }} รายการ</span>
                </div>
              </div>
            </div>

            <!-- Updated At -->
            <div class="text-xs text-slate-500">
              อัพเดท: {{ formatDate(packet.updated_at) }}
            </div>
          </div>
        </div>

        <!-- Send Email Modal -->
        <div v-if="showSendModal" class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="modal-content bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white">ส่งอีเมล</h2>
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

            <!-- Email Preview -->
            <div class="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 mb-6">
              <h3 class="text-white text-lg font-semibold mb-2">{{ selectedPacket?.title }}</h3>
              <p class="text-slate-300 text-sm mb-4">{{ selectedPacket?.content }}</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-600/50 rounded-lg p-3">
                  <h4 class="text-slate-300 text-sm font-medium mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                    </svg>
                    Game Items
                  </h4>
                  <div class="grid grid-cols-4 gap-2">
                    <div 
                      v-for="item in getPacketGameItems(selectedPacket).slice(0, 16)" 
                      :key="'game-item-' + item.id"
                      class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1.5 hover:bg-slate-600/40 transition-all duration-200 group"
                      :title="`${item.name} (${item.category || 'ไอเทม'})`"
                    >
                      <!-- Item Icon -->
                      <div class="w-14 h-14 mx-auto mb-1.5 relative">
                        <div class="w-full h-full bg-slate-600/50 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                          <img 
                            v-if="getItemIcon(item)"
                            :src="getItemIcon(item)" 
                            :alt="item.name"
                            class="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                            @error="handleImageError($event, item)"
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
                        <div :style="getQualityColorSync(item.quality)" class="text-xs px-1 py-0.5 rounded-full font-bold">
                          {{ item.rarity || 'ธรรมดา' }}
                        </div>
                        <div class="text-slate-400 text-xs mt-0.5 capitalize">{{ item.category || 'ไอเทม' }}</div>
                      </div>
                    </div>
                    <div v-if="getPacketGameItems(selectedPacket).length > 16" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 text-center">
                      <span class="text-slate-400 text-sm">และอีก {{ getPacketGameItems(selectedPacket).length - 16 }} รายการ</span>
                    </div>
                  </div>
                </div>
                <div class="bg-slate-600/50 rounded-lg p-3">
                  <h4 class="text-slate-300 text-sm font-medium mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Equipment Items
                  </h4>
                  <div class="grid grid-cols-4 gap-2">
                    <div 
                      v-for="item in getPacketEquipmentItems(selectedPacket).slice(0, 16)" 
                      :key="'equipment-' + item.id"
                      class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1.5 hover:bg-slate-600/40 transition-all duration-200 group"
                      :title="`${item.name} (${item.equipment_type || 'อุปกรณ์'})`"
                    >
                      <!-- Equipment Icon -->
                      <div class="w-14 h-14 mx-auto mb-1.5 relative">
                        <div class="w-full h-full bg-slate-600/50 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                          <img 
                            v-if="getItemIcon(item)"
                            :src="getItemIcon(item)" 
                            :alt="item.name"
                            class="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                            @error="handleImageError($event, item)"
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
                      <!-- Equipment Info -->
                      <div class="text-center">
                        <div :style="getQualityColorSync(item.quality)" class="text-xs px-1 py-0.5 rounded-full font-bold">
                          {{ item.rarity || 'ธรรมดา' }}
                        </div>
                        <div class="text-slate-400 text-xs mt-0.5 capitalize">{{ item.equipment_type || 'อุปกรณ์' }}</div>
                      </div>
                    </div>
                    <div v-if="getPacketEquipmentItems(selectedPacket).length > 16" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-3 text-center">
                      <span class="text-slate-400 text-sm">และอีก {{ getPacketEquipmentItems(selectedPacket).length - 16 }} รายการ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Send Options -->
            <div class="space-y-4">
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">ประเภทการส่ง</label>
                <select 
                  v-model="sendForm.sendType"
                  @change="onSendTypeChange"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="single">ส่งให้ผู้เล่นคนเดียว</option>                  
                  <option value="global">ส่งให้ทุกคน (Global)</option>
                </select>
              </div>

              <!-- Single Player -->
              <div v-if="sendForm.sendType === 'single'">
                <label class="block text-slate-300 text-sm font-medium mb-2">Player ID</label>
                <input 
                  v-model="sendForm.playerId"
                  type="text"
                  placeholder="281475295236133"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
              </div>

              <!-- Multiple Players -->
              <div v-if="sendForm.sendType === 'multiple'">
                <label class="block text-slate-300 text-sm font-medium mb-2">Player IDs (แยกด้วยเครื่องหมายจุลภาค)</label>
                <textarea 
                  v-model="sendForm.playerIds"
                  rows="4"
                  placeholder="281475295236133, 281475295236134, 281475295236135"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <!-- Server Selection -->
              <div>
                <label class="block text-slate-300 text-sm font-medium mb-2">Server</label>
                <select 
                  v-model="sendForm.serverId"
                  class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Server 1</option>
                  <option value="2">Server 2</option>
                  <option value="3">Server 3</option>
                </select>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
              <button 
                type="button"
                @click="closeModal"
                class="px-6 py-2 bg-slate-600/50 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors duration-200"
              >
                ยกเลิก
              </button>
              <button 
                type="button"
                @click="confirmSend"
                :disabled="sending"
                class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg v-if="sending" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>{{ sending ? 'กำลังส่ง...' : 'ส่งอีเมล' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Create/Edit Email Packet Modal -->
        <div v-if="showCreateModal || showEditModal" class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="modal-content bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-white">
                {{ showEditModal ? 'แก้ไข Email Packet' : 'สร้าง Email Packet ใหม่' }}
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

            <form @submit.prevent="showEditModal ? updateEmailPacket() : createEmailPacket()">
              <!-- Basic Information Section -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                  📧 ข้อมูลพื้นฐาน
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-slate-300 text-sm font-medium mb-2">
                      📝 หัวข้ออีเมล
                    </label>
                    <input 
                      v-model="emailForm.title"
                      type="text" 
                      required
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="กรอกหัวข้ออีเมล"
                    >
                  </div>

                  <div class="md:col-span-2">
                    <label class="block text-slate-300 text-sm font-medium mb-2">
                      💬 เนื้อหาอีเมล
                      <span class="text-slate-400 text-xs ml-2">({{ emailForm.content.length }}/400)</span>
                    </label>
                    <textarea 
                      v-model="emailForm.content"
                      rows="4"
                      maxlength="400"
                      required
                      class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="กรอกเนื้อหาอีเมล"
                    ></textarea>
                    <div class="flex justify-between items-center mt-1">
                      <span class="text-xs text-slate-500">จำกัด 400 ตัวอักษร</span>
                      <span 
                        class="text-xs"
                        :class="emailForm.content.length > 400 ? 'text-red-400' : emailForm.content.length > 350 ? 'text-yellow-400' : 'text-slate-400'"
                      >
                        {{ emailForm.content.length }}/400
                      </span>
                    </div>
                  </div>

                  <!-- Email Rarity Selection -->
                  <div class="md:col-span-2">
                    <div class="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-6">
                      <div class="flex items-center mb-3">
                        <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                          <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                        <div>
                          <label class="block text-purple-300 text-base font-semibold">
                            ความหายากของอีเมล ⭐
                          </label>
                        </div>
                      </div>
                      <select 
                        v-model="emailForm.packet_rarity_name"
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
                        เลือกความหายากของอีเมลนี้
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Item Selection Section -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                  🎒 เลือกไอเท็มในอีเมล
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
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center relative shadow-lg">
                          <img 
                            v-if="getItemIcon(item)"
                            :src="getItemIcon(item)" 
                            :alt="item.name"
                            class="w-full h-full object-contain rounded-lg"
                            @error="handleImageError($event, item)"
                          >
                          <div v-else class="w-full h-full flex items-center justify-center">
                            <!-- Icon removed -->
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
                            <img 
                              v-if="getItemIcon(item)"
                              :src="getItemIcon(item)" 
                              :alt="item.name"
                              class="w-10 h-10 object-contain rounded-lg"
                              @error="handleImageError($event, item)"
                            >
                            <div v-else class="w-full h-full flex items-center justify-center">
                              <!-- Icon removed -->
                            </div>
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
                              <div class="w-16 h-16 mx-auto mb-3 relative">
                                <img 
                                  v-if="getItemIcon(item)"
                                  :src="getItemIcon(item)" 
                                  :alt="item.name"
                                  class="w-full h-full object-contain rounded-lg"
                                  @error="handleImageError($event, item)"
                                >
                                <div v-else class="w-full h-full flex items-center justify-center">
                                  <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                                  </svg>
                                </div>
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

                  <!-- Available Items Grid -->
                  <div v-if="!loadingItems" class="max-h-80 overflow-y-auto">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                  class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg"
                >
                  {{ showEditModal ? 'อัพเดท Email Packet' : 'สร้าง Email Packet' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Notification -->
        <div v-if="notification.show" :class="notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'" class="fixed top-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {{ notification.message }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import Navigation from './Navigation.vue'
import GameItemManager from '../utils/GameItemManager.js'
import GameEquipManager from '../utils/GameEquipManager.js'
import GameEquipService from '../services/GameEquipService.js'
import EmailService from '../services/EmailService.js'
import GameEquipQualityManager from '../utils/GameEquipQualityManager.js'

// Reactive Data
const emailPackets = ref([])
const loading = ref(false)
const sending = ref(false)

// Search and Filter
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')
const showSendModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedPacket = ref(null)
const editingPacket = ref(null)

// Send Form
const sendForm = reactive({
  sendType: 'single',
  playerId: '',
  playerIds: '',
  serverId: '1'
})

// Email Packet Form
const emailForm = reactive({
  title: '',
  content: '',
  packet_rarity_name: 'ทั่วไป',
  packet_rarity: '1',
  game_items: {
    items: []
  },
  equipment_items: {
    items: []
  }
})

// Item Selection (เหมือน PacketManagement)
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

// Current Selection Mode
const selectionMode = ref('equipment') // 'equipment' หรือ 'items'

// Computed Properties
const filteredEmailPackets = computed(() => {
  let filtered = [...emailPackets.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(packet => 
      packet.title.toLowerCase().includes(query) ||
      packet.content.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    if (statusFilter.value === 'active') {
      filtered = filtered.filter(packet => packet.is_active === 1 || packet.is_active === true)
    } else if (statusFilter.value === 'inactive') {
      filtered = filtered.filter(packet => packet.is_active === 0 || packet.is_active === false)
    }
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy.value) {
      case 'title':
        aValue = String(a.title || '').toLowerCase()
        bValue = String(b.title || '').toLowerCase()
        break
      case 'total_sent':
        aValue = Number(a.total_sent || 0)
        bValue = Number(b.total_sent || 0)
        break
      case 'updated_at':
        aValue = new Date(a.updated_at || 0)
        bValue = new Date(b.updated_at || 0)
        break
      case 'created_at':
      default:
        aValue = new Date(a.created_at || 0)
        bValue = new Date(b.created_at || 0)
        break
    }

    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return filtered
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return statusFilter.value !== '' || 
         sortBy.value !== 'created_at' ||
         sortOrder.value !== 'desc'
})

// Quality options from GameEquipQuality.json
const qualityOptions = ref({})

// Notification
const notification = reactive({
  show: false,
  message: '',
  type: 'success'
})

// Methods
const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  sortBy.value = 'created_at'
  sortOrder.value = 'desc'
}

const refreshData = async () => {
  await fetchEmailPackets()
  showNotification('ข้อมูลได้รับการอัพเดทแล้ว', 'success')
}

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

// Debounced search function
const debounceSearch = debounce(() => {
  // Search is handled by computed property
}, 300)

const fetchEmailPackets = async () => {
  loading.value = true
  try {
    
    
    const response = await EmailService.getEmailPackets({
      page: 1,
      limit: 50,
      sortBy: 'created_at',
      sortOrder: 'desc'
    })

    if (response.success) {
      emailPackets.value = response.data.data.packets || []            
    } else {
      console.error('❌ Failed to fetch email packets:', response.error)
      
      if (response.isNetworkError) {
        showNotification('⚠️ API server ไม่พร้อมใช้งาน ใช้ข้อมูลตัวอย่างแทน', 'error')
        console.log('🔄 Falling back to mock data...')
        emailPackets.value = getMockEmailPackets()
      } else {
        showNotification(`เกิดข้อผิดพลาด: ${response.error}`, 'error')
        emailPackets.value = getMockEmailPackets()
      }
    }
  } catch (error) {
    console.error('💥 Unexpected error fetching email packets:', error)
    showNotification('เกิดข้อผิดพลาดที่ไม่คาดคิด', 'error')
    // Fallback to mock data for development
    emailPackets.value = getMockEmailPackets()
  } finally {
    loading.value = false
  }
}

// Mock data fallback
const getMockEmailPackets = () => {
  return [
    {
      id: 1,
      title: 'Welcome Gift',
      content: 'ยินดีต้อนรับสู่เกม! นี่คือของขวัญต้อนรับสำหรับคุณ',
      is_active: true,
      total_sent: 156,
      updated_at: new Date().toISOString(),
      game_items: {
        items: [
          { id: Number(1001), quantity: 1000, name: 'Gold Coins' },
          { id: Number(1002), quantity: 50, name: 'Health Potions' }
        ]
      },
      equipment_items: {
        items: [
          { id: Number(2001), quantity: 1, quality: 5, name: 'Iron Sword' }
        ]
      }
    },
    {
      id: 2,
      title: 'Daily Reward',
      content: 'ของรางวัลประจำวันสำหรับผู้เล่นที่เข้าร่วมเกม',
      is_active: true,
      total_sent: 89,
      updated_at: new Date().toISOString(),
      game_items: {
        items: [
          { id: Number(1003), quantity: 500, name: 'Experience Points' }
        ]
      },
      equipment_items: {
        items: []
      }
    }
  ]
}

const getPacketItems = (packet) => {
  const gameItems = packet.game_items?.items || []
  const equipmentItems = packet.equipment_items?.items || []
  const allItems = [...gameItems, ...equipmentItems]
  
  // Debug: Log first few items to see their structure
  if (allItems.length > 0) {
    console.log('getPacketItems debug - First item:', allItems[0])
    console.log('getPacketItems debug - All items count:', allItems.length)
  }
  
  return allItems
}

const getPacketGameItems = (packet) => {
  return packet?.game_items?.items || []
}

const getPacketEquipmentItems = (packet) => {
  return packet?.equipment_items?.items || []
}

// Computed Properties (เหมือน PacketManagement)
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
    const idA = parseInt(String(a.id)) || 0
    const idB = parseInt(String(b.id)) || 0
    return idA - idB
  })

  return sorted
})

// Computed property for unique equipment types
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

// Computed property for unique item categories
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


const sendEmail = (packet) => {
  selectedPacket.value = packet
  showSendModal.value = true
}

const onSendTypeChange = () => {
  sendForm.playerId = ''
  sendForm.playerIds = ''
}

const confirmSend = async () => {
  try {
    sending.value = true
    
    // Prepare send data
    const sendData = {
      sendType: sendForm.sendType,
      serverId: sendForm.serverId
    }
    
    let response = null;
    if (sendForm.sendType === 'single') {
      sendData.useridlist = sendForm.playerId.split(',').map(id => id.trim()).filter(id => id)
      sendData.serverId = parseInt(sendForm.serverId)
      response = await EmailService.sendEmailPacket(selectedPacket.value.id, sendData)
    } else if (sendForm.sendType === 'global') {      
      sendData.serverId = parseInt(sendForm.serverId) 
      sendData.packetId = selectedPacket.value.id
      response = await EmailService.sendEmailGlobal(sendData)
    }
        
    
    
    if (response.success) {
      showNotification('ส่งอีเมลสำเร็จ!', 'success')
      closeModal()
      fetchEmailPackets() // Refresh the list
    } else {
      throw new Error(response.error || 'ไม่สามารถส่งอีเมลได้')
    }
  } catch (error) {
    console.error('Error sending email:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message}`, 'error')
  } finally {
    sending.value = false
  }
}

const editPacket = (packet) => {
  editingPacket.value = packet
  Object.assign(emailForm, {
    title: packet.title || '',
    content: packet.content || '',
    packet_rarity_name: packet.packet_rarity_name || 'ทั่วไป',
    packet_rarity: packet.packet_rarity || '1',
    game_items: packet.game_items || { items: [] },
    equipment_items: packet.equipment_items || { items: [] }
  })
  
  // Load selected items and equipment from packet
  selectedItems.value = [...(packet.game_items?.items || [])]
  selectedEquipment.value = [...(packet.equipment_items?.items || [])]
  
  showEditModal.value = true
}

const deletePacket = async (packet) => {
  if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบ "${packet.title}"?`)) return
  
  try {
    const response = await EmailService.deleteEmailPacket(packet.id)
    
    if (response.success) {
      showNotification('ลบ Email Packet สำเร็จ!', 'success')
      fetchEmailPackets() // Refresh the list
    } else {
      throw new Error(response.error || 'ไม่สามารถลบ Email Packet ได้')
    }
  } catch (error) {
    console.error('Error deleting email packet:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message}`, 'error')
  }
}

const createEmailPacket = async () => {
  try {
    // Format selected items
    const formattedGameItems = selectedItems.value.map(item => ({
      id: Number(item.id),
      name: item.name,
      quantity: item.quantity || 1,
    }))

    const formattedEquipmentItems = selectedEquipment.value.map(item => ({
      id: Number(item.id),
      name: item.name,
      quantity: item.quantity || 1,
      rarity: parseInt(emailForm.packet_rarity) || 1,
      quality: item.quality || 1,
      level: item.level || 1,
      equipment_type: item.equipment_type || 'unknown'
    }))

    // Prepare packet data for API
    const packetData = {
      title: emailForm.title.trim(),
      content: emailForm.content.trim(),
      packet_rarity: emailForm.packet_rarity || null,
      packet_rarity_name: emailForm.packet_rarity_name || null,
      game_items: {
        items: formattedGameItems
      },
      equipment_items: {
        items: formattedEquipmentItems
      },
      is_active: true
    }

    console.log('Creating email packet:', packetData)
    
    const response = await EmailService.createEmailPacket(packetData)
    
    if (response.success) {
      showNotification('สร้าง Email Packet สำเร็จ!', 'success')
      closeModal()
      fetchEmailPackets() // Refresh the list
    } else {
      throw new Error(response.error || 'ไม่สามารถสร้าง Email Packet ได้')
    }
  } catch (error) {
    console.error('Error creating email packet:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message}`, 'error')
  }
}

const updateEmailPacket = async () => {
  try {
    // Format selected items
    const formattedGameItems = selectedItems.value.map(item => ({
      id: Number(item.id),
      name: item.name,
      quantity: item.quantity || 1,
    }))

    const formattedEquipmentItems = selectedEquipment.value.map(item => ({
      id: Number(item.id),
      name: item.name,
      quantity: item.quantity || 1,
      rarity: parseInt(emailForm.packet_rarity) || 1,
      quality: item.quality || 1,
      level: item.level || 1,
      equipment_type: item.equipment_type || 'unknown'
    }))

    // Prepare packet data for API
    const packetData = {
      title: emailForm.title.trim(),
      content: emailForm.content.trim(),
      packet_rarity: emailForm.packet_rarity || null,
      packet_rarity_name: emailForm.packet_rarity_name || null,
      game_items: {
        items: formattedGameItems
      },
      equipment_items: {
        items: formattedEquipmentItems
      },
      is_active: true
    }

    console.log('Updating email packet:', editingPacket.value.id, packetData)
    
    const response = await EmailService.updateEmailPacket(editingPacket.value.id, packetData)
    
    if (response.success) {
      showNotification('อัพเดท Email Packet สำเร็จ!', 'success')
      closeModal()
      fetchEmailPackets() // Refresh the list
    } else {
      throw new Error(response.error || 'ไม่สามารถอัพเดท Email Packet ได้')
    }
  } catch (error) {
    console.error('Error updating email packet:', error)
    showNotification(`เกิดข้อผิดพลาด: ${error.message}`, 'error')
  }
}

const closeModal = () => {
  showSendModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedPacket.value = null
  editingPacket.value = null
  sendForm.sendType = 'single'
  sendForm.playerId = ''
  sendForm.playerIds = ''
  sendForm.serverId = '1'
  resetEmailForm()
  resetSelection()
}

const resetSelection = () => {
  selectedEquipment.value = []
  selectedItems.value = []
  equipmentFilter.value = 'all'
  equipmentLevelFilter.value = 'all'
  equipmentSearch.value = ''
  itemFilter.value = 'all'
  itemSearch.value = ''
  selectionMode.value = 'equipment'
  resetEquipmentPagination()
}

const resetEmailForm = () => {
  Object.assign(emailForm, {
    title: '',
    content: '',
    packet_rarity_name: 'ทั่วไป',
    packet_rarity: '1',
    game_items: { items: [] },
    equipment_items: { items: [] }
  })
}

// Helper functions (เหมือน PacketManagement)
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

const getLevelRange = (filter) => {
  switch (filter) {
    case '1-20': return { min: 1, max: 20 }
    case '21-40': return { min: 21, max: 40 }
    case '41-60': return { min: 41, max: 60 }
    case '61-80': return { min: 61, max: 80 }
    case '81-100': return { min: 81, max: 100 }
    case '101+': return { min: 101, max: 999 }
    default: return null
  }
}

const getQualityColor = async (quality) => {
  try {
    const colorHex = await GameEquipQualityManager.getQualityColor(quality)
    if (colorHex) {
      // Convert hex to RGB and create a CSS class
      const r = parseInt(colorHex.substr(0, 2), 16)
      const g = parseInt(colorHex.substr(2, 2), 16)
      const b = parseInt(colorHex.substr(4, 2), 16)
      return `background-color: rgb(${r}, ${g}, ${b}); color: white;`
    }
  } catch (error) {
    console.warn('Error getting quality color:', error)
  }
  return 'bg-gray-600 text-gray-200'
}

const getQualityColorSync = (quality) => {
  // Return the color directly based on quality from GameEquipQuality.json
  const qualityColors = {
    1: 'background-color: rgb(166, 154, 127); color: white;', // a69a7f - ทั่วไป
    2: 'background-color: rgb(155, 194, 87); color: white;',  // 9bc257 - ยอดเยี่ยม
    3: 'background-color: rgb(119, 124, 177); color: white;', // 777cb1 - ประณีต
    4: 'background-color: rgb(153, 86, 166); color: white;',  // 9956a6 - หายาก
    5: 'background-color: rgb(217, 170, 51); color: white;',  // d9aa33 - มหากาพย์
    6: 'background-color: rgb(209, 122, 36); color: white;',  // d17a24 - ในตำนาน
    7: 'background-color: rgb(206, 79, 51); color: white;',   // ce4f33 - เทพนิยาย
    8: 'background-color: rgb(78, 177, 194); color: white;',  // 4eb1c2 - สวรรค์ลงทัณฑ์
    9: 'background-color: rgb(216, 85, 119); color: white;'   // d85577 - ทำลายล้างโลก
  }
  return qualityColors[quality] || 'background-color: rgb(166, 154, 127); color: white;'
}

const getQualityName = (quality) => {
  // Return the quality name from GameEquipQuality.json
  const qualityNames = {
    1: 'ทั่วไป',
    2: 'ยอดเยี่ยม',
    3: 'ประณีต',
    4: 'หายาก',
    5: 'มหากาพย์',
    6: 'ในตำนาน',
    7: 'เทพนิยาย',
    8: 'สวรรค์ลงทัณฑ์',
    9: 'ทำลายล้างโลก'
  }
  return qualityNames[quality] || 'ทั่วไป'
}

// Handle rarity selection change
const onRarityChange = () => {
  // Find the ID for the selected rarity name
  const rarityEntry = Object.entries(qualityOptions.value).find(([id, quality]) => 
    quality.name === emailForm.packet_rarity_name
  )
  
  if (rarityEntry) {
    emailForm.packet_rarity = rarityEntry[0]
  } else {
    emailForm.packet_rarity = ''
  }
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

const getEquipmentBackground = async (quality) => {
  try {
    const bg = await GameEquipManager.getEquipBGByIdq(quality)    
    return bg
  } catch (error) {
    console.warn('Error getting equipment background:', error)
    return null
  }
}

const getEquipmentBackgroundSync = (quality) => {

  
  // Use the actual bg field from GameEquipQuality.json
  const qualityBackgrounds = {
    1: '/bundle/common/texture/img_zbtb_1.png', 
    2: '/bundle/common/texture/img_zbtb_2.png', 
    3: '/bundle/common/texture/img_zbtb_4.png', 
    4: '/bundle/common/texture/img_zbtb_5.png', 
    5: '/bundle/common/texture/img_zbtb_7.png', 
    6: '/bundle/common/texture/img_zbtb_8.png', 
    7: '/bundle/common/texture/img_zbtb_9.png', 
    8: '/bundle/common/texture/img_zbtb_3.png', 
    9: '/bundle/common/texture/img_zbtb_6.png' ,
    10: '/bundle/common/texture/img_zbtb_6.png'  
  }
  const bgPath = qualityBackgrounds[quality] || null
  
  return bgPath
}

// Equipment Methods
const fetchEquipment = async () => {
  loadingEquipment.value = true
  try {
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
          id: Number(item.id),
          name: item.name || `Equipment ${item.id}`,
          equipment_type: getEquipmentTypeByPos(item.pos),
          quality: Math.min(Math.floor((item.level || 1) / 2) + 1, 10), // Convert level to quality (1-10)
          level: item.level || 1,
          pos: item.pos,
          icon_url: GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function' ? GameEquipManager.getEquipIconByIdq(item.id, Math.min(Math.floor((item.level || 1) / 2) + 1, 10)) : null,
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
      
      
  
    } else {
      console.warn('No equipment data found')
      availableEquipment.value = []
    }
  } catch (error) {
    console.error('Error fetching equipment:', error)
    availableEquipment.value = []
  } finally {
    loadingEquipment.value = false
  }
}

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
          id: Number(item.id || 0),
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
      
      
      
    } else {
      
      availableItems.value = []
    }
  } catch (error) {
    
    availableItems.value = []
  } finally {
    loadingItems.value = false
  }
}

// Toggle functions
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

const updateItemQuantity = (itemId, quantity) => {
  const index = selectedItems.value.findIndex(item => item.id === itemId)
  if (index >= 0) {
    const newQuantity = parseInt(quantity) || 1
    selectedItems.value[index].quantity = Math.max(1, Math.min(99999999, newQuantity))
  }
}

// Selection mode change
const handleSelectionModeChange = (mode) => {
  selectionMode.value = mode
}

// Equipment pagination
const changeEquipmentPage = (page) => {
  if (page >= 1 && page <= equipmentPagination.totalPages) {
    equipmentPagination.currentPage = page
  }
}

const resetEquipmentPagination = () => {
  equipmentPagination.currentPage = 1
}

// Debounce search
let equipmentSearchTimeout = null
const debounceEquipmentSearch = () => {
  if (equipmentSearchTimeout) {
    clearTimeout(equipmentSearchTimeout)
  }
  equipmentSearchTimeout = setTimeout(() => {
    equipmentPagination.currentPage = 1
  }, 300)
}

const showNotification = (message, type = 'success') => {
  notification.show = true
  notification.message = message
  notification.type = type
  
  setTimeout(() => {
    notification.show = false
  }, 3000)
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('th-TH')
}

const getItemIcon = (item) => {
  try {
    if (!item) return null
    
    // If item already has icon_url, use it
    if (item.icon_url) {
      return item.icon_url
    }
    
    // Try to get icon by id or item_id (for packet items)
    const itemId = Number(item.id || item.item_id)
    if (itemId) {
      
      // Try GameItemManager first (if available)
      if (GameItemManager && typeof GameItemManager.getItemIcon === 'function') {
        try {
          const itemIcon = GameItemManager.getItemIcon(itemId)
          if (itemIcon) return itemIcon
        } catch (error) {
          console.warn('GameItemManager.getItemIcon error:', error)
        }
      }
      
      // Try GameEquipManager for equipment (if available)
      if (GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function') {
        try {
          const quality = item.quality || 1
          const equipIcon = GameEquipManager.getEquipIconByIdq(itemId, quality)
          if (equipIcon) return equipIcon
        } catch (error) {
          console.warn('GameEquipManager.getEquipIconByIdq error:', error)
        }
      }
    }
    
    // Try to get icon by id (for selected items)
    if (item.id) {
      const itemId = Number(item.id)
      
      // Try GameItemManager first (if available)
      if (GameItemManager && typeof GameItemManager.getItemIcon === 'function') {
        try {
          const itemIcon = GameItemManager.getItemIcon(itemId)
          if (itemIcon) return itemIcon
        } catch (error) {
          console.warn('GameItemManager.getItemIcon error:', error)
        }
      }
      
      // Try GameEquipManager for equipment (if available)
      if (GameEquipManager && typeof GameEquipManager.getEquipIconByIdq === 'function') {
        try {
          const quality = item.quality || 1
          const equipIcon = GameEquipManager.getEquipIconByIdq(itemId, quality)
          if (equipIcon) return equipIcon
        } catch (error) {
          console.warn('GameEquipManager.getEquipIconByIdq error:', error)
        }
      }
    }
    
  } catch (error) {
    console.warn('Error getting item icon:', error)
  }
  
  return null
}

const handleImageError = (event, item) => {
  console.log('Image error for item:', item.name)
  if (event && event.target) {
    event.target.style.display = 'none'
    const parent = event.target.parentElement
    if (parent) {
      const fallbackDiv = parent.querySelector('div[style*="display: none"]')
      if (fallbackDiv) {
        fallbackDiv.style.display = 'flex'
      }
    }
  }
}

// Check for data from other components
const checkForIncomingData = () => {
  // Check for preview data
  const previewData = localStorage.getItem('emailPacketPreview')
  if (previewData) {
    try {
      const data = JSON.parse(previewData)
      // Add to emailPackets for preview
      emailPackets.value.unshift({
        id: Date.now(), // Temporary ID
        title: data.title,
        content: data.content,
        is_active: true,
        total_sent: 0,
        game_items: data.game_items,
        equipment_items: data.equipment_items,
        isPreview: true
      })
      localStorage.removeItem('emailPacketPreview')
      showNotification('เพิ่ม Email Preview แล้ว', 'success')
    } catch (error) {
      console.error('Error parsing preview data:', error)
    }
  }
  
  // Check for actual data
  const packetData = localStorage.getItem('emailPacketData')
  if (packetData) {
    try {
      const data = JSON.parse(packetData)
      // Add to emailPackets
      emailPackets.value.unshift({
        id: Date.now(), // Temporary ID
        title: data.title,
        content: data.content,
        is_active: true,
        total_sent: 0,
        game_items: data.game_items,
        equipment_items: data.equipment_items
      })
      localStorage.removeItem('emailPacketData')
      showNotification('เพิ่ม Email Packet แล้ว', 'success')
    } catch (error) {
      console.error('Error parsing packet data:', error)
    }
  }
}

// Lifecycle
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
      if (emailForm.packet_rarity_name === 'ทั่วไป') {
        emailForm.packet_rarity = '1'
      }
    } else {
      console.warn('No quality data found')
    }
  } catch (error) {
    console.error('Error loading quality options:', error)
  }
}

onMounted(async () => {
  // Initialize managers
  try {
    // GameItemManager doesn't have initialize method, it's auto-initialized
    if (GameEquipManager && typeof GameEquipManager.initialize === 'function') {
      await GameEquipManager.initialize()
    }
    // Initialize GameEquipQualityManager
    if (GameEquipQualityManager && typeof GameEquipQualityManager.initialize === 'function') {
      await GameEquipQualityManager.initialize()
    }
    console.log('EmailManagement: Managers initialized')
  } catch (error) {
    console.error('Error initializing managers:', error)
  }
  
  // Load quality options
  await loadQualityOptions()
  
  // Fetch email packets
  await fetchEmailPackets()
  
  // Load equipment and items
  await Promise.all([
    fetchEquipment(),
    fetchItems()
  ])
  
  fetchEmailPackets()
  checkForIncomingData()
})
</script>

<style scoped>
.modal-overlay {
  backdrop-filter: blur(4px);
}

.modal-content {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>

