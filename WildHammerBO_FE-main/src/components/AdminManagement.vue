<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Navigation Header -->
    <Navigation />
    
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <button @click="$emit('back')" class="p-2 text-slate-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-white">Admin Management</h1>
          <p class="text-slate-400">Manage admin users, roles, and permissions</p>
        </div>
      </div>
      <button @click="showCreateAdminForm = true" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>Add Admin</span>
        </div>
      </button>
    </div>

    <!-- Profile Card -->
    <div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
      <div class="flex items-center space-x-6">
        <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span class="text-2xl font-bold text-white">{{ currentAdmin.username?.charAt(0).toUpperCase() }}</span>
        </div>
        <div>
          <h3 class="text-xl font-bold text-white">{{ currentAdmin.username }}</h3>
          <p class="text-purple-300 font-medium capitalize">{{ currentAdmin.role?.replace('_', ' ') }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm text-green-400">Active</span>
            </div>
            <div class="text-sm text-slate-400">
              {{ currentAdmin.permissions?.length || 0 }} permissions
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Permission Test Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 class="text-lg font-semibold text-white mb-4">Permission Testing</h3>
      <p class="text-slate-400 text-sm mb-4">Test your current permissions and role access</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button @click="testPermission('admin-only')" class="p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 transition-all duration-300 text-left">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-white font-medium">Admin Access</h4>
              <p class="text-slate-400 text-sm">Test admin role</p>
            </div>
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </button>

        <button @click="testPermission('super-admin-only')" class="p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 transition-all duration-300 text-left">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-white font-medium">Super Admin</h4>
              <p class="text-slate-400 text-sm">Test super admin</p>
            </div>
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </button>

        <button @click="testPermission('user-management')" class="p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 transition-all duration-300 text-left">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-white font-medium">User Management</h4>
              <p class="text-slate-400 text-sm">Test user perms</p>
            </div>
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
        </button>

        <button @click="testPermission('reports')" class="p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg border border-slate-600/50 transition-all duration-300 text-left">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-white font-medium">Reports</h4>
              <p class="text-slate-400 text-sm">Test report access</p>
            </div>
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- Test Results -->
      <div v-if="testResults.length > 0" class="mt-6 space-y-2">
        <h4 class="text-white font-medium">Test Results:</h4>
        <div class="space-y-2">
          <div v-for="result in testResults" :key="result.test" class="flex items-center justify-between p-3 rounded-lg" :class="result.success ? 'bg-green-900/30 border border-green-700/50' : 'bg-red-900/30 border border-red-700/50'">
            <div class="flex items-center space-x-3">
              <svg v-if="result.success" class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <span class="text-white">{{ result.test }}</span>
            </div>
            <span :class="result.success ? 'text-green-400' : 'text-red-400'" class="text-sm font-medium">
              {{ result.success ? 'PASS' : 'FAIL' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Roles & Permissions Info -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Roles -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 class="text-lg font-semibold text-white mb-4">System Roles</h3>
        <div class="space-y-4">
          <div class="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-purple-400 font-semibold">Super Admin</h4>
              <span class="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">Highest</span>
            </div>
            <p class="text-slate-400 text-sm">Full system access, can manage all admins and settings</p>
          </div>

          <div class="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-blue-400 font-semibold">Admin</h4>
              <span class="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">High</span>
            </div>
            <p class="text-slate-400 text-sm">System administration with specific permissions</p>
          </div>

          <div class="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-green-400 font-semibold">Moderator</h4>
              <span class="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded-full">Medium</span>
            </div>
            <p class="text-slate-400 text-sm">Content moderation and user management</p>
          </div>

          <div class="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-yellow-400 font-semibold">Viewer</h4>
              <span class="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded-full">Limited</span>
            </div>
            <p class="text-slate-400 text-sm">Read-only access to reports and data</p>
          </div>
        </div>
      </div>

      <!-- Permissions -->
      <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <h3 class="text-lg font-semibold text-white mb-4">Available Permissions</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
              <div>
                <p class="text-white font-medium">user_management</p>
                <p class="text-slate-400 text-sm">Manage user accounts</p>
              </div>
            </div>
            <span v-if="hasPermission('user_management')" class="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>

          <div class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
              </svg>
              <div>
                <p class="text-white font-medium">gift_codes</p>
                <p class="text-slate-400 text-sm">Manage gift codes</p>
              </div>
            </div>
            <span v-if="hasPermission('gift_codes')" class="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>

          <div class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <div>
                <p class="text-white font-medium">reports</p>
                <p class="text-slate-400 text-sm">Access reports</p>
              </div>
            </div>
            <span v-if="hasPermission('reports')" class="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>

          <div class="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <div>
                <p class="text-white font-medium">system_settings</p>
                <p class="text-slate-400 text-sm">System configuration</p>
              </div>
            </div>
            <span v-if="hasPermission('system_settings')" class="w-2 h-2 bg-green-400 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Admin Modal -->
    <div v-if="showCreateAdminForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" @click.self="showCreateAdminForm = false">
      <div class="bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700/50">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">Create New Admin</h3>
          <button @click="showCreateAdminForm = false" class="text-slate-400 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createAdmin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input v-model="newAdmin.username" required class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input v-model="newAdmin.password" type="password" required class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <select v-model="newAdmin.role" required class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div class="flex space-x-4 pt-4">
            <button type="button" @click="showCreateAdminForm = false" class="flex-1 px-4 py-2 bg-slate-600/50 hover:bg-slate-500/50 text-white rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="isCreatingAdmin" class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-colors disabled:opacity-50">
              {{ isCreatingAdmin ? 'Creating...' : 'Create Admin' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message" class="fixed bottom-4 right-4 max-w-sm z-50">
      <div :class="message.type === 'success' ? 'bg-green-900/90 border-green-700/50 text-green-300' : 'bg-red-900/90 border-red-700/50 text-red-300'" class="p-4 rounded-xl border backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <svg v-if="message.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm">{{ message.text }}</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigation from './Navigation.vue'
import { fetcher } from '../../service/fetcher.js'

// Emits
defineEmits(['back'])

// Reactive data
const currentAdmin = ref({
  username: 'admin',
  role: 'super_admin',
  permissions: ['user_management', 'gift_codes', 'reports', 'system_settings']
})

const testResults = ref([])
const showCreateAdminForm = ref(false)
const isCreatingAdmin = ref(false)
const message = ref(null)

const newAdmin = ref({
  username: '',
  password: '',
  role: 'admin'
})

// Methods
const fetchAdminProfile = async () => {
  try {
    const data = await fetcher('/auth/profile')
    currentAdmin.value = data.data
  } catch (error) {
    console.error('Error fetching admin profile:', error)
  }
}

const testPermission = async (permissionType) => {
  try {
    const data = await fetcher(`/auth/${permissionType}`)
    
    const result = {
      test: permissionType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      success: true
    }
    
    // Add or update test result
    const existingIndex = testResults.value.findIndex(r => r.test === result.test)
    if (existingIndex >= 0) {
      testResults.value[existingIndex] = result
    } else {
      testResults.value.push(result)
    }
    
    showMessage(
      result.success ? 'success' : 'error',
      `${result.test}: ${result.success ? 'Access granted' : 'Access denied'}`
    )
  } catch (error) {
    console.error('Error testing permission:', error)
    showMessage('error', 'Error testing permission')
  }
}

const createAdmin = async () => {
  isCreatingAdmin.value = true
  try {
    const data = await fetcher('/auth/register', {
      method: 'POST',
      body: JSON.stringify(newAdmin.value)
    })
    
    showCreateAdminForm.value = false
    resetNewAdmin()
    showMessage('success', 'Admin created successfully')
  } catch (error) {
    console.error('Error creating admin:', error)
    showMessage('error', 'Error creating admin')
  } finally {
    isCreatingAdmin.value = false
  }
}

const resetNewAdmin = () => {
  newAdmin.value = {
    username: '',
    password: '',
    role: 'admin'
  }
}

const hasPermission = (permission) => {
  return currentAdmin.value.permissions?.includes(permission) || false
}

const showMessage = (type, text) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 3000)
}

// Lifecycle
onMounted(() => {
  fetchAdminProfile()
})
</script>
