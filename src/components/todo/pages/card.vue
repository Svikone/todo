<template lang="html">

  <section class="card">
    <!-- <md-card>
      <md-card-header>
        <div class="md-title">Card without hover effect</div>
      </md-card-header>

      <md-card-content>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
      </md-card-content>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card> -->
    <b-alert show dismissible>{{value.val}}
    Dismissible Alert! Click the close button over there <b>&rArr;</b>
    </b-alert>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'card',
    props: [
      "index",
      "value"
    ],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .card {
    .alert {
      margin-bottom: unset;
    }
  }
</style>
