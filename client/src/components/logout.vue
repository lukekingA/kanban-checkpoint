<template>
  <div class="logout container fluid">
    <div class="row">
      <div class="col col-sm-10 offset-sm-1">
        <div>
          <button class="btn bg-danger text-light" @click="logout">Log Out</button>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
  export default {
    name: 'logout',
    data() {
      return {}
    },
    computed: {},
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {}
  }
</script>


<style scoped>

</style>