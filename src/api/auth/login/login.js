import request from '@/utils/request'


export function login(username,password) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params:  {
      client_id:'qiqi',
      client_secret:'qiqi',
      grant_type:'password',
      username:username,
      password:password
    }
  })
}

export function logout(accessToken) {
  return request({
    url: '/auth/authentication/removeToken',
    method: 'post',
    params: {
      accessToken:accessToken
    }
  })
}



