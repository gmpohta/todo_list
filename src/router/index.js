import { createRouter, createWebHistory } from 'vue-router'
import allTasksView from '@/views/allTasksView.vue'
import groupToDeadlineView from '@/views/groupToDeadlineView.vue'
import detailTaskView from '@/views/detailTaskView.vue'

const routes = [
  {
    path: '/',
    name: 'tasks',
    component:allTasksView,
    meta:{
      title:"Все задачи"
    }
  },
  {
    path:'/group-to-deadline',
    name:'groupToDeadline',
    component:groupToDeadlineView,
    meta:{
      title:"По дате завершения"
    }
  },
  {
    path:'/task/:id',
    name:'detailTask',
    component: detailTaskView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
