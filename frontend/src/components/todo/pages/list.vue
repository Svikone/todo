<template lang="html">

  <section class="list">
    <h1>list Component</h1>
    <card  v-for="(card, i) in cards" v-bind:text="card.text" v-bind:key="i"></card>
  </section>

</template>

<script lang="js">
  import cardComponent from "@/components/todo/pages/card"

  export default  {
    name: 'list',
    props: [],
    mounted () {

    },
    data () {
      return {
        cards: [
          {
            text:"hello"
          },
          {
            text:"hi gais"
          },
          {
            text:"tolia"
          }
        ]
      }
    },
    methods: {

    },
    computed: {

    },
    components: {
      "card": cardComponent
    }
}


</script>

<style scoped lang="scss">
  .list {

  }
</style>
