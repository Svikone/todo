<template lang="html">

  <section class="list">
    <h1>list Component</h1>
      <card v-for = "(card, i) in cards" :index="i" :value="card"></card>
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
            val:"hello"
          },
          {
            val:"hi gais"
          },
          {
            val:"tolia"
          },
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
