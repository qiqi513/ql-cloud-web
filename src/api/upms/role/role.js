import request from '@/utils/request'


export function listPage(params) {
  params.opType = "查询角色";
  return request({
    url: '/upms/upmsRole/listPage',
    method: 'get',
    params: params
  })
}

export function page(params) {
  params.opType = "查询角色";
  return request({
    url: '/upms/upmsRole/page',
    method: 'get',
    params: params
  })
}

export function all() {
  return request({
    url: '/upms/upmsRole/all',
    method: 'get',
    params:  {
      opType : "查询角色",
    }
  })
}

export function save(data) {
  return request({
    url: '/upms/upmsRole',
    method: 'post',
    data:data,
    params: {
      opType : "新增角色",
    }
  })
}

export function update(data) {
  return request({
    url: '/upms/upmsRole',
    method: 'put',
    data:data,
    params: {
      opType : "编辑角色",
    }
  })
}

export function remove(id) {
  return request({
    url: '/upms/upmsRole/'+id,
    method: 'delete',
    params: {
      opType : "删除角色"
    }
  })
}


