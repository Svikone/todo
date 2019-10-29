<template lang="html">

  <section class="list">
    <h1>Your cards are displayed here</h1>
    <card  v-for="(card, i) in cards" v-bind:text="card" v-bind:key="i"></card>
  </section>

</template>

<script lang="js">
  import cardComponent from "@/components/todo/pages/card"
  import axios from 'axios'
  import {eventBus} from '../../../main.js'


  axios.defaults.headers['x-access-token'] = localStorage.getItem("token")

  export default  {
    
    name: 'list',
    props: [],
    mounted () {
      this.getAllCard(),
      eventBus.$on("update", data => {
        console.log(data)
        this.getAllCard()
      })
    },
    
    data () {
      return {
        api_url: 'http://localhost:9000/api',
        cards: []
      }
    },

    methods: {
      getAllCard() {
        axios.post(this.api_url+"/todo/card/get/all",{}
        ).then(result => {
          this.cards = result.data
        })
      }
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
