import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    id:''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  //
  SET_ID: (state, id) => {
    state.id = id
  },
  //
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('login',response);
        const { data } = response
        commit('SET_TOKEN', data.token)
        // commit('SET_TOKEN',data.X-token)
        setToken(data.token)
        //--------------------------------
        commit('SET_NAME',data.name)
        localStorage.setItem('name',data.name);
        commit('SET_ID',data.id)
        localStorage.setItem('id',data.admin_id)
        //--------------------------------
        // setToken(data.X-token);
        localStorage.setItem('auth_id',data.auth_ids);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          // return reject('Verification failed, please Login again.')
          return reject('验证失败，请重新登录')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // localStorage.removeItem('ax-token');
      logout(state.token).then(() => {
        console.log(8);
        removeToken() // must remove  token  first
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

