<template>
  <form @submit.prevent="addTodo(newTodo)">
    <div class="form-group">
      <input type="text"
             v-model="newTodo.title"
             class="form-control"
             placeholder="Add a new item">
    </div>
    <div class="form-group">
      <button class="btn btn-success" type="submit">Add Todo</button>
    </div>
  </form>
</template>

<script>
    export default {
      computed: {
        newTodo(){
          return this.$store.state.newTodo;
        }
      },
      methods: {
        addTodo(newTodo){
          this.$store.dispatch('saveTodo', newTodo)
        }
      }
    }
</script>

<style scoped>

</style>
