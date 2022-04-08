import { constantRoutes, asyncRoutes } from '@/router';
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    accessedRoutes: []
  }),
  getters: {
    routes: (state) => [...constantRoutes, ...state.accessedRoutes]
  },
  actions: {
    hasPermission(roles: string[], route: any) {
      if (route.meta && route.meta.roles) {
        return roles.some((role: any) => route.meta.roles.includes(role))
      } else {
        return true
      }
    },

    filterAsyncRoutes(routes: any, roles: string[]) {
      const res: any = []
      routes.forEach((route: any) => {
        const tmp = {...route}
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles)
          }
          res.push(tmp)
        }
      })
      return res
    },

    // 根据角色过滤动态路由
    // 如果角色包含 admin，则拥有全部路由权限
    generateRoutes(roles: string[]) {
      if (roles.includes('admin')) {
        this.accessedRoutes = asyncRoutes as any || []
      } else {
        this.accessedRoutes = this.filterAsyncRoutes(asyncRoutes, roles)
      }
      return this.accessedRoutes
    }
  }


})