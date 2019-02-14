<template>
  <div class="todo">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="todo" class="content">
      <h2>{{ todo.title }}</h2>
      <p>{{ todo.body }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        todo: null,
        error: null
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.error = this.post = null;
        this.loading = true;
        this.axios.get('http://localhost:3000/todos/' + this.$route.params.id).then(response => {
          console.log(response.data);
          this.loading = false;
          this.todo = response.data;
        })
      }
    }
  }

</script>

<style scoped>

</style>
