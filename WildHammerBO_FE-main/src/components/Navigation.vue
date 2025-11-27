<template>
  <nav class="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 relative z-[10000]">
    <div class="flex items-center justify-between">
      <!-- Left: Logo and Brand -->
      <div class="flex items-center space-x-4">
        <router-link to="/dashboard" class="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm0 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm2 2v2H8v2h2v2h2v-2h2v-2h-2V9h-2zm6 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-white">Game Admin</h1>
        </router-link>
      </div>

      <!-- Center: Navigation Links -->
      <div class="flex-1 mx-8">
        <div class="relative z-[10001]">
          <!-- Toggle Button -->
          <button
            @click="toggleMenu"
            class="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-all duration-200 relative z-[10002]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <span class="font-medium">Menu</span>
            <svg 
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': isMenuOpen }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div 
            v-if="isMenuOpen"
            class="absolute top-full left-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl z-[10003] overflow-hidden"
          >
            <!-- Menu Items -->
            <div class="py-2">
              <router-link 
                to="/dashboard" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/dashboard' }"
              >
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                </svg>
                <span class="font-medium">Dashboard</span>
              </router-link>

              <router-link 
                to="/user-management" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/user-management' }"
              >
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span class="font-medium">Users</span>
              </router-link>

              <router-link 
                to="/ranking" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/ranking' }"
              >
                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span class="font-medium">Rankings</span>
              </router-link>

              <router-link 
                to="/packet-management" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/packet-management' }"
              >
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
                </svg>
                <span class="font-medium">Packets</span>
              </router-link>

              <router-link 
                to="/gacha-management" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/gacha-management' }"
              >
                <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"/>
                </svg>
                <span class="font-medium">Gacha</span>
              </router-link>

              <router-link 
                to="/email-management" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/email-management' }"
              >
                <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="font-medium">Email</span>
              </router-link>

              <router-link 
                to="/daily-rewards" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/daily-rewards' }"
              >
                <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="font-medium">Daily Rewards</span>
              </router-link>

              <router-link 
                to="/pool-prize-settings" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/pool-prize-settings' }"
              >
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <span class="font-medium">Pool Prize</span>
              </router-link>

              <router-link 
                to="/payments" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/payments' }"
              >
                <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <span class="font-medium">Payments</span>
              </router-link>

              <router-link 
                to="/admin-management" 
                @click="closeMenu"
                class="dropdown-link flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-all duration-200"
                :class="{ 'active': $route.path === '/admin-management' }"
              >
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
                <span class="font-medium">Admin</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: User Info and Logout -->
      <div class="flex items-center space-x-4">
        <!-- User Profile -->
        <div class="flex items-center space-x-3">
          <div class="text-right">
            <p class="text-sm font-medium text-white">{{ adminProfile?.username || 'Admin' }}</p>
            <p class="text-xs text-slate-400">{{ adminProfile?.role || 'Administrator' }}</p>
          </div>
          <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">
              {{ (adminProfile?.username || 'A').charAt(0).toUpperCase() }}
            </span>
          </div>
        </div>

        <!-- Logout Button -->
        <button 
          @click="handleLogout"
          class="flex items-center space-x-2 px-3 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const adminProfile = ref(null)
const isMenuOpen = ref(false)

const handleLogout = () => {
  // Clear authentication data
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminProfile')
  
  // Navigate to login page
  router.push('/login')
}

// Menu toggle functions
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (isMenuOpen.value && !event.target.closest('.relative')) {
    closeMenu()
  }
}

onMounted(() => {
  // Load admin profile from localStorage
  const profileData = localStorage.getItem('adminProfile')
  if (profileData) {
    try {
      adminProfile.value = JSON.parse(profileData)
    } catch (error) {
      console.error('Error parsing admin profile:', error)
    }
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // Remove click outside listener
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Dropdown menu styling */
.dropdown-link {
  color: #cbd5e1;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.dropdown-link:hover {
  color: white;
  background-color: rgba(51, 65, 85, 0.5);
  border-left-color: #3b82f6;
  transform: translateX(4px);
}

.dropdown-link.active {
  color: white;
  background: linear-gradient(to right, rgba(37, 99, 235, 0.2), rgba(147, 51, 234, 0.2));
  border-left-color: #3b82f6;
}

/* Menu animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Toggle button animation */
.rotate-180 {
  transform: rotate(180deg);
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Shadow effects */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>
