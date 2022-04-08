import request from '@/utils/request'

export default {
  testToken() {
    return request({
      url: '/token/test',
      method: 'get'
    })
  }
}