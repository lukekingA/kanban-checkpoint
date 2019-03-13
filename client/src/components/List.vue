<template>

  <div class="h-100 lists col col-sm-3 px-2 mb-2">
    <div class="bg-light h-100">
      <div>
        <h5 class="d-inline-block border-bottom pb-1 pt-2">{{listData.title}}</h5>
        <button class="btn  " @click="deleteList(listData._id)"><i class="fas fa-trash-alt"></i></button>
      </div>
      <task v-for="task in tasks"></task>

    </div>
  </div>


</template>


<script>
  import Task from '@/components/Task.vue'
  import moment from 'moment'

  export default {
    name: 'list',
    data() {
      return {}
    },
    computed: {
      tasks() {
        return this.$store.state.activeTasks
      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },
    filters: {
      prettyDate(date) {
        return moment(date).format('MM-DD-YY hh:mm')
      }
    },
    props: ['listData', 'boardId'],
    methods: {
      deleteList(id) {
        let data = {
          listId: id,
          boardId: this.boardId
        }
        this.$store.dispatch('deleteList', data)
      }
    },
    components: {
      Task
    }
  }
</script>


<style scoped>

</style>