import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/polls',
      name: 'polls',
      component: () => import('@/views/PollView.vue'),
      children: [
        {
          path: 'create',
          name: 'create-poll',
          component: () => import('@/components/PollForm.vue')
        },
        {
          path: ':id',
          name: 'poll',
          props: true,
          redirect: () => {
            return { name: 'edit-poll' }
          },
          children: [
            {
              path: 'edit',
              name: 'edit-poll',
              component: () => import('@/components/PollForm.vue')
            },
            {
              path: 'vote',
              name: 'vote-poll',
              component: () => import('@/components/VoteForm.vue'),
              props: true
            },
            {
              path: 'results',
              name: 'results-poll',
              component: () => import('@/components/ResultsDisplay.vue'),
              props: true
            }
          ]
        }
      ]
    }
  ]
})

export default router
