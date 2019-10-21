<template lang="html">

  <section class="card">
    <b-alert show >
      <img class="remove" src="https://img.icons8.com/color/48/000000/close-window.png">
      {{text}}
    </b-alert>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'card',
    props: [
      
      "text"
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
    margin-top: 16px;

    .remove {
      position: absolute;
      right: 16px;
      cursor: pointer;
      width: 30px;
    }
    .alert {
      margin-bottom: unset;
    }
    
  }
</style>
