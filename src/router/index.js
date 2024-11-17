import { createRouter, createWebHistory } from 'vue-router'
import AttractionList from "@/components/trip/AttractionList.vue"
import App from "@/App.vue"
import LoginView from "@/components/member/LoginView.vue"
import JoinView from "@/components/member/JoinView.vue"
import FindIdView from "@/components/member/FindIdView.vue"
import FindPasswordView from "@/components/member/FindPasswordView.vue"
import TheBoardView from "@/components/layout/TheBoardView.vue"
import BoardList from "@/components/board/BoardList.vue"
import BoardListItem from "@/components/board/item/BoardListItem.vue"
import BoardForm from "@/components/board/BoardForm.vue"
import test from "@/components/trip/test.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: test,
    },
    {
      path: '/search',
      name: 'search',
      component: AttractionList
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/join', // 회원가입 라우트 추가
      name: 'join',
      component: JoinView
    },
    {
      path: '/find-id',
      name: 'findId',
      component: FindIdView,
    },
    {
      path: '/find-password',
      name: 'findPassword',
      component: FindPasswordView,
    },
    {
      path: '/board',
      name: 'board',
      component: TheBoardView,
      redirect: { name: 'article-list' },
      children: [
        {
          path: 'list',
          name: 'article-list',
          component: BoardList,
        },
        {
          path: 'item/:id',
          name: 'article-detail',
          component: BoardListItem,
        },
        {
          path: 'edit/:id',
          name: 'article-edit',
          component: BoardForm,
        },
        {
          path: 'write',
          name: 'article-write',
          component: BoardForm,
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
