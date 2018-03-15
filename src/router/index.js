import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import LogIn from '../components/User/LogIn'
import SignUp from '../components/User/SignUp'
import EditProfile from '../components/User/EditProfile'
import ForgotPassword from '../components/User/ForgotPassword'
import ResetPassword from '../components/User/ResetPassword'
import Profile from '../components/User/Profile'


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
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    },
    {
      path: '/reset_password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: {
        authRequired: false,
        registeredVisible: false
      }
    },
    {
      path: '/editprofile',
      name: 'EditProfile',
      component: EditProfile,
      meta: {
        authRequired: true,
        registeredVisible: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        authRequired: true,
        registeredVisible: true
      }
    }
  ]
})
