<template>
  <div class="board ">
    <banner></banner>
    <div class="row">
      <div class="col bg-light rounded">
        <h3 class="mb-1">{{board.title}}</h3>
        <h5>{{board.description}}</h5>

      </div>
    </div>

    <list v-for="list in lists" :listData='list'></list>
  </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  export default {
    name: "board",
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: 'Loading...'
        }
      }
    },
    props: ["boardId"],
    components: {
      Banner
    }
  };
</script>