import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权


const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next()
      NProgress.done();
      // store.dispatch('GetInfo').then(res => { // 拉取 info
      //   if (validateNull(store.state.func.funcData)) {
      //     // 加载栏目
      //     store.dispatch("GetFuncByUserType", {userType: res.data.userType}).then(funcData => {
      //       initFunc(router, funcData);
      //       next({ ...to, replace: true })
      //     });
      //   } else {
      //     next();
      //   }
      // }).catch(err => {
      //   store.dispatch('LogOut').then(() => {
      //     next({
      //       path: '/login'
      //     });
      //     NProgress.done();
      //   })
      // });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});
