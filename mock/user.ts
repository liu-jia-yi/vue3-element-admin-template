import type { MockMethod } from 'vite-plugin-mock'

const tokens: { [index: string]: string } = {
  admin: 'admin-token',
  editor: 'editor-token'
}

const users: { [index: string]: any } = {
  'admin-token': {
    roles: ['admin'],
    name: 'Admin'
  },
  'editor-token': {
    roles: ['editor'],
    name: 'Editor'
  }
}

export default [
  {
    url: '/user/login',
    method: 'post',
    response({ body }: any) {
      const { username } = body
      const token = tokens[username]

      if (!token) {
        return {
          code: 400,
          message: '用户名或密码错误'
        }
      } else {
        return {
          code: 200,
          data: token
        }
      }
    }
  },
  {
    url: '/user/info',
    method: 'get',
    response(config: any) {
      const { token } = config.query
      const data = users[token]

      return {
        code: 200,
        data
      }
    }
  }
] as MockMethod[]