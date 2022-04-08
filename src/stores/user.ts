import { defineStore } from 'pinia';
import userAPI from '@/api/user'
import router from '@/router/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: sessionStorage.getItem('token'),
    roles: [],
    name: '',
  }),
  actions: {
    // 登录成功后将返回的 token 存起来
    login({ username, password }: any) {
      return userAPI.login({ username, password }).then((res: any) => {
        const { data } = res
        this.token = data
        sessionStorage.setItem('token', data)
      })
    },

    getUserInfo() {
      return userAPI.getUserInfo(this.token as string).then(({ data }: any) => {
        this.roles = data.roles
        this.name = data.name
        return data
      })
    },

    // 清空 token 和角色并跳转到登录页
    logout() {
      this.token = ''
      this.roles = []
      sessionStorage.removeItem('token')
      router.push('/login')
    }
  }
})