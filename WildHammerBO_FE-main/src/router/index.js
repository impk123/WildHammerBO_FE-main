import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import PaymentManagement from '../components/PaymentManagement.vue'
import AdminManagement from '../components/AdminManagement.vue'
import UserManagement from '../components/UserManagement.vue'
import RankingSystem from '../components/RankingSystem.vue'
import PacketManagement from '../components/PacketManagement.vue'
import GachaManagement from '../components/GachaManagement.vue'
import EmailManagement from '../components/EmailManagement.vue'
import DailyRewardsAdmin from '../components/DailyRewardsAdmin.vue'
import PoolPrizeSettings from '../components/PoolPrizeSettings.vue'

// Auth guard function
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

// Guest guard function (for login page)
const requireGuest = (to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    next()
  } else {
    next('/dashboard')
  }
}

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireGuest,
    meta: {
      title: 'Login - Admin System'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth,
    meta: {
      title: 'Dashboard - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: PaymentManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'Payment Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/admin-management',
    name: 'AdminManagement',
    component: AdminManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'Admin Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'User Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/ranking',
    name: 'RankingSystem',
    component: RankingSystem,
    beforeEnter: requireAuth,
    meta: {
      title: 'Ranking System - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/packet-management',
    name: 'PacketManagement',
    component: PacketManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'Packet Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/gacha-management',
    name: 'GachaManagement',
    component: GachaManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'Gacha Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/email-management',
    name: 'EmailManagement',
    component: EmailManagement,
    beforeEnter: requireAuth,
    meta: {
      title: 'Email Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/daily-rewards',
    name: 'DailyRewardsAdmin',
    component: DailyRewardsAdmin,
    beforeEnter: requireAuth,
    meta: {
      title: 'Daily Rewards Management - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/pool-prize-settings',
    name: 'PoolPrizeSettings',
    component: PoolPrizeSettings,
    beforeEnter: requireAuth,
    meta: {
      title: 'Pool Prize Settings - Admin System',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    return { top: 0 }
  }
})

// Global navigation guard for additional security
router.beforeEach((to, from, next) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Additional auth check for protected routes
  if (to.meta.requiresAuth && !localStorage.getItem('adminToken')) {
    next('/login')
  } else {
    next()
  }
})

export default router
