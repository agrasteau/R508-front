import { createRouter, createWebHistory } from 'vue-router';
import Students from '../views/Students.vue';
import Stats from '../views/Stats.vue';
import Grades from '../views/Grades.vue';
import Classes from '../views/Classes.vue';
import Login from '../views/Login.vue';
import StudentDetail from '../views/StudentDetail.vue';
import NewCourse from '../views/NewCourse.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login', // redirection par défaut vers la page login
  },
  {
    path: '/students',
    name: 'students',
    component: Students,
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
  },
  {
    path: '/grades',
    name: 'grades',
    component: Grades,
  },
  {
    path: '/classes',
    name: 'classes',
    component: Classes,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/students/:id',
    name: 'student-detail',
    component: StudentDetail,
    props: true, // permet de passer l'id en tant que prop à StudentDetail
  },
  {
    path: '/newcourse',
    name: 'newcourse',
    component: NewCourse,
  },
];

const router = createRouter({ 
  history: createWebHistory('/'),
  routes,
});

export default router;
