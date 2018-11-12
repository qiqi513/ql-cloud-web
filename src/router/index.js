import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout';
const _import = require('./_import');

Vue.use(Router);

export const baseRouterMap = [

  {
    path: '/', component: Layout, redirect: '/index', name: '首页', hidden: true,
    children: [
      {path: 'index', component: _import('index/index')}
    ]
  },
  {path: '/login', component: _import('login/login'), hidden: true},
  { path: '/upms', component: Layout, name: 'upms', meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        path: 'org', component: _import('upms/org/org'),
        name: 'org',meta: { title: '组织管理', icon: 'table' }
      },
      {
        path: 'user', component: _import('upms/user/user'),
        name: 'user',meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'role', component: _import('upms/role/role'),
        name: 'role',meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'menu', component: _import('upms/menu/menu'),
        name: 'menu',meta: { title: '菜单管理', icon: 'table' }
      }
    ]
  }
];


export default new Router({
  routes: baseRouterMap
})
