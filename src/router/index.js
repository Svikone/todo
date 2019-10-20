import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import authRouter from '@/components/auth/authRouter'
import todo from '@/components/todo/todoRouter'

Vue.use(Router) 

export default new Router({
    routes: [
        {
            path: '/',
            navm: 'HelloWorld',
            component: HelloWorld
        },
        authRouter,
        todo     
    ]
})
