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
</style>
