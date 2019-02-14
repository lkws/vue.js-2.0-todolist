import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App'
import Todos from './components/Todos'
import Todo from './components/Todo'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: Todos},
  { path: '/todo/:id', component: Todo, name : 'todo'}
]

const router = new VueRouter({
  routes
})

const store = new Vuex.Store({
  state: {
    todos: [],
    newTodo:{ id:null,title:'', completed:false }
  },
  mutations: {
    get_todos_list(state, todos){
      state.todos = todos
    },
    complete_todo (state, todo){
      todo.completed = ! todo.completed
    },
    delete_todo(state, index) {

      state.todos.splice(index,1)
    },
    add_todo (state, todo) {
      state.todos.push(todo)
    }
  },
  actions:{
    getTodos(store){
      Vue.axios.get('http://localhost:3000/todos').then(response =>{
            store.commit('get_todos_list', response.data)
      })
    },
    completeTodo(store, todo){
        Vue.axios.patch('http://localhost:3000/todos/' + todo.id,
          {title: todo.title, completed: !todo.completed, id: todo.id}).then(response => {
            store.commit('complete_todo', todo)
          });
    },
    removeTodo(store, payload){
      Vue.axios.delete('http://localhost:3000/todos/' + payload.todo.id).then(response => {

        store.commit('delete_todo', payload.index);

        });
    },
    saveTodo(store, todo){
      Vue.axios.post('http://localhost:3000/todos',
        { title: todo.title, completed: todo.completed, id: todo.id }).then(response => {
          store.commit('add_todo', response.data);
        })
       store.state.newTodo = { id: null, title:'', completed: false };
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  router
})
