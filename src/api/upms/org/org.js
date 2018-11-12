import request from '@/utils/request'


export function tree(params) {
  return request({
    url: '/upms/upmsOrg/getTree',
    method: 'get',
    params:  {
      opType : "查询组织",
    }
  })
}

export function page(params) {
  params.opType = "查询组织";
  return request({
    url: '/upms/upmsOrg/page',
    method: 'get',
    params: params
  })
}

export function all() {
  return request({
    url: '/upms/upmsOrg/all',
    method: 'get',
    params:  {
      opType : "查询组织",
    }
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/upms/upmsOrg/saveOrUpdate',
    method: 'post',
    data:JSON.stringify(data),
    params: {
      opType : "新增或者修改组织",
    }
  })
}

export function save(data) {
  return request({
    url: '/upms/upmsOrg',
    method: 'post',
    data:data,
    params: {
      opType : "新增组织",
    }
  })
}

export function update(data) {
  return request({
    url: '/upms/upmsOrg',
    method: 'put',
    data:data,
    params: {
      opType : "编辑组织",
    }
  })
}

export function remove(id) {
  return request({
    url: '/upms/upmsOrg/'+id,
    method: 'delete',
    params: {
      opType : "删除组织"
    }
  })
}


