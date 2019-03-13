<template>
  <div class="tasks">
    <div>
      <h6 class="border-dark rounded m-1 p-1">{{task.description}}</h6>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tasks",
    data() {
      return {

      };
    },
    computed: {

    },
    props: ['task'],
    methods: {}
  };
</script>

<style>
</style>