<template>
  <div class="container-fluid" id="app">

    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Cabin+Condensed');

  html,
  body {
    background-color: rgb(238, 238, 238);
  }

  #app {
    font-family: 'Cabin Condensed', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: rgb(238, 238, 238);
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>