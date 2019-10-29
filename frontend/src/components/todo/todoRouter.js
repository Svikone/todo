import create from '@/components/todo/pages/create'
import todo from '@/components/todo/todo'
import list from '@/components/todo/pages/list'

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
        
    ]
}
    