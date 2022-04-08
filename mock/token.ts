import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/token/test',
    method: 'get',
    response() {
      return {
        code: 401,
        message: '页面长时间未使用，请重新登录'
      }
    }
  }
] as MockMethod[]