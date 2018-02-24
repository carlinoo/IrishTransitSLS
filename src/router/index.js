import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LogIn from '../components/User/LogIn'
import SignUp from '../components/User/SignUp'
import ConfirmUser from '../components/User/Confirm'
import ForgotPassword from '../components/User/ForgotPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authRequired: true,
        registeredVisible: true
      }
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    },
    {
      path: '/confirm',
      name: 'ConfirmUser',
      component: ConfirmUser,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    }
  ]
})
