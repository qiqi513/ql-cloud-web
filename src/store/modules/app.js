import Cookies from 'js-cookie'
import {setStore, getStore, removeStore} from '@/utils/store'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    visitedViews: getStore({name: 'visitedViews'}) || []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.meta.title, path: view.path })
      setStore({
        name: 'visitedViews',
        content: state.visitedViews,
        type: 'session'
      })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
      removeStore({name: 'visitedViews'})
      setStore({
        name: 'visitedViews',
        content: state.visitedViews,
        type: 'session'
      })
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    addVisitedViews: ({ commit,state }, view) => {
      return new Promise((resolve) => {
        commit('ADD_VISITED_VIEWS', view);
        resolve([...state.visitedViews])
      })

    },
    delVisitedViews: ({ commit, state }, view)=> {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
