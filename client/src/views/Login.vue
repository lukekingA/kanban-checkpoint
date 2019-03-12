<template>
  <div class="login">
    <banner :home="home" :loginpage="loginpage"></banner>
    <form class="d-flex align-items-baseline justify-content-center mb-3" v-if="loginForm" @submit.prevent="loginUser">
      <input class="inputWidth pl-1 mr-1 rounded" type="email" v-model="creds.email" placeholder="email">
      <input class="pl-1 ml-1 rounded" type="password" v-model="creds.password" placeholder="password">
      <!-- <button type="submit">Login</button> -->
      <button class="btn btn-sm bg-success text-light ml-2" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name">
      <input type="email" v-model="newUser.email" placeholder="email">
      <input type="password" v-model="newUser.password" placeholder="password">
      <button type="submit">Create Account</button>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  import Banner from '@/components/Banner.vue'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        },
        home: true,
        loginpage: true
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
    components: {
      Banner
    }
  };
</script>

<style>
  .action {
    cursor: pointer;
  }
</style>