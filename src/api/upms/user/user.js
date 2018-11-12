import request from '@/utils/request'


export function listPage(params) {
  params.opType = "查询用户";
  return request({
    url: '/upms/upmsUser/listPage',
    method: 'get',
    params: params
  })
}

export function page(params) {
  params.opType = "查询用户";
  return request({
    url: '/upms/upmsUser/page',
    method: 'get',
    params: params
  })
}

export function all() {
  return request({
    url: '/upms/upmsUser/all',
    method: 'get',
    params:  {
      opType : "查询用户",
    }
  })
}

export function save(data) {
  return request({
    url: '/upms/upmsUser',
    method: 'post',
    data:data,
    params: {
      opType : "新增用户",
    }
  })
}

export function update(data) {
  return request({
    url: '/upms/upmsUser',
    method: 'put',
    data:data,
    params: {
      opType : "编辑用户",
    }
  })
}

export function remove(id) {
  return request({
    url: '/upms/upmsUser/'+id,
    method: 'delete',
    params: {
      opType : "删除用户"
    }
  })
}


