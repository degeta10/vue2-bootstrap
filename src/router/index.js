import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Login from "../views/Login";
import Register from "../views/Register";
import Profile from "../views/Profile";
import Home from "../views/Home";

Vue.use(VueRouter);

const isGuest = (to, from, next) => {
  if (!store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/home");
};

const isAuthenticated = (to, from, next) => {
  if (store.getters["auth/isAuthenticated"]) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/login",
    component: Login,
    name: "login",
    beforeEnter: isGuest,
  },
  {
    path: "/register",
    component: Register,
    name: "register",
    beforeEnter: isGuest,
  },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    beforeEnter: isAuthenticated,
  },
  {
    path: "/home",
    component: Home,
    name: "home",
    beforeEnter: isAuthenticated,
  },
  { path: "*", redirect: "/home" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
