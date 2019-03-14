<template>
  <div class="h-100 lists col col-sm-3 px-2 mb-2">
    <div class="bg-light h-100 overflow-auto">
      <div class="d-flex justify-content-between">
        <div>
          <button class="btn btn-sm bg-success border-dark text-light mt-2 mx-3 py-0" @click="visTaskForm">
            <small>New Task</small>
          </button>
        </div>
        <h5 class="d-inline-block border-bottom pb-1 pt-2">
          {{ listData.title }}
        </h5>
        <button class="btn  " @click="deleteList(listData._id)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div v-show="showTaskForm">
        <form class="d-flex align-content-center justify-content-center" @submit.prevent="addTask(listData._id)">
          <input class="pl-1 rounded" ref="taskForm" type="text" v-model="taskDescription" placeholder="task description" />
          <button type="submit" class="btn btn-sm bg-success text-light ml-2">
            Add
          </button>
        </form>
      </div>
      <drop class="drop" @drop="handleDrop"></drop>
      <task :task="task" v-for="task in tasks" :key="task._id"></task>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task.vue";
  import moment from "moment";
  import {
    Drag,
    Drop
  } from 'vue-drag-drop'

  export default {
    name: "list",
    data() {
      return {
        taskDescription: "",
        showTaskForm: false
      };
    },
    computed: {
      tasks() {
        return this.$store.state.activeTasks[this.listData._id] || [];
      }
    },
    filters: {
      prettyDate(date) {
        return moment(date).format("MM-DD-YY hh:mm");
      }
    },
    props: ["listData", "boardId"],
    methods: {
      deleteList(id) {
        let data = {
          listId: id,
          boardId: this.boardId
        };
        this.$store.dispatch("deleteList", data);
      },
      addTask(id) {
        let data = {
          listId: id,
          data: {
            description: this.taskDescription,
            boardId: this.boardId
          }
        };
        this.$store.dispatch("addTask", data);
        this.showTaskForm = false;
        this.taskDescription = "";
      },
      visTaskForm() {
        this.showTaskForm = !this.showTaskForm
        this.$nextTick(function () {
          this.$refs.taskForm.focus()
        })
      },
      handleDrop(data) {
        let newData = {
          newListId: this.listData._id,
          task: data
        }
        this.$store.dispatch('taskDrop', newData)
      }
    },
    components: {
      Task,
      Drag,
      Drop
    }
  };
</script>

<style scoped></style>