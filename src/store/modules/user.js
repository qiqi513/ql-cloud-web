import {login, logout} from '@/api/auth/login/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    userId: '',
    token: getToken(),
    name: '',

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, realName) => {
      state.name = realName
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    }
  },
  actions: {
    // 登录
    Login({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user.username,user.password).then(result => {
            setToken(result.access_token);
            commit('SET_TOKEN', result.access_token);
            resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_FUNC_DATA', []);
          removeToken();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


  }
};

export default user
