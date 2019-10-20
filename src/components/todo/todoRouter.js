import create from '@/components/todo/pages/create'
import edit from '@/components/todo/pages/edit'
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
            path: 'edit',
            component: edit
        },
        {
            path: '',
            component: list
        },
        
    ]
}
    