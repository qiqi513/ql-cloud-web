import axios from 'axios'
import store from '../store'
import router from '@/router/index'
import { getToken } from '@/utils/auth'
import {
  Message,
  MessageBox
} from 'element-ui';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress

NProgress.configure({ showSpinner: false })
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
  NProgress.start(); // start progress bar
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  if(router.currentRoute){
    let meta = router.currentRoute.meta;
    if(meta.funcId && config.params){
      config.params.funcId = meta.funcId;
    }
  }
  return config
}, (error) => {
   return Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use((response) => {
    NProgress.done();
    if (response.status == 200) {
      if(response.data.success){
        if(!response.data.data){
          Message.success("操作成功!")
        }
        return response.data;
      }else{
        Message.error("系统错误,请联系管理员!")
      }
    } else {
      return Promise.reject(response);
    }
  }, (error) => {
  NProgress.done();
  return Promise.reject(error)
  }
)

export default service
