import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from './router';

Vue.use(Vuex);

let base = window.location.host.includes('localhost:8080') ?
  'http://localhost:3000/' :
  '/';

let auth = Axios.create({
  baseURL: base + 'auth/',
  timeout: 3000,
  withCredentials: true
});

let api = Axios.create({
  baseURL: base + 'api/',
  timeout: 6000,
  withCredentials: true
});

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
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    logout(state) {
      state.user = {};
    },
    getLists(state, data) {
      state.activeLists = data;
    },
    clearTasks(state) {
      state.activeTasks = {};
    },
    getTasks(state, data) {
      Vue.set(state.activeTasks, data.listId, data.tasks);
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    register({
      commit,
      dispatch
    }, newUser) {
      auth.post('register', newUser).then(res => {
        commit('setUser', res.data);
        router.push({
          name: 'boards'
        });
      });
    },
    authenticate({
      commit,
      dispatch
    }) {
      auth
        .get('authenticate')
        .then(res => {
          commit('setUser', res.data);
          router.push({
            name: 'boards'
          });
        })
        .catch(res => {
          router.push({
            name: 'login'
          });
        });
    },
    login({
      commit,
      dispatch
    }, creds) {
      auth.post('login', creds).then(res => {
        commit('setUser', res.data);
        router.push({
          name: 'boards'
        });
      });
    },
    logout({
      commit,
      dispatch
    }) {
      auth.delete('/logout').then(res => {
        commit('logout');
        router.push({
          name: 'login'
        });
      });
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({
      commit,
      dispatch
    }) {
      api.get('boards').then(res => {
        commit('setBoards', res.data);
      });
    },
    addBoard({
      commit,
      dispatch
    }, boardData) {
      api.post('boards', boardData).then(serverBoard => {
        dispatch('getBoards');
      });
    },
    deleteBoard({
      commit,
      dispatch
    }, boardId) {
      api.delete('boards/' + boardId).then(res => {
        dispatch('getBoards');
      });
    },
    //#endregion

    //#region -- LISTS --
    getLists({
      commit,
      dispatch
    }, id) {
      api.get('lists/boards/' + id).then(res => {
        commit('getLists', res.data);
        res.data.forEach(list => {
          dispatch('getTasks', list._id);
        });
      });
    },
    addList({
      commit,
      dispatch
    }, data) {
      api.post('lists/boards/' + data.boardId, data.title).then(res => {
        dispatch('getLists', data.boardId);
      });
    },
    deleteList({
      commit,
      dispatch
    }, data) {
      api.delete('lists/' + data.listId).then(res => {
        dispatch('getLists', data.boardId);
      });
    },

    //#endregion

    //#region -- Tasks --
    clearTasks({
      commit
    }) {
      commit('clearTasks');
    },

    getTasks({
      commit,
      dispatch
    }, id) {
      api.get('tasks/lists/' + id).then(res => {
        commit('getTasks', {
          listId: id,
          tasks: res.data
        });
      });
    },
    addTask({
      commit,
      dispatch
    }, data) {
      api.post('tasks/lists/' + data.listId, data.data).then(res => {
        dispatch('getTasks', data.listId);
      });
    },
    deleteTask({
      commit,
      dispatch
    }, data) {
      api.delete('tasks/' + data.taskId).then(res => {
        dispatch('getTasks', data.listId);
      });
    },
    editTask({
      commit,
      dispatch
    }, data) {
      api.put('tasks/' + data.taskId, data.description).then(res => {
        dispatch('getTasks', data.listId);
      });
    },
    taskDrop({
      commit,
      dispatch
    }, newData) {
      let data = {
        listId: newData.newListId,
        sortVal: newData.sortVal || 0
      };
      api.put('tasks/' + newData.task._id, data).then(res => {
        api.get('tasks/lists/' + newData.newListId)
          .then(res => {
            res.data.sort((a, b) => a.sortVal - b.sortVal);
            res.data.forEach((t, i) => {
              api.put('tasks/' + t._id, {
                sortVal: (i + 1) * 2
              }).then(res => {
                console.log(res)
                dispatch('getLists', newData.task.boardId);
              });
            })
          })
      });
    },

    // change value on task enabling visual display of task completion
    taskCompleted({
      commit,
      dispatch
    }, task) {
      let data = {
        completed: !task.completed
      };
      api.put('tasks/' + task._id, data).then(res => {
        dispatch('getTasks', task.listId);
      });
    },

    //#endregion

    addComment({
      commit,
      dispatch
    }, data) {
      api.post('tasks/' + data.taskId, data.comment).then(res => {
        dispatch('getTasks', data.listId);
      });
    },
    deleteComment({
      dispatch
    }, data) {
      api
        .delete('tasks/' + data.taskId + '/comment/' + data.commentId)
        .then(res => {
          dispatch('getTasks', data.listId);
        });
    }
  }
});