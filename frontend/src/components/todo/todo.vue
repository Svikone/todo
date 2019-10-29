<template lang="html">

  <section class="todo">
    <div class="page-container">
      <md-app>
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">ToDo</span>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <span>Navigation</span>

            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item to="/todo">
              <md-icon>list</md-icon>
              <span class="md-list-item-text">List</span>
            </md-list-item>

            <md-list-item to="/todo/create">
              <md-icon>create</md-icon>
              <span class="md-list-item-text">Create card</span>
            </md-list-item>

            <md-list-item to="/auth/signin">
              <md-icon>account_circle</md-icon>
              <span class="md-list-item-text">SignIn</span>
            </md-list-item>

            <md-list-item to="/auth/signup">
              <md-icon>supervised_user_circle</md-icon>
              <span class="md-list-item-text">SignUp</span>
            </md-list-item>

            <md-list-item @click="exit()">
              <md-icon>exit_to_app</md-icon>
              <span class="md-list-item-text" >Exit</span>
            </md-list-item>
          </md-list>
        </md-app-drawer>

        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>

    
  </section>

</template>

<script lang="js">
  import axios from 'axios'

  export default  {
    name: 'todo',
    props: [],
    mounted () {
      this.auth()
    },
    data: () => ({
      menuVisible: false,
      api_url: 'http://localhost:9000/api',
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },

      exit() {
        localStorage.removeItem('token');
        this.$router.push({path: '/auth/signin'});
        axios.defaults.headers['x-access-token'] = '';
      },

      auth() {
        axios.post(this.api_url+'/user/verify',{})
        .then(result => {
          console.log(result)

          if(result.data.verify) return
          else this.$router.push({path: '/auth/signin'});
        }).catch(err => {
          this.$router.push({path: '/auth/signin'});
          console.log(err.response)
        })
      }
    }
    
}


</script>

<style scoped lang="scss">
  .todo {
     height: 100%;
    .page-container {
      height: 100%;
      .md-app {
        height: 100%;
      }
    }
    
    .md-app {
      min-height: 350px;
      border: 1px solid rgba(#000, .12);
    }

    .md-drawer {
      width: 230px;
      max-width: calc(100vw - 125px);
    }
  }
</style>
