<template>
  <div class="boards row">
    <banner :home="home"></banner>
    <div class="page-top-margin col">
      <h4 class="mb-3">WELCOME TO THE BOARDS!!!</h4>
      <form class="d-flex-sm align-items-sm-baseline justify-content-sm-center mb-3" @submit.prevent="addBoard">
        <input class="pl-1 mr-1 mb-2 rounded" type="text" placeholder="title" v-model="newBoard.title" required>
        <input class="inputWidth pl-1 ml-1 mb-2 rounded" type="text" placeholder="description" v-model="newBoard.description">
        <button class="btn btn-sm bg-success text-light ml-2 mb-2" type="submit">Create Board</button>
      </form>
      <div class="row">
        <div class="shadow rounded d-inline-block p-2 font-lg m-2 wboard ml-2 bg-light col" v-for="board in boards"
          :key="board._id">
          <router-link class="mw-50 font-weight-bold text-dark" :to="{name: 'board', params: {boardId: board._id}}">
            {{board.title}}
          </router-link>
          <button class="btn  " @click="deleteBoard(board._id)"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'

  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({
          name: "login"
        });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        },
        home: true
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = {
          title: "",
          description: ""
        };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },

    },
    components: {
      Banner
    }
  };
</script>

<style>
  .inputWidth {
    width: 300px
  }

  .font-lg {
    font-size: 1.3rem;
  }

  .wboard {
    width: 250px;
  }
</style>