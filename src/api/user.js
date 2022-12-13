import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: 'admin/index/login',
    method: 'post',
    // data
    data:{
      account:data.username,
      pwd:data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/index/logout',
    method: 'post'
  })
}
