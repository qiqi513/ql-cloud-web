import request from '@/utils/request'


export function listTree() {
  return request({
    url: '/upms/upmsMenu/listTree',
    method: 'get',
    params:  {
      opType : "查询栏目",
    }
  })
}

export function saveOrUpdate(data) {
  return request({
    url: '/upms/upmsMenu/saveOrUpdate',
    method: 'post',
    data:JSON.stringify(data),
    params: {
      opType : "新增或者修改栏目",
    }
  })
}
export function remove(id) {
  return request({
    url: '/upms/upmsMenu/'+id,
    method: 'delete',
    params: {
      opType : "删除栏目"
    }
  })
}


