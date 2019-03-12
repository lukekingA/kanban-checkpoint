<template>

  <div class=" lists col col-sm-3">
    <div>
      <h5>{{listData.title}}</h5>
      <span> <small>{{listData.createdAt | prettyDate}}</small></span>
    </div>
  </div>


</template>


<script>
  import moment from 'moment'

  export default {
    name: 'list',
    data() {
      return {}
    },
    computed: {
      lists() {
        return
      }
    },
    filters: {
      prettyDate(date) {
        return moment(date).format('MM-DD-YY hh:mm')
      }
    },
    props: ['listData'],
    methods: {},
    components: {}
  }
</script>


<style scoped>

</style>