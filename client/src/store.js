import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeTasks: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    logout(state) {
      state.user = {}
    },
    getLists(state, data) {
      state.activeLists = data
    },
    getTasks(state, data) {
      let list = data.listId
      state.activeTasks[list] = data
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({
      commit,
      dispatch
    }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({
            name: 'boards'
          })
        })
    },
    authenticate({
      commit,
      dispatch
    }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({
            name: 'boards'
          })
        })
        .catch(res => {
          router.push({
            name: 'login'
          })
        })
    },
    login({
      commit,
      dispatch
    }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({
            name: 'boards'
          })
        })
    },
    logout({
      commit,
      dispatch
    }) {
      auth.delete('/logout').then(res => {
        commit('logout')
        router.push({
          name: 'login'
        })
      })
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({
      commit,
      dispatch
    }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({
      commit,
      dispatch
    }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({
      commit,
      dispatch
    }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    getLists({
      commit,
      dispatch
    }, id) {
      api.get('lists/boards/' + id).then(res => {
        console.log(res)
        commit('getLists', res.data)
      })
    },
    addList({
      commit,
      dispatch
    }, data) {
      api.post('lists/boards/' + data.boardId, data.title).then(res => {
        dispatch('getLists', data.boardId)
      })
    },
    deleteList({
      commit,
      dispatch
    }, data) {
      api.delete('lists/' + data.listId).then(res => {
        dispatch('getLists', data.boardId)
      })
    },


    //#endregion
    getTasks({
      commit,
      dispatch
    }, id) {
      api.get('tasks/' + id).then(res => {
        debugger
        commit('getTasks', res.data)
      })
    }
  }
})