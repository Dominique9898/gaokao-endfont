import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'

Vue.use(VueRouter)

export const asyncRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'menu', affix: true, login:true }
      }
    ]
  },
  {
    path:'/user',/*  */
    component:Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/components/adminList'),
        meta: { title: '用户列表', icon: 'user', affix: true }
      }
    ]
  },
  {
    path: '/university',
    component: Layout,
    redirect: 'noRedirect',
    Name: 'University',
    meta: {title:'院校信息', icon: 'school'},
    children: [
      {
        path: 'create',
        component: () => import('@/views/University/createUniversity'),
        name: 'AddUniversity',
        meta: { title: '增加院校', icon: 'editor'}
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'EditUniversity',
        component: () => import('@/views/University/editUniversity'),
        meta: { title: '编辑院校信息', activeMenu: '/university/create' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/components/universityList'),
        name: 'UniversityList',
        meta: { title: '院校信息列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    Name: 'News',
    redirect: 'noRedirect',
    meta: {title:'高校新闻', icon: 'document'},
    children: [
      {
        path: 'create',
        name: 'AddNews',
        component: () => import('@/views/News/createNews'),
        meta: { title: '创建新闻'}
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'EditNews',
        component: () => import('@/views/News/editNews'),
        meta: { title: '编辑新闻', activeMenu: '/news/create' },
        hidden: true
      },
      {
        path: 'list',
        name: 'newsList',
        component: () => import('@/components/newsList'),
        meta: { title: '新闻信息列表'}
      }
    ]
  },
  {
    path: '/major',
    component: Layout,
    Name: 'Major',
    redirect: 'noRedirect',
    meta: {title:'专业信息', icon: 's-promotion'},
    children: [
      {
        path: 'add',
        name: 'AddUMajor',
        component: () => import('@/views/Major/createMajor'),
        meta: { title: '增加专业'}
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'EditMajor',
        meta: { title: '编辑专业信息', activeMenu: '/major/list' },
        hidden: true
      },
      {
        path: 'list',
        name: 'MajorList',
        component: () => import('@/components/majorList'),
        meta: { title: '专业信息列表' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    Name: 'test',
    redirect: 'noRedirect',
    meta: {title:'性格测试', icon: 's-management'},
    children: [
      {
        path: 'add',
        name: 'AddTest',
        meta: { title: '增加测试'}
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'EditTest',
        meta: { title: '编辑测试题库', activeMenu: '/test/list' },
        hidden: true
      },
      {
        path: 'list',
        name: 'OccupationList',
        meta: { title: '测试列表'}
      }
    ]
  },
]


const router = new VueRouter({
  routes: asyncRoutes
})

export default router
