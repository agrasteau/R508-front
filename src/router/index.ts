import { createRouter, createWebHistory } from "vue-router";
import Students from "../views/Students.vue";
import Stats from "../views/Stats.vue";
import Grades from "../views/Grades.vue";
import Classes from "../views/Classes.vue";
import Login from "../views/Login.vue";
import StudentDetail from "../views/StudentDetail.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login", // redirection par défaut vers la page login
  },
  {
    path: "/students",
    name: "students",
    component: Students,
  },
  {
    path: "/stats",
    name: "stats",
    component: Stats,
  },
  {
    path: "/grades",
    name: "grades",
    component: Grades,
  },
  {
    path: "/classes",
    name: "classes",
    component: Classes,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/students/:id",
    name: "student-detail",
    component: StudentDetail,
    props: true, // permet de passer l'id en tant que prop à StudentDetail
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  
  const requiresAuth = to.matched.some((record) => record.name !== "login");
  
  if (requiresAuth && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
