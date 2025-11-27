<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 w-full h-full">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-3/4 left-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
    
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
    
    <div class="relative z-10 bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700/50">
      <!-- Game Admin Logo/Icon -->
      <div class="text-center mb-10">
        <div class="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
          <!-- Game Controller Icon -->
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm0 2h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm2 2v2H8v2h2v2h2v-2h2v-2h-2V9h-2zm6 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <!-- Glow Effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-30 -z-10"></div>
        </div>
        <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Game Admin
        </h2>
        <p class="text-slate-400 text-sm">Access your idle game control panel</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Input -->
        <div class="relative group">
          <label class="text-slate-300 text-sm font-medium mb-2 block">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input 
              v-model="email" 
              id="email" 
              type="email" 
              required 
              class="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="relative group">
          <label class="text-slate-300 text-sm font-medium mb-2 block">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              required 
              class="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-white placeholder-slate-400 backdrop-blur-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Login Button -->
        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-4 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 mt-8 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
          :disabled="isLoading"
        >
          <div v-if="isLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Authenticating...
          </div>
          <div v-else class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Access Control Panel
          </div>
        </button>
      </form>

      <!-- Error Message -->
      <div v-if="error" class="mt-6 p-4 bg-red-900/50 border border-red-700/50 rounded-xl backdrop-blur-sm">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-red-300 text-sm">{{ error }}</p>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="success" class="mt-6 p-4 bg-green-900/50 border border-green-700/50 rounded-xl backdrop-blur-sm">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-green-300 text-sm">{{ success }}</p>
        </div>
      </div>

      <!-- Additional Links -->
      <div class="mt-8 space-y-4">
        <div class="text-center">
          <a href="#" class="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Forgot your admin key?
          </a>
        </div>

        <div class="border-t border-slate-700/50 pt-4">
          <div class="text-center">
            <p class="text-slate-500 text-xs mb-2">Need access permissions?</p>
            <a href="#" class="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-200 flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Contact Super Admin
            </a>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center border-t border-slate-700/50 pt-6">
        <p class="text-slate-500 text-xs">
          Idle Game Admin System v2.0
        </p>
        <p class="text-slate-600 text-xs mt-1">
          Secure • Powerful • Efficient
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetcher } from '../../service/fetcher.js'

const router = useRouter()

const email = ref('admin@example.com')
const password = ref('admin123')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

// Animation on mount
onMounted(() => {
  // Add some entrance animation or initialization if needed
})

async function handleLogin() {
  error.value = ''
  success.value = ''
  isLoading.value = true
  
  const user = { email: email.value, password: password.value }
 
  try {

    // Call the login API using fetcher
    const data = await fetcher('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(user)
    })
    

    if (data.success) {
      success.value = 'Login successful!'
      
      // Store authentication data
      localStorage.setItem('adminToken', data.token)
      if (data.admin) {
        localStorage.setItem('adminProfile', JSON.stringify(data.admin))
      }
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      throw new Error(data.message || 'Login failed')
    }
  } catch (err) {
    error.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom grid pattern */
.bg-grid-white\/\[0\.02\] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.02)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
}

/* Additional animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Hover effects for inputs */
.group:hover input {
  border-color: rgba(59, 130, 246, 0.3);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
