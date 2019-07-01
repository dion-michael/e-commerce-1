import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Shop from "./views/Shop.vue";
import Login from "./views/Login.vue"
import Cart from "./views/Cart.vue"
import transactions from "./views/transactions.vue"
import admin from "./views/Admin.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/transactions",
      name: "transaction",
      component: transactions
    },
    {
      path: "/admin",
      name: "admin page",
      component: admin
    }
  ]
});