import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LayoutIndex from '@/components/LayoutIndex.vue'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { markRaw } from 'vue'

/**
 * 静态路由，与权限无关，所有用户都可以访问
 * hidden: true，不显示在菜单中
 * alwaysShow: true，默认当子路由只有一个时，只显示子菜单，当 alwayShow 设为 true时，永远显示该菜单
 * meta.breadcrumb = false 表示该菜单的标题不显示在面包屑中
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404Page.vue'),
    hidden: true
  },
  {
    path: '/',
    component: LayoutIndex,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/nest',
    component: LayoutIndex,
    meta: { title: '路由嵌套' },
    children: [
      {
        path: 'nest1',
        component: () => import('@/views/MenuSecond.vue'),
        // alwaysShow: true,
        meta: {
          title: '菜单1',
          // breadcrumb: false
        },
        children: [
          {
            path: 'nest1-1',
            component: () => import('@/views/MenuThird.vue'),
            meta: { title: '菜单1-1' }
          },
          {
            path: 'nest1-2',
            component: () => import('@/views/MenuThird.vue'),
            meta: { title: '菜单1-2' }
          }
        ]
      },
      {
        path: 'nest2',
        component: () => import('@/views/MenuSecond.vue'),
        meta: { title: '菜单2' }
      }
    ]
  },
  {
    path: '/token',
    component: LayoutIndex,
    children: [
      {
        path: '',
        component: () => import('@/views/TokenExpired.vue'),
        meta: { title: '登录过期' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '404',
    hidden: true
  }
]

/**
 * 动态路由，配置了 roles 的路由，只有用户拥有该角色时可以访问
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: markRaw(LayoutIndex),
    redirect: '/permission/page',
    alwaysShow: true,
    meta: { title: '权限测试', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'page',
        component: () => import('@/views/PagePermission.vue'),
        meta: { title: '页面权限', roles: ['admin'] }
      },
      {
        path: 'button',
        component: () => import('@/views/ButtonPermission.vue'),
        meta: { title: '按钮权限' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

/**
 * 每次切换路由前执行
 * 如果没有 token，跳转到登录页
 * 如果有 token，进一步判断是否有角色，有角色就进入路由
 * 如果没有角色就获取角色，然后根据获取到的角色过滤动态路由
 * 最终将过滤后的动态路由添加到路由表中
 */
router.beforeEach((to) => {
  const token = sessionStorage.getItem('token')
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  if (token) {
    if (to.path === '/login') {
      return '/'
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0

      if (!hasRoles) {
        return userStore.getUserInfo().then(({ roles }) => {
          const accessedRoutes = permissionStore.generateRoutes(roles)
          accessedRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          return to.fullPath
        })
      }
    }
  } else {
    if (to.path !== '/login') {
      return '/login'
    }
  }
})

export default router
