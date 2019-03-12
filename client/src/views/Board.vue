<template>
  <div class="board ">
    <banner></banner>
    <div class="bg-light rounded">
      <div class="row">
        <div class="col">
          <h3 class="mb-1">{{board.title}}</h3>
          <h5>{{board.description}}</h5>

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