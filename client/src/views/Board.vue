<template>
  <div class="board ">
    <banner></banner>
    <div class="bg-light rounded mb-3">
      <div class="row">
        <div class="col py-2 d-flex justify-content-between">
          <h3 class="mb-1 pl-3">{{board.title}}</h3>
          <div class="pr-3">
            <span> <small>{{board.createdAt | prettyDate}}</small></span>
            <h5>{{board.description}}</h5>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col">

          <form class="border-bottom mb-2 pb-1" @submit.prevent="addList(board._id)" action="">
            <input class="pl-1 rounded" type="text" placeholder="list title" v-model="listTitle">
            <button type="submit" class="btn btn-sm">Add List</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <list v-for="list in lists" :listData='list'></list>
    </div>
  </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import List from '@/components/List.vue'
  import moment from 'moment'
  export default {
    name: "board",
    data() {
      return {
        listTitle: ''
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: 'Loading...'
        }
      },
      lists() {
        return this.$store.state.activeLists
      }
    },
    filters: {
      prettyDate(date) {
        return moment(date).format('MM-DD-YY hh:mm')
      }
    },
    mounted() {
      this.$store.dispatch('getLists', this.boardId)
    },
    methods: {
      addList(id) {
        let data = {
          boardId: id,
          title: {
            title: this.listTitle
          }
        }
        this.$store.dispatch('addList', data)
        this.listTitle = ''
      }
    },
    props: ["boardId"],
    components: {
      Banner,
      List
    }
  };
</script>