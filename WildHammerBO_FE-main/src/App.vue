<template>
  <div class="app">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg">Loading...</p>
      </div>
    </div>

    <!-- Main App with Router -->
    <div v-else>
      <!-- Debug: Force logout button (remove in production) -->
      <!-- <div v-if="isAuthenticated" class="fixed top-4 right-4 z-50">
        <button @click="handleLogout" class="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded transition-colors">
          Force Logout (Debug)
        </button>
      </div> -->
      
      <!-- Router View - All components will be rendered here -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetcher } from '../service/fetcher.js'

const router = useRouter()

// Reactive data
const isAuthenticated = ref(false)
const isLoading = ref(true)

// Methods
const handleLogout = () => {
  // Clear authentication data
  localStorage.removeItem('adminToken')
  localStorage.removeItem('adminProfile')
  
  // Update authentication state
  isAuthenticated.value = false
  
  // Navigate to login page
  router.push('/login')
}

const checkAuthStatus = () => {
  const token = localStorage.getItem('adminToken')
  if (token) {   
    verifyToken(token)
  } else {
    isAuthenticated.value = false
    isLoading.value = false
    router.push('/login')
  }
}

const verifyToken = async (token) => {
  try {
    const response = await fetcher('/auth/profile')
    
    if (response) {
      isAuthenticated.value = true
      // If on login page and authenticated, redirect to dashboard
      if (router.currentRoute.value.path === '/login') {
        router.push('/dashboard')
      }
    } else {
      // Token is invalid, clear it
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminProfile')
      isAuthenticated.value = false
      router.push('/login')
    }
  } catch (error) {
    // Network error or server down, clear token and show login
    console.log('Backend not available, clearing token and showing login')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminProfile')
    isAuthenticated.value = false
    router.push('/login')
  } finally {
    isLoading.value = false
  }
}

// Watch for authentication changes
watch(isAuthenticated, (newValue) => {
  if (newValue && router.currentRoute.value.path === '/login') {
    router.push('/dashboard')
  } else if (!newValue && router.currentRoute.value.path !== '/login') {
    router.push('/login')
  }
})

// Lifecycle
onMounted(() => {
  console.log('App mounted, checking auth status...')
  checkAuthStatus()
})

// Make isAuthenticated available globally for router guards
window.isAuthenticated = isAuthenticated
</script>

<style>
/* Global styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f172a;
  color: white;
}

.app {
  min-height: 100vh;
}
</style>