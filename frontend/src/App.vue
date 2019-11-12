<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  Vue.use(BootstrapVue)
  Vue.use(VueMaterial)
export default {
  
  name: 'app',
  components: {
  }
}
</script>

<style>
  #app {
    
    height: 100%;
  }
  .md-fab {
    display: flex;
    justify-content: center;
    width: 130px;
    border-radius: 10px;
    border: none;
    background: #1a82d4;
    font-family: sans-serif;
    color: white;
    margin-bottom: 10px;
    height: 40px;
  }
  .font {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }
</style>
