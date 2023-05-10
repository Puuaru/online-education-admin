import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/acl/index/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/acl/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/acl/index/logout',
    method: 'post'
  })
}
