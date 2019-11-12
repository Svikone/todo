<template lang="html">

  <section class="card">
    <b-alert show :class="{done:text.state}">
    <div class="shadow"></div>
      <div @click="edite()" class="edit">edit</div>
      <md-checkbox  v-model="text.state" @change="setState()"></md-checkbox>
      <img @click="removeCard" class="remove" src="https://img.icons8.com/color/48/000000/close-window.png">
      {{text.body}}
    </b-alert>
  </section>

</template>

<script lang="js">
  import axios from 'axios'
  import {eventBus} from '../../../main.js'

  export default  {
    name: 'card',
    props: [
      "text"
    ],
    mounted () {
    },
    data: () => ({
      api_url: 'http://localhost:9000/api',
      state: null,
    }),
    methods: {
      removeCard() {
        axios.post(this.api_url+"/todo/card/remove", {
          id: this.text._id
        }).then(() => {
          eventBus.$emit("update")
        }).catch(() => {
        })
      },
      
      edite() {
        this.$router.push({path: `/todo/${this.text._id}/edit`}) 
      },

      setState() {
        axios.post(this.api_url+"/todo/card/set/state", {
          state: this.text.state,
          id: this.text._id
        })
      },
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
      padding-right: 105px;
      overflow: hidden;
      border-left: 3px solid transparent;
   
      &.done {
        border-left: 3px solid green;
      }
      .edit {
        position: absolute;
        right: 62px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    
  }
</style>
