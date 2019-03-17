<template>
  <div class="tasks">

    <div :class="taskStyle" class="border-dark border rounded p-1 my-1">

      <drag class="drag" :transfer-data="task" v-on:dragstart="showDrops" v-on:dragend="showDrops">
        <drop @drop="handleDrop">
          <div class="d-flex justify-content-between drag border-bottom m-2">
            <div class="d-flex justify-content-start">
              <div class="">
                <button class="btn ml-0 py-0 my-1 text-success" @click="visComForm"><i class="fas fa-clipboard-list"></i></button>
                <button class="btn ml-0 py-0 my-1" @click="visEditForm"><small><i class="fas fa-pencil-alt"></i></small></button>
              </div>
              <div class="text-left">
                <h6 class="border-dark rounded m-1 mb-0 p-1">{{task.description}}</h6>
              </div>
            </div>
            <div class="">
              <input class="btn" type="checkbox" name="completed" :checked="task.completed" @click="taskCompleted(task)">
              <button class="btn  " @click="deleteTask(task._id, task.listId)"><small><i class="fas fa-trash-alt"></i></small></button>
            </div>
          </div>
        </drop>
      </drag>
      <!-- <drop :class="visDrops ? 'dragTarget' : '' " class="drop rounded" @drop="handleDrop"></drop> -->
      <div v-show="showEditForm">
        <form @submit.prevent="editTask(task)">
          <input class="rounded pl-1" ref="editForm" type="text" v-model="taskDescription" placeholder="task description">
        </form>

      </div>
      <div v-show="showCommentForm">
        <form @submit.prevent="addComment(task)">
          <input class="rounded pl-1" ref="comForm" type="text" v-model="comment" placeholder="Comment">
        </form>

      </div>
      <div>
        <div :class="task.completed ? 'tsk2-complete' : 'bg-white'" class="d-flex rounded shadow-sm justify-content-between ml-5 my-2 mr-2"
          v-for="comment in task.comments">
          <p class="pl-2 py-1 text-left my-1">{{comment.content}}</p>
          <button class="btn mr-1" @click="deleteComment(task._id, task.listId, comment._id)"><small><i class="fas fa-trash-alt"></i></small></button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {
    Drag,
    Drop
  } from 'vue-drag-drop'

  export default {
    name: "tasks",
    data() {
      return {
        showEditForm: false,
        taskDescription: '',
        showCommentForm: false,
        comment: '',
        dragStart: false
      };
    },
    computed: {
      taskStyle() {
        if (this.task.completed) {
          return 'tsk-complete'
        }
        return 'bg-light'
      },
      comStyle() {
        if (this.task.completed) {
          return 'tsk2-complete'
        }
        return 'bg-white'
      },
      visDrops() {
        return this.$store.state.showDrops
      }
    },
    props: ['task'],
    components: {
      Drag,
      Drop
    },
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
          description: {
            description: this.taskDescription
          },
          taskId: task._id,
          listId: task.listId
        }
        this.$store.dispatch('editTask', data)
        this.taskDescription = ''
        this.showEditForm = false
      },
      addComment(task) {
        let data = {
          taskId: task._id,
          listId: task.listId,
          comment: {
            content: this.comment
          }
        }
        this.$store.dispatch('addComment', data)
        this.comment = ''
        this.showCommentForm = false
      },
      deleteComment(taskId, listId, commentId) {
        let data = {
          taskId: taskId,
          listId: listId,
          commentId: commentId
        }
        this.$store.dispatch('deleteComment', data)
      },
      handleDrop(data) {
        let newData = {
          newListId: this.task.listId,
          sortVal: this.task.sortVal - 1,
          task: data
        }
        this.$store.dispatch('taskDrop', newData)
      },
      visComForm() {
        this.showCommentForm = !this.showCommentForm
        this.$nextTick(function () {
          this.$refs.comForm.focus()
        })
      },
      visEditForm() {
        this.showEditForm = !this.showEditForm
        this.$nextTick(function () {
          this.$refs.editForm.focus()
        })
      },
      taskCompleted(task) {
        this.$store.dispatch('taskCompleted', task)
      },
      showDrops() {
        this.$store.dispatch('showDrops')
      }

    }
  };
</script>

<style>
  .drop {
    height: 8px;
  }

  .tsk-complete {
    background-color: rgb(220, 218, 238);
  }

  .tsk2-complete {
    background-color: rgb(187, 180, 216);
  }

  .drag:hover {
    cursor: grab;
  }

  /* .dragTarget {
    background-color: rgba(131, 125, 125, 0.15);
    border: 1px dotted rgba(56, 56, 56, 0.15);
  } */
</style>