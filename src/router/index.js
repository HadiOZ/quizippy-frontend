import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Landing',
    meta: {
      title: 'Quizippy'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Landing.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'Quizippy | About Us'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    meta: {
      title: 'Quizippy | Sign In'
    },
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: {
      title: 'Quizippy | Sign Up'
    },
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/account',
    name: 'Account',
    meta: {
      title: 'Quizippy | Account'
    },
    component: () => import('../views/Account.vue')
  },
  {
    path: '/join',
    name: 'Join',
    meta: {
      title: 'Quizippy | Join'
    },
    component: () => import('../views/JoinQuiz.vue')
  },
  {
    path: '/room',
    name: 'PlayQuizy',
    meta: {
      title: 'Quizippy | Play Quiz'
    },
    component: () => import('../views/GameRoom.vue') 
  },
  {
    path: '/play',
    name: 'Play',
    meta: {
      title: 'Quizippy | Play'
    },
    component: () => import('../views/AdminQuiz.vue')
  },
  {
    path: '/resultquiz',
    name: 'ResultQuiz',
    meta: {
      title: 'Quizippy | Result'
    },
    component: () => import('../views/ResultQuiz.vue')
  },
  {
    path: '/summary',
    name: 'SummaryResult',
    meta: {
      title: 'Quizippy | Summary'
    },
    component: () => import('../views/SummaryResult.vue'),
    props: (route) => ({ 
      idquiz: route.query.idquiz
    })
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: 'Quizippy | Dashboard'
    },
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: {
      title: 'Quizippy | Search'
    },
    component: () => import('../views/Search.vue')
  },
  {
    path: '/achievement',
    name: 'Achievement',
    meta: {
      title: 'Quizippy | Achievement'
    },
    component: () => import('../views/Achievement.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      title: 'Quizippy | History'
    },
    component: () => import('../views/History.vue')
  },
  {
    path: '/makequiz',
    name: 'MakeQuiz',
    meta: {
      title: 'Quizippy | Make Quiz'
    },
    component: () => import('../views/MakeQuiz.vue'),
    props: (route) => ({ 
      id: route.query.id,
      template: route.query.template
    })
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  /* It will change the title when the router is change*/
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router