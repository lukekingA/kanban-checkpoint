<template>
  <div class="tasks">

    <div>
      <div class="d-flex justify-content-between bg-white border-light border-bottom m-2">
        <div class="d-flex justify-content-start">
          <button class="btn ml-2 py-0 my-2 text-success" @click="showEditForm = !showEditForm"><small><i
                class="far fa-edit"></i></small></button>
          <div class="text-left">
            <h6 class="border-dark rounded m-1 mb-0 p-1">{{task.description}}</h6>
            <button class="btn ml-2 py-0 my-1 bg-success text-light"
              @click="showCommentForm = !showCommentForm">Comment</button>
          </div>
        </div>
        <button class="btn  " @click="deleteTask(task._id, task.listId)"><small><i
              class="fas fa-trash-alt"></i></small></button>
      </div>
      <div v-show="showEditForm">
        <form @submit.prevent="editTask(task)">
          <input class="rounded pl-1" type="text" v-model="taskDescription" placeholder="task description">
        </form>

      </div>
      <div v-show="showCommentForm">
        <form @submit.prevent="addComment(task._id)">
          <input class="rounded pl-1" type="text" v-model="comment" placeholder="Comment">
        </form>

      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "tasks",
    data() {
      return {
        showEditForm: false,
        taskDescription: '',
        showCommentForm: false,
        comment: ''
      };
    },
    mounted() {

    },
    computed: {

    },
    props: ['task'],
    methods: {
      deleteTask(id, listId) {
        let data = {
          taskId: id,
          listId: listId
        }
        this.$store.dispatch('deleteTask', data)
      },
      editTask(task) {
        let data = {
          description: { description: this.taskDescription },
          taskId: task._id,
          listId: task.listId
        }
        this.$store.dispatch('editTask', data)
        this.taskDescription = ''
        this.showEditForm = false
      }
    }
  };
</script>

<style>
</style>