<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Daily Rewards Management</h1>
        <p class="text-slate-400">จัดการรางวัลประจำวันสำหรับผู้เล่น</p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-blue-300 text-sm font-medium">Total Rewards</p>
              <p class="text-2xl font-bold text-white">{{ statistics.total_rewards || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-green-600/20 to-green-700/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-green-300 text-sm font-medium">Active Rewards</p>
              <p class="text-2xl font-bold text-white">{{ statistics.active_rewards || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-yellow-300 text-sm font-medium">Total Tokens</p>
              <p class="text-2xl font-bold text-white">{{ statistics.total_tokens || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-purple-300 text-sm font-medium">Total Claims</p>
              <p class="text-2xl font-bold text-white">{{ statistics.total_claims || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 mb-6">
        <button 
          @click="showBulkCreateModal = true"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          สร้างหลายวัน
        </button>

        <button 
          @click="showCopyModal = true"
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          คัดลอกรางวัล
        </button>

        <button 
          @click="showClaimsModal = true"
          class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          ดูประวัติการรับรางวัล
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">สถานะ</label>
            <select v-model="filters.is_active" @change="fetchRewards" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">ทั้งหมด</option>
              <option value="1">เปิดใช้งาน</option>
              <option value="0">ปิดใช้งาน</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">หมายเลขวัน</label>
            <input 
              v-model="filters.day_number" 
              @input="fetchRewards"
              type="number" 
              placeholder="หมายเลขวัน"
              class="w-32 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>

          <div class="flex-1"></div>

          <button 
            @click="fetchRewards"
            class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            รีเฟรช
          </button>
        </div>
      </div>

      <!-- Rewards Table -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-700/50">
          <h3 class="text-lg font-medium text-white">รายการรางวัลประจำวัน</h3>
        </div>

        <div v-if="loading" class="p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <p class="mt-2 text-slate-400">กำลังโหลด...</p>
        </div>

        <div v-else-if="rewards.length === 0" class="p-8 text-center text-slate-400">
          <svg class="w-12 h-12 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p>ไม่พบข้อมูลรางวัล</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-700/50">
            <thead class="bg-slate-700/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วัน</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">รางวัล</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tokens</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">สถานะ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">จำนวนการรับ</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่สร้าง</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">การจัดการ</th>
              </tr>
            </thead>
            <tbody class="bg-slate-800/30 divide-y divide-slate-700/50">
              <tr v-for="reward in rewards" :key="reward.id" class="hover:bg-slate-700/30">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-400">{{ reward.day_number }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-slate-300">
                    <!-- Equipment Items -->
                    <div v-if="reward.reward_equipment && reward.reward_equipment.length > 0" class="mb-3">
                      <div class="flex items-center mb-2">
                        <svg class="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <h4 class="text-blue-300 text-sm font-semibold">อุปกรณ์ ({{ reward.reward_equipment.length }})</h4>
                      </div>
                      <div class="grid grid-cols-4 gap-1">
                        <div 
                          v-for="item in reward.reward_equipment.slice(0, 8)" 
                          :key="'eq-' + item.id"
                          class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1 hover:bg-slate-600/40 transition-all duration-200 group"
                          :title="`${getEquipmentNameById(item.id)} (Lv.${getEquipmentLevelById(item.id) || 1})`"
                        >
                          <!-- Equipment Icon -->
                          <div class="w-10 h-10 mx-auto mb-1 relative">
                            <div class="w-full h-full bg-slate-600/80 rounded-lg flex items-center justify-center">
                              <img 
                                v-if="getEquipmentIconById(item.id)"
                                :src="getEquipmentIconById(item.id)" 
                                :alt="getEquipmentNameById(item.id)"
                                class="w-8 h-8 object-contain rounded-lg"
                                @error="handleImageError($event, {id: item.id, name: getEquipmentNameById(item.id)})"
                              >
                              <svg v-else class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                              </svg>
                            </div>
                            <!-- Quantity Badge -->
                            <div class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold shadow-lg border border-white px-1">
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
                            <div :class="getQualityColor(getEquipmentQualityById(item.id))" class="text-xs px-1 py-0.5 rounded-full font-bold">
                              ★{{ getEquipmentQualityById(item.id) || 1 }}
                            </div>
                            <div class="text-slate-400 text-xs mt-0.5">Lv.{{ getEquipmentLevelById(item.id) || 1 }}</div>
                          </div>
                        </div>
                        <div v-if="reward.reward_equipment.length > 8" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-2 text-center">
                          <span class="text-slate-400 text-xs">และอีก {{ reward.reward_equipment.length - 8 }} รายการ</span>
                        </div>
                      </div>
                    </div>

                    <!-- Game Items -->
                    <div v-if="reward.reward_items && reward.reward_items.length > 0" class="mb-3">
                      <div class="flex items-center mb-2">
                        <svg class="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                        </svg>
                        <h4 class="text-green-300 text-sm font-semibold">ไอเทม ({{ reward.reward_items.length }})</h4>
                      </div>
                      <div class="grid grid-cols-4 gap-1">
                        <div 
                          v-for="item in reward.reward_items.slice(0, 8)" 
                          :key="'item-' + item.id"
                          class="relative bg-slate-700/30 border border-slate-600/50 rounded-lg p-1 hover:bg-slate-600/40 transition-all duration-200 group"
                          :title="`${getItemNameById(item.id)} (${getItemCategoryById(item.id) || 'ไอเทม'})`"
                        >
                          <!-- Item Icon -->
                          <div class="w-10 h-10 mx-auto mb-1 relative">
                            <div class="w-full h-full bg-slate-600/50 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
                              <img 
                                v-if="getItemIconById(item.id)"
                                :src="getItemIconById(item.id)" 
                                :alt="getItemNameById(item.id)"
                                class="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-110"
                                @error="handleImageError($event, {id: item.id, name: getItemNameById(item.id)})"
                              >
                              <div v-else class="w-full h-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                                </svg>
                              </div>
                              <!-- Gradient overlay for better contrast -->
                              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                            </div>
                            
                            <!-- Quantity Badge -->
                            <div class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold shadow-lg border border-white px-1">
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
                            <div :class="getRarityColor(getItemRarityById(item.id))" class="text-xs px-1 py-0.5 rounded-full font-bold">
                              {{ getItemRarityById(item.id) || 'ธรรมดา' }}
                            </div>
                            <div class="text-slate-400 text-xs mt-0.5 capitalize">{{ getItemCategoryById(item.id) || 'ไอเทม' }}</div>
                          </div>
                        </div>
                        <div v-if="reward.reward_items.length > 8" class="col-span-full bg-slate-700/20 border border-slate-600/30 rounded-lg p-2 text-center">
                          <span class="text-slate-400 text-xs">และอีก {{ reward.reward_items.length - 8 }} รายการ</span>
                        </div>
                      </div>
                    </div>

                    <!-- Empty State -->
                    <div v-if="(!reward.reward_equipment || reward.reward_equipment.length === 0) && (!reward.reward_items || reward.reward_items.length === 0)" class="text-center py-4 bg-slate-700/20 border border-slate-600/30 rounded-xl">
                      <svg class="w-8 h-8 text-slate-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5a2 2 0 012-2m14 0H4"/>
                      </svg>
                      <h4 class="text-slate-400 text-sm font-medium mb-1">ไม่มีรางวัล</h4>
                      <p class="text-slate-500 text-xs">ยังไม่ได้ตั้งค่ารางวัลสำหรับวันนี้</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {{ reward.reward_tokens || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="reward.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'" 
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ reward.is_active ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {{ reward.total_claims || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {{ formatDate(reward.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="editReward(reward)"
                      class="p-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200"
                      title="แก้ไขรางวัล"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button 
                      @click="toggleRewardStatus(reward)"
                      :class="reward.is_active ? 'p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-400 hover:text-red-300' : 'p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/20 text-green-400 hover:text-green-300'"
                      class="rounded-lg transition-all duration-200"
                      :title="reward.is_active ? 'ปิดรางวัล' : 'เปิดรางวัล'"
                    >
                      <svg v-if="reward.is_active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteReward(reward)"
                      class="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200"
                      title="ลบรางวัล"
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

      <!-- Edit Modal -->
      <div v-if="showEditModal" class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="modal-content bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">แก้ไขรางวัล</h2>
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

          <form @submit.prevent="saveReward">
            <!-- Basic Information Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                📋 ข้อมูลพื้นฐาน
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">
                    📅 หมายเลขวัน
                  </label>
                  <input 
                    v-model="form.day_number" 
                    type="number" 
                    required
                    disabled
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                </div>

                <div>
                  <label class="block text-slate-300 text-sm font-medium mb-2">
                    💰 Tokens
                  </label>
                  <input 
                    v-model="form.reward_tokens" 
                    type="number" 
                    step="0.01"
                    class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="ระบุจำนวน tokens"
                  >
                </div>

                <div class="md:col-span-2">
                  <div class="flex items-center">
                    <input 
                      v-model="form.is_active" 
                      type="checkbox" 
                      id="is_active"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-600 rounded bg-slate-700"
                    >
                    <label for="is_active" class="ml-2 block text-sm text-slate-300">เปิดใช้งาน</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reward Rarity Selection -->
            <div class="mb-8">
              <div class="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-6">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <label class="block text-purple-300 text-base font-semibold">
                      ความหายากของรางวัล ⭐
                    </label>
                  </div>
                </div>
                <select 
                  v-model="form.reward_rarity"
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
                  เลือกความหายากของรางวัลนี้
                </p>
              </div>
            </div>

            <!-- Item Selection Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                🎒 เลือกไอเทมในรางวัล
              </h3>

              <!-- Selected Items Display -->
              <div v-if="selectedItemsInfo.length > 0 || selectedEquipmentInfo.length > 0" class="mb-6">
                <div class="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 class="text-blue-300 text-sm font-medium mb-3 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    ไอเท็มที่เลือก ({{ selectedItemsInfo.length + selectedEquipmentInfo.length }} รายการ)
                  </h4>
                  
                  <!-- Selected Items -->
                  <div v-if="selectedItemsInfo.length > 0" class="mb-4">
                    <h5 class="text-green-300 text-xs font-medium mb-2">💎 ไอเท็ม & ทรัพยากร</h5>
                    <div class="space-y-2">
                      <div v-for="(item, index) in selectedItemsInfo" :key="`item-${item.id}`" class="flex items-center space-x-4 bg-slate-700/50 border border-slate-600/50 rounded-xl p-3">
                        <div class="w-10 h-10 rounded-lg bg-slate-600 flex items-center justify-center relative shadow-lg">
                          <img 
                            v-if="item.icon_url"
                            :src="item.icon_url" 
                            :alt="item.name"
                            class="w-full h-full object-contain rounded-lg"
                            @error="handleImageError($event, item)"
                          >
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                          <h4 class="text-white text-sm font-semibold break-words" :title="item.name">{{ item.name }}</h4>
                          <div class="flex flex-wrap items-center gap-1 text-xs">
                            <span class="capitalize text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{{ item.type || item.category || 'Item' }}</span>
                            <span v-if="item.rarity" :class="getRarityColor(item.rarity)" class="px-2 py-1 rounded-full font-bold whitespace-nowrap">{{ item.rarity }}</span>
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="text-center">
                            <label class="text-slate-400 text-xs font-medium block mb-1">จำนวน</label>
                            <input 
                              v-model.number="item.quantity"
                              @change="updateItemQuantity(item.id, item.quantity, 'items')"
                              type="number"
                              min="1"
                              max="99999999"
                              class="w-16 px-2 py-1 bg-slate-600/70 border border-slate-500 text-white rounded text-xs text-center font-semibold focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                          </div>
                          <button 
                            type="button"
                            @click="removeSelectedItem(item.id, 'items')"
                            class="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded transition-all duration-200"
                            title="ลบออก"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Selected Equipment -->
                  <div v-if="selectedEquipmentInfo.length > 0">
                    <h5 class="text-blue-300 text-xs font-medium mb-2">⚔️ อุปกรณ์</h5>
                    <div class="space-y-2">
                      <div v-for="(equipment, index) in selectedEquipmentInfo" :key="`equipment-${equipment.id}`" class="flex items-center space-x-4 bg-slate-700/50 border border-slate-600/50 rounded-xl p-3">
                        <div class="w-10 h-10 rounded-lg bg-slate-600 flex items-center justify-center relative shadow-lg">
                          <img 
                            v-if="equipment.icon_url"
                            :src="equipment.icon_url" 
                            :alt="equipment.name"
                            class="w-full h-full object-contain rounded-lg"
                            @error="handleImageError($event, equipment)"
                          >
                        </div>
                        <div class="flex-1 min-w-0 pr-2">
                          <h4 class="text-white text-sm font-semibold break-words" :title="equipment.name">{{ equipment.name }}</h4>
                          <div class="flex flex-wrap items-center gap-1 text-xs">
                            <span class="capitalize text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">{{ equipment.type || equipment.category || 'Equipment' }}</span>
                            <span v-if="equipment.level" class="text-slate-300 bg-slate-600 px-2 py-1 rounded-full whitespace-nowrap">Lv.{{ equipment.level }}</span>
                            <span v-if="equipment.quality" :class="getQualityColor(equipment.quality)" class="px-2 py-1 rounded-full font-bold whitespace-nowrap">★{{ equipment.quality }}</span>
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="text-center">
                            <label class="text-slate-400 text-xs font-medium block mb-1">จำนวน</label>
                            <input 
                              v-model.number="equipment.quantity"
                              @change="updateItemQuantity(equipment.id, equipment.quantity, 'equipment')"
                              type="number"
                              min="1"
                              max="99999999"
                              class="w-16 px-2 py-1 bg-slate-600/70 border border-slate-500 text-white rounded text-xs text-center font-semibold focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                          </div>
                          <button 
                            type="button"
                            @click="removeSelectedItem(equipment.id, 'equipment')"
                            class="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-1 rounded transition-all duration-200"
                            title="ลบออก"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                          </button>
                        </div>
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
                          @click.stop="toggleEquipment(item, $event)"
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

                <!-- Available Items Grid -->
                <div v-if="!loadingItems" class="max-h-80 overflow-y-auto">
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    <!-- Available Items -->
                    <div 
                      v-for="item in filteredItems" 
                      :key="`available-item-${item.id}`"
                      :class="isItemSelected(item.id) ? 'ring-3 ring-green-400 bg-green-600/20 scale-105 shadow-lg shadow-green-500/25' : 'hover:bg-slate-600/50 hover:scale-105 hover:shadow-lg'"
                      class="cursor-pointer bg-slate-800/60 rounded-xl p-4 border border-slate-600/50 transition-all duration-300 hover:border-slate-500"
                      @click.stop
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
                        <!-- Select Button -->
                        <button 
                          type="button"
                          @click.stop="selectItem(item, $event)"
                          :class="isItemSelected(item.id) ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'"
                          class="w-full px-3 py-1 text-white rounded text-xs font-medium transition-colors"
                        >
                          {{ isItemSelected(item.id) ? 'ยกเลิก' : 'เลือก' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

      <!-- Bulk Create Modal -->
      <div v-if="showBulkCreateModal" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border border-slate-700 w-11/12 md:w-1/2 shadow-lg rounded-md bg-slate-800">
          <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">สร้างรางวัลหลายวัน</h3>
              <button @click="showBulkCreateModal = false" class="text-slate-400 hover:text-slate-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form @submit.prevent="bulkCreateRewards" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">จำนวนวัน</label>
                <input 
                  v-model="bulkForm.totalDays" 
                  type="number" 
                  required
                  min="1"
                  max="30"
                  class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">วันที่เริ่มต้น</label>
                <input 
                  v-model="bulkForm.startDate" 
                  type="date" 
                  required
                  class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  @click="showBulkCreateModal = false"
                  class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  :disabled="saving"
                  class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {{ saving ? 'กำลังสร้าง...' : 'สร้าง' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Copy Modal -->
      <div v-if="showCopyModal" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border border-slate-700 w-11/12 md:w-1/2 shadow-lg rounded-md bg-slate-800">
          <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">คัดลอกรางวัล</h3>
              <button @click="showCopyModal = false" class="text-slate-400 hover:text-slate-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form @submit.prevent="copyRewards" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">วันที่เริ่มต้น (จาก)</label>
                <input 
                  v-model="copyForm.fromStartDate" 
                  type="date" 
                  required
                  class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">วันที่สิ้นสุด (จาก)</label>
                <input 
                  v-model="copyForm.fromEndDate" 
                  type="date" 
                  required
                  class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1">วันที่เริ่มต้น (ไป)</label>
                <input 
                  v-model="copyForm.toStartDate" 
                  type="date" 
                  required
                  class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div class="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  @click="showCopyModal = false"
                  class="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  :disabled="saving"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {{ saving ? 'กำลังคัดลอก...' : 'คัดลอก' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Claims Modal -->
      <div v-if="showClaimsModal" class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-10 mx-auto p-5 border border-slate-700 w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-slate-800">
          <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-white">ประวัติการรับรางวัล</h3>
              <button @click="showClaimsModal = false" class="text-slate-400 hover:text-slate-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Claims Filters -->
            <div class="bg-slate-700/30 p-4 rounded-lg mb-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1">Role ID</label>
                  <input 
                    v-model="claimsFilters.roleid" 
                    type="text"
                    placeholder="Role ID"
                    class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1">หมายเลขวัน</label>
                  <input 
                    v-model="claimsFilters.day_number" 
                    type="number"
                    placeholder="หมายเลขวัน"
                    class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1">วันที่เริ่มต้น</label>
                  <input 
                    v-model="claimsFilters.date_from" 
                    type="date"
                    class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1">วันที่สิ้นสุด</label>
                  <input 
                    v-model="claimsFilters.date_to" 
                    type="date"
                    class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button 
                  @click="fetchClaims"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ค้นหา
                </button>
              </div>
            </div>

            <!-- Claims Table -->
            <div v-if="claimsLoading" class="p-8 text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <p class="mt-2 text-slate-400">กำลังโหลด...</p>
            </div>

            <div v-else-if="claims.length === 0" class="p-8 text-center text-slate-400">
              <p>ไม่พบข้อมูลการรับรางวัล</p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-700/50">
                <thead class="bg-slate-700/50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วัน</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">รางวัล</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">วันที่รับ</th>
                  </tr>
                </thead>
                <tbody class="bg-slate-800/30 divide-y divide-slate-700/50">
                  <tr v-for="claim in claims" :key="claim.id" class="hover:bg-slate-700/30">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{{ claim.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{{ claim.roleid }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-400">{{ claim.day_number }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-slate-300">
                        <div v-if="claim.reward_items && claim.reward_items.length > 0" class="mb-1">
                          <span class="font-medium text-slate-200">Items:</span>
                          <span v-for="(item, index) in claim.reward_items" :key="index" class="ml-1 text-slate-300">
                            ID{{ item.item_id }}({{ item.quantity }})
                            <span v-if="index < claim.reward_items.length - 1">, </span>
                          </span>
                        </div>
                        <div v-if="claim.reward_equipment && claim.reward_equipment.length > 0">
                          <span class="font-medium text-slate-200">Equipment:</span>
                          <span v-for="(equip, index) in claim.reward_equipment" :key="index" class="ml-1 text-slate-300">
                            ID{{ equip.equipment_id }}({{ equip.quantity }})
                            <span v-if="index < claim.reward_equipment.length - 1">, </span>
                          </span>
                        </div>
                        <div v-if="claim.reward_tokens">
                          <span class="font-medium text-slate-200">Tokens:</span> {{ claim.reward_tokens }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {{ formatDate(claim.claimed_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import DailyRewardsService from '../services/DailyRewardsService.js'
import Navigation from './Navigation.vue'
import GameItemManager from '../utils/GameItemManager.js'
import GameEquipService from '../services/GameEquipService.js'
import GameEquipManager from '../utils/GameEquipManager.js'

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

// Reactive data
const loading = ref(false)
const saving = ref(false)
const rewards = ref([])
const statistics = ref({})
const claims = ref([])
const claimsLoading = ref(false)

// Modal states
const showEditModal = ref(false)
const showBulkCreateModal = ref(false)
const showCopyModal = ref(false)
const showClaimsModal = ref(false)

// Filters
const filters = reactive({
  is_active: '',
  day_number: ''
})

const claimsFilters = reactive({
  roleid: '',
  day_number: '',
  date_from: '',
  date_to: ''
})

// Forms
const form = reactive({
  day_number: '',
  reward_items: [],
  reward_equipment: [],
  reward_tokens: 0,
  is_active: true,
  reward_items_json: '',
  reward_equipment_json: '',
  selected_items: [], // Array of selected items
  selected_equipment: [], // Array of selected equipment
  reward_rarity: '', // Reward rarity
  reward_rarity_id: '' // Reward rarity ID
})

// Item search and selection
const itemSearch = ref('')
const equipmentSearch = ref('')
const availableItems = ref([])
const availableEquipment = ref([])
const selectionMode = ref('equipment') // 'equipment' or 'items'

// Quality options from GameEquipQuality.json
const qualityOptions = ref({})

// Equipment filters
const equipmentFilter = ref('all')
const equipmentLevelFilter = ref('all')
const loadingEquipment = ref(false)

// Item filters
const itemFilter = ref('all')
const loadingItems = ref(false)

// Equipment pagination
const equipmentPagination = reactive({
  currentPage: 1,
  itemsPerPage: 24,
  totalItems: 0,
  totalPages: 0
})

const bulkForm = reactive({
  totalDays: 7,
  startDate: ''
})

const copyForm = reactive({
  fromStartDate: '',
  fromEndDate: '',
  toStartDate: ''
})

// Methods
const fetchRewards = async () => {
  try {
    loading.value = true
    const response = await DailyRewardsService.getAllRewards(filters)
    rewards.value = response.data || []
  } catch (error) {
    console.error('Error fetching rewards:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูลรางวัล')
  } finally {
    loading.value = false
  }
}

const fetchStatistics = async () => {
  try {
    const response = await DailyRewardsService.getStatistics()
    statistics.value = response.data || {}
  } catch (error) {
    console.error('Error fetching statistics:', error)
  }
}

const fetchClaims = async () => {
  try {
    claimsLoading.value = true
    const response = await DailyRewardsService.getAllClaims(claimsFilters)
    claims.value = response.data || []
  } catch (error) {
    console.error('Error fetching claims:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูลการรับรางวัล')
  } finally {
    claimsLoading.value = false
  }
}

const saveReward = async () => {
  try {
    saving.value = true
    
    // Validate selected items
    if (form.selected_items.length === 0 && form.selected_equipment.length === 0) {
      alert('กรุณาเลือกไอเท็มอย่างน้อย 1 รายการ')
      return
    }
    
    // Prepare reward data from selected items
    const rewardItems = form.selected_items.map(item => ({
      id: parseInt(item.id),
      quantity: item.quantity || 1
    }))
    
    const rewardEquipment = form.selected_equipment.map(equipment => ({
      id: parseInt(equipment.id),
      quantity: equipment.quantity || 1,
      rarity: parseInt(form.reward_rarity_id) || 1
    }))
    
    const payload = {
      day_number: parseInt(form.day_number),
      reward_items: rewardItems,
      reward_equipment: rewardEquipment,
      reward_tokens: parseFloat(form.reward_tokens) || 0,
      is_active: form.is_active ? 1 : 0,
      reward_rarity: form.reward_rarity || null,
      reward_rarity_id: form.reward_rarity_id || null
    }
    
    // Update existing reward
    await DailyRewardsService.updateReward(form.day_number, payload)
    
    closeModal()
    fetchRewards()
    fetchStatistics()
  } catch (error) {
    console.error('Error saving reward:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    saving.value = false
  }
}

const bulkCreateRewards = async () => {
  try {
    saving.value = true
    
    const payload = {
      totalDays: parseInt(bulkForm.totalDays),
      startDate: bulkForm.startDate
    }
    
    await DailyRewardsService.bulkCreateRewards(payload)
    
    alert(`สร้างรางวัล ${bulkForm.totalDays} วันสำเร็จ`)
    showBulkCreateModal.value = false
    fetchRewards()
    fetchStatistics()
  } catch (error) {
    console.error('Error bulk creating rewards:', error)
    alert('เกิดข้อผิดพลาดในการสร้างรางวัลหลายวัน')
  } finally {
    saving.value = false
  }
}

const copyRewards = async () => {
  try {
    saving.value = true
    
    const payload = {
      fromStartDate: copyForm.fromStartDate,
      fromEndDate: copyForm.fromEndDate,
      toStartDate: copyForm.toStartDate
    }
    
    const response = await DailyRewardsService.copyRewards(payload)
    
    alert(`คัดลอกรางวัลสำเร็จ ${response.data.copied_rewards} รายการ`)
    showCopyModal.value = false
    fetchRewards()
    fetchStatistics()
  } catch (error) {
    console.error('Error copying rewards:', error)
    alert('เกิดข้อผิดพลาดในการคัดลอกรางวัล')
  } finally {
    saving.value = false
  }
}

const editReward = (reward) => {
  form.day_number = reward.day_number
  form.reward_tokens = reward.reward_tokens || 0
  form.is_active = reward.is_active === 1
  form.reward_rarity = reward.reward_rarity || ''
  form.reward_rarity_id = reward.reward_rarity_id || ''
  
  // Load selected items from reward data
  form.selected_items = []
  form.selected_equipment = []
  
  // Load items
  if (reward.reward_items && reward.reward_items.length > 0) {
    form.selected_items = reward.reward_items.map(item => ({
      id: item.id.toString(),
      quantity: item.quantity || 1
    }))
  }
  
  // Load equipment
  if (reward.reward_equipment && reward.reward_equipment.length > 0) {
    form.selected_equipment = reward.reward_equipment.map(equipment => ({
      id: equipment.id.toString(),
      quantity: equipment.quantity || 1
    }))
  }
  
  showEditModal.value = true
}

const toggleRewardStatus = async (reward) => {
  try {
    await DailyRewardsService.toggleRewardStatus(reward.day_number)
    
    alert('เปลี่ยนสถานะรางวัลสำเร็จ')
    fetchRewards()
    fetchStatistics()
  } catch (error) {
    console.error('Error toggling reward status:', error)
    alert('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ')
  }
}

const deleteReward = async (reward) => {
  if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบรางวัลวันที่ ${reward.day_number}?`)) {
    return
  }
  
  try {
    await DailyRewardsService.deleteReward(reward.day_number)
    
    alert('ลบรางวัลสำเร็จ')
    fetchRewards()
    fetchStatistics()
  } catch (error) {
    console.error('Error deleting reward:', error)
    alert('เกิดข้อผิดพลาดในการลบรางวัล')
  }
}

// Computed properties for item selection
const combinedItems = computed(() => {
  const items = [...availableItems.value]
  const equipment = availableEquipment.value.map(eq => ({
    ...eq,
    type: 'equipment',
    category: eq.equipment_type || 'equipment'
  }))
  return [...items, ...equipment]
})

const selectedItemsInfo = computed(() => {
  const items = []
  form.selected_items.forEach(item => {
    const itemInfo = combinedItems.value.find(i => i.id === item.id)
    if (itemInfo) {
      items.push({ ...itemInfo, quantity: item.quantity })
    }
  })
  return items
})

const selectedEquipmentInfo = computed(() => {
  const equipment = []
  form.selected_equipment.forEach(eq => {
    const eqInfo = combinedItems.value.find(i => i.id === eq.id)
    if (eqInfo) {
      equipment.push({ ...eqInfo, quantity: eq.quantity })
    }
  })
  return equipment
})

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

const closeModal = () => {
  showEditModal.value = false
  
  // Reset form
  form.day_number = ''
  form.reward_tokens = 0
  form.is_active = true
  form.selected_items = []
  form.selected_equipment = []
  form.reward_rarity = ''
  form.reward_rarity_id = ''
  
  // Reset search and filters
  itemSearch.value = ''
  equipmentSearch.value = ''
  equipmentFilter.value = 'all'
  equipmentLevelFilter.value = 'all'
  itemFilter.value = 'all'
  selectionMode.value = 'equipment'
}

// Item selection methods
const handleSelectionModeChange = (mode) => {
  selectionMode.value = mode
  // Don't clear selected item when switching modes - let user keep their selection
}

const toggleEquipment = (item, event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  const existingIndex = form.selected_equipment.findIndex(eq => eq.id === item.id)
  if (existingIndex >= 0) {
    form.selected_equipment.splice(existingIndex, 1)
  } else {
    form.selected_equipment.push({
      id: item.id,
      quantity: 1
    })
  }
}

const selectItem = (item, event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  const existingIndex = form.selected_items.findIndex(i => i.id === item.id)
  if (existingIndex >= 0) {
    form.selected_items.splice(existingIndex, 1)
  } else {
    form.selected_items.push({
      id: item.id,
      quantity: 1
    })
  }
}

const removeSelectedItem = (itemId, type) => {
  if (type === 'items') {
    const index = form.selected_items.findIndex(item => item.id === itemId)
    if (index >= 0) {
      form.selected_items.splice(index, 1)
    }
  } else if (type === 'equipment') {
    const index = form.selected_equipment.findIndex(eq => eq.id === itemId)
    if (index >= 0) {
      form.selected_equipment.splice(index, 1)
    }
  }
}

const updateItemQuantity = (itemId, quantity, type) => {
  if (type === 'items') {
    const item = form.selected_items.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  } else if (type === 'equipment') {
    const equipment = form.selected_equipment.find(eq => eq.id === itemId)
    if (equipment) {
      equipment.quantity = quantity
    }
  }
}

const isEquipmentSelected = (itemId) => {
  return form.selected_equipment.some(eq => eq.id === itemId)
}

const isItemSelected = (itemId) => {
  return form.selected_items.some(item => item.id === itemId)
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
  const rarityColors = {
    'common': 'background-color: rgb(166, 154, 127); color: white;',
    'uncommon': 'background-color: rgb(30, 255, 0); color: white;',
    'rare': 'background-color: rgb(0, 112, 255); color: white;',
    'epic': 'background-color: rgb(163, 53, 238); color: white;',
    'legendary': 'background-color: rgb(255, 128, 0); color: white;',
    'mythic': 'background-color: rgb(255, 0, 0); color: white;'
  }
  return rarityColors[rarity] || 'background-color: rgb(166, 154, 127); color: white;'
}

const handleImageError = (event, item) => {
  console.log('Image error for item:', item.name, 'URL:', event.target.src)
  if (event && event.target) {
    event.target.style.display = 'none'
    
    const parent = event.target.parentElement
    if (parent) {
      const fallbackSvg = parent.querySelector('svg')
      if (fallbackSvg) {
        fallbackSvg.style.display = 'block'
      }
    }
  }
}

const debounceEquipmentSearch = debounce(() => {
  equipmentPagination.currentPage = 1
}, 300)

const getItemNameById = (itemId) => {
  if (!itemId) return 'Unknown Item'
  const item = availableItems.value.find(item => item && item.id && item.id.toString() === itemId.toString())
  return item ? item.name : `Item ${itemId}`
}

const getEquipmentNameById = (equipmentId) => {
  if (!equipmentId) return 'Unknown Equipment'
  const equipment = availableEquipment.value.find(eq => eq && eq.id && eq.id.toString() === equipmentId.toString())
  return equipment ? equipment.name : `Equipment ${equipmentId}`
}

const getEquipmentIconById = (equipmentId) => {
  if (!equipmentId) return null
  const equipment = availableEquipment.value.find(eq => eq && eq.id && eq.id.toString() === equipmentId.toString())
  return equipment ? getEquipmentIcon(equipment) : null
}

const getEquipmentLevelById = (equipmentId) => {
  if (!equipmentId) return 1
  const equipment = availableEquipment.value.find(eq => eq && eq.id && eq.id.toString() === equipmentId.toString())
  return equipment ? equipment.level : 1
}

const getEquipmentQualityById = (equipmentId) => {
  if (!equipmentId) return 1
  const equipment = availableEquipment.value.find(eq => eq && eq.id && eq.id.toString() === equipmentId.toString())
  return equipment ? equipment.quality : 1
}

const getItemIconById = (itemId) => {
  if (!itemId) return null
  const item = availableItems.value.find(item => item && item.id && item.id.toString() === itemId.toString())
  return item ? item.icon_url : null
}

const getItemCategoryById = (itemId) => {
  if (!itemId) return 'ไอเทม'
  const item = availableItems.value.find(item => item && item.id && item.id.toString() === itemId.toString())
  return item ? item.category : 'ไอเทม'
}

const getItemRarityById = (itemId) => {
  if (!itemId) return 'ธรรมดา'
  const item = availableItems.value.find(item => item && item.id && item.id.toString() === itemId.toString())
  return item ? item.rarity : 'ธรรมดา'
}



// Handle rarity selection change
const onRarityChange = () => {
  // Find the ID for the selected rarity name
  const rarityEntry = Object.entries(qualityOptions.value).find(([id, quality]) => 
    quality.name === form.reward_rarity
  )
  
  if (rarityEntry) {
    form.reward_rarity_id = rarityEntry[0]
  } else {
    form.reward_rarity_id = ''
  }
}

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
      if (form.reward_rarity === 'ทั่วไป') {
        form.reward_rarity_id = '1'
      }
    } else {
      console.warn('No quality data found')
    }
  } catch (error) {
    console.error('Error loading quality options:', error)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Fetch items and equipment
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

// Initialize
onMounted(() => {
  fetchRewards()
  fetchStatistics()
  fetchItemsAndEquipment()
  loadQualityOptions()
  
  // Set default start date for bulk create
  const today = new Date()
  bulkForm.startDate = today.toISOString().split('T')[0]
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
