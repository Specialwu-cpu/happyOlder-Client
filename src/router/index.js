// 路由配置
import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import UserCenter from "../components/UserCenter";
import ModifyAdmin from "../components/user/modifyAdmin.vue";
import ManageWorker from "../components/user/manageWorker.vue";
import ManageOlder from "../components/user/manageOlder.vue";
import ManageVolunteer from "../components/user/manageVolunteer.vue";
import User3 from "../components/User3"
import About from "../components/about";
import ModifyOlder from "../components/user/modifyOlder.vue";
import ModifyWorker from "../components/user/modifyWorker.vue";
import ModifyVolunteer from "../components/user/modifyVolunteer.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/user3',
      component: User3
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/userCenter',
      component: UserCenter,
      children:[
        {
          path: 'manageWorker',
          component: ManageWorker
        },
        {
          path: 'modifyAdmin',
          component: ModifyAdmin
        },
        {
          path: 'modifyOlder',
          component: ModifyOlder
        },
        {
          path: 'modifyWorker',
          component: ModifyWorker
        },
        {
          path: 'modifyVolunteer',
          component: ModifyVolunteer
        },
        {
          path: 'manageOlder',
          component:ManageOlder
        },
        {
          path: 'manageVolunteer',
          component:ManageVolunteer
        }
      ]
    }
  ]
})
