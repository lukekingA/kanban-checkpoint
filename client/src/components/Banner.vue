<template>
  <div class="logout bg-dark text-light py-4 mb-3 rounded-bottom shadow fixed-top">
    <div class="row">
      <div class="col text-center">
        <h1>Kan-Task-Tic</h1>
      </div>
    </div>
    <div class="row">
      <div class="col col-sm-10 offset-sm-1">
        <div class="d-flex justify-content-between">
          <button v-if="!loginpage" class="btn btn-sm bg-danger ml-2 text-light" @click="logout">Log Out</button>
          <router-link v-if="!home" class="btn btn-sm bg-danger mr-2 text-light px-3" to="/">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "logout",
    data() {
      return {};
    },
    computed: {},
    methods: {
      logout() {
        this.$store.dispatch("logout");
      }
    },
    props: ['home', 'loginpage'],
    components: {}
  };
</script>


<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Fredoka+One");

  h1 {
    font-family: "Fredoka One", cursive;
  }
</style>