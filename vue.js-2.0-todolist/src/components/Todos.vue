<template>
  <div id="todos">
    <div class="container">
      <ul class="list-group">
        <li class="list-group-item"
            :class="{'completed' : todo.completed}"
            v-for="(todo,index) in todos">
          <router-link :to="{ name: 'todo', params: { id: todo.id}}">{{todo.title}}</router-link>
          <button class="btn btn-warning btn-xs pull-right "
                  style="margin-left:10px"
                  @click="deleteTodo(todo, index)">
            Delete
          </button>

          <button class="btn btn-xs pull-right"
                  :class="[todo.completed ? 'btn-danger' : 'btn-success']"
                  @click="toggleCompletion(todo)">
            {{ todo.completed ? 'undo' : 'completed'}}
          </button>



        </li>
      </ul>
      <todo-form></todo-form>
    </div>
  </div>
</template>

<script>
  import TodoForm from './TodoForm'

  export default {
    name: "todos",
    computed: {
      todos() {
        return this.$store.state.todos;
      }
    },
    methods: {
      deleteTodo(todo, index) {
        console.log('传参前' + index)
        this.$store.dispatch('removeTodo', { todo, index })
        console.log('传参后' + index)
      },
      toggleCompletion(todo) {
        this.$store.dispatch('completeTodo', todo)
      }
    },
    components: {
      TodoForm
    }
  }
</script>

<style scoped>
  .completed {
    color: #5cb85c;
    text-decoration: line-through;
  }
</style>
