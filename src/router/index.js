import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: '主页',
      redirect: '/chat'
    },
    {
      path: '/chat/:uuid?',
      name: 'Chat',
      components: {
        App: () => import('../views/ChatView.vue')
      }
    },
    {
      path: '/log',
      name: '登录',
      components: {
        App: () => import('../views/LogView.vue')
      }
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      components: {
        App: () => import('../views/BashboardView.vue')
      },
      redirect: '/dashboard/user',
      meta: {
        acccess: 'admin'
      },
      children: [
        {
          path: 'user',
          name: '用户管理',
          components: {
            Dashboard: () => import('../components/Dashboard/UserView/UserIndex.vue')
          }
        },
        {
          path: 'model',
          name: '模型管理',
          components: {
            Dashboard: () => import('../components/Dashboard/ModelView/ModelIndex.vue')
          }
        },
        {
          path: 'key',
          name: '密钥管理',
          components: {
            Dashboard: () => import('../components/Dashboard/KeyView/KeyIndex.vue')
          }
        }

      ]
    },
    {
      path: '/404',
      name: '404',
      components: {
        App: () => import('@/views/404View.vue'),
      }
    },

    {
      path: '/500',
      name: '500',
      components: {
        App: () => import('@/views/500View.vue'),
      }
    },

  ]
})

export default router
