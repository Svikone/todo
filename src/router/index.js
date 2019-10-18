import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import auth from '@/components/auth/auth'
import signIn from '@/components/auth/pages/signIn'
import signUp from '@/components/auth/pages/signUp'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(Router) 

export default new Router({
   routes: [
       {
            path: '/',
            navm: 'HelloWorld',
            component: HelloWorld
       },
       {
            path: '/auth',
            navm: 'auth',
            component: auth
        },
        {
            path: '/auth/signIn',
            navm: 'signIn',
            component: signIn
        },
        {
            path: '/auth/signUp',
            navm: 'signUp',
            component: signUp
        },
         
   ]
  })
