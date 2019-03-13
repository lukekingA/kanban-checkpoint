<template>
  <div class="tasks">
    <div class="d-flex justify-content-between" v-for="task in tasks" :key="task._id">
      <h6 class="border-dark rounded m-1 p-1">{{task.description}}</h6>
      <button class="btn  " @click="deleteTask(task._id, task.listId)"><small><i class="fas fa-trash-alt"></i></small></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tasks",
    data() {
      return {

      };
    },
    mounted() {

    },
    computed: {

    },
    props: ['tasks'],
    methods: {
      deleteTask(id, listId) {
        let data = {
          taskId: id,
          listId: listId
        }
        this.$store.dispatch('deleteTask', data)
      }
    }
  };
</script>

<style>
</style>