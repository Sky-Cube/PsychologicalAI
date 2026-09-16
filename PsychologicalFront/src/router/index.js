import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'

// 路由配置
const backendRoutes = [
  {
    path: '/back',
    component: BackendLayout,
    children: [
      {
        // 指定子路由名称和位置，位置是/views/Dashboard.vue
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '数据分析',
          icon: 'PieChart'
        }
      },

      {
        path: 'knowledge',
        component: () => import('@/views/knowledge.vue'),
        meta: {
          title: '知识文章',
          icon: 'ChatLineSquare'
        }
      },

      {

        path: 'consultations',
        component: () => import('@/views/consultations.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message'
        }
      },

        {
        path: 'emotional',
        component: () => import('@/views/emotional.vue'),
        meta: {
          title: '情绪日志',
          icon: 'Avatar'
        }
      }
    ]

  }
]

const routr = createRouter({
    history: createWebHistory(),
    routes: backendRoutes
})

export default routr
