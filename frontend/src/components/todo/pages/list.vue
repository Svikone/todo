<template lang="html">

  <section class="list">
    <h1>Your cards are displayed here</h1>
    <card v-for="(card, i) in cards" v-bind:text="card" v-bind:key="i"></card>
    <b-pagination
      v-model="currentPage"
      :total-rows="cardLength"
      :per-page="perPage"
      @input="getAllCard()"
    ></b-pagination>

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
      eventBus.$on("update",() => {
        this.getAllCard()
      })
    },
    
    data () {
      return {
        api_url: 'http://localhost:9000/api',
        cards: [],
        perPage: 10,
        currentPage:1,
        cardLength: 1

      }
    },

    methods: {
      getAllCard() {
        axios.post(this.api_url+"/todo/card/get/all",{page: this.currentPage}
        ).then(result => {
          this.cards = result.data.result
          this.cardLength = result.data.count
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
    min-height: 86vh;
    position: relative;
    .pagination {
      position: absolute;
      bottom: -64px;
    }
  }
</style>
