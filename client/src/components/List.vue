<template>
  <div class="h-100 lists col col-sm-3 px-2 mb-2">
    <div class="bg-light h-100 overflow-auto">
      <drop @drop="handleDrop">
        <div class="d-flex justify-content-between align-items-baseline">
          <div>
            <button class="btn btn-sm bg-success border-dark text-light mx-3 py-0" @click="visTaskForm">
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
      </drop>
      <task :task="task" v-for="task in tasks" :key="task._id"></task>
      <drop v-if="tasks.length" class="drop" @drop="handleDropBottom"></drop>
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
        let sorted = this.$store.state.activeTasks[this.listData._id] || []
        sorted.sort((a, b) => a.sortVal - b.sortVal)
        return sorted;
      },
      visDrops() {
        return this.$store.state.showDrops
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
            sortVal: this.tasks.length * 2,
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
      },
      handleDropBottom(data) {
        let newData = {
          newListId: this.listData._id,
          sortVal: this.tasks.length * 2 + 2,
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

<style>


</style>