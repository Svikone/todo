import auth from '@/components/auth/auth'
import signIn from '@/components/auth/pages/signIn'
import signUp from '@/components/auth/pages/signUp'

export default {
    path: '/auth',
    navm: 'auth',
    component: auth,
    children: [
        {
            path: 'signin',
            component: signIn
        },
        {
            path: 'signup',
            component: signUp
        }
    ]
}
