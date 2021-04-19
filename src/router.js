import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import CoursesIndex from './views/courses/Index'
import CoursesShow from './views/courses/Show'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'

import Login from './views/Login'
import Register from './views/Register'

import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsShow from './views/enrolments/Show'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsCreate from './views/enrolments/Create'

import LecturersIndex from './views/lecturers/Index'
import LecturersShow from './views/lecturers/Show'
import LecturersEdit from './views/lecturers/Edit'
import LecturersCreate from './views/lecturers/Create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { transition: 'fade' },
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { transition: 'fade' },
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { transition: 'fade' },
    },

    {
      path: '/courses',
      name: 'courses_index',
      component: CoursesIndex
    },
    {
      path: '/courses/create',
      name: 'courses_create',
      component: CoursesCreate,
      meta: { transition: 'fade-in-left' }
    },
    {
      path: '/courses/:id',
      name: 'courses_show',
      component: CoursesShow,
      meta: { transition: 'flip-x' }
    },
    //
    {
      path: '/courses/:id/edit',
      name: 'courses_edit',
      component: CoursesEdit,
      meta: { transition: 'fade-in-right' }
    },

    {
      path: '/enrolments',
      name: 'enrolments_index',
      component: EnrolmentsIndex
    },
    {
      path: '/enrolments/create',
      name: 'enrolments_create',
      component: EnrolmentsCreate,
      meta: { transition: 'fade-in-left' }
    },
    {
      path: '/enrolments/:id',
      name: 'enrolments_show',
      component: EnrolmentsShow,
      meta: { transition: 'flip-x' }
    },

    {
      path: '/enrolments/:id/edit',
      name: 'enrolments_edit',
      component: EnrolmentsEdit,
      meta: { transition: 'fade-in-right' }
    },

    {
      path: '/lecturers',
      name: 'lecturers_index',
      component: LecturersIndex
    },
    {
      path: '/lecturers/create',
      name: 'lecturers_create',
      component: LecturersCreate,
      meta: { transition: 'fade-in-left' }
    },
    {
      path: '/lecturers/:id',
      name: 'lecturers_show',
      component: LecturersShow,
      meta: { transition: 'flip-x' }
    },

    {
      path: '/lecturers/:id/edit',
      name: 'lecturers_edit',
      component: LecturersEdit,
      meta: { transition: 'fade-in-right' }
    },
  ]
});
