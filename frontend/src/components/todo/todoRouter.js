import create from '@/components/todo/pages/create'
import todo from '@/components/todo/todo'
import list from '@/components/todo/pages/list'
import editProfile from '@/components/todo/pages/editProfile'


export default {
    path: '/todo',
    navm: 'todo',
    component: todo,
    children: [
        {
            path: 'create',
            component: create
        },
        {
            path: ':id/edit',
            component: create
        },
        {
            path: '',
            component: list
        },
        {
            path: 'edit/profil',
            component: editProfile
        },
        
    ]
}
    