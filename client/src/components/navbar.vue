<template>
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <router-link to="/">
          <img src="/img/logo-white.png" width="112" height="28" />
        </router-link>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{'isActive': showNav}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': showNav}">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Shop</a>

          <div class="navbar-dropdown">
            <router-link to="/shop" class="navbar-item">All</router-link>
            <router-link to="/shop?activeTab=0" class="navbar-item">Featured</router-link>
            <router-link to="/shop?activeTab=1" class="navbar-item">Accesories</router-link>
            <router-link to="/shop?activeTab=2" class="navbar-item">Bags/Wallets</router-link>
            <router-link to="/shop?activeTab=3" class="navbar-item">Hoodies</router-link>
            <router-link to="/shop?activeTab=4" class="navbar-item">Jackets/Coats/Blazers</router-link>
            <router-link to="/shop?activeTab=5" class="navbar-item">Pants</router-link>
            <router-link to="/shop?activeTab=6" class="navbar-item">Shirts</router-link>
            <router-link to="/shop?activeTab=7" class="navbar-item">Sweaters</router-link>
            <router-link to="/shop?activeTab=8" class="navbar-item">T-shirts</router-link>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Cart</a>

          <div class="navbar-dropdown">
            <router-link to="/login" v-if="!isLogin">
              <a class="navbar-item">Log in</a>
            </router-link>
            <p class="navbar-item" v-if="isLogin && userData.cart.length === 0">Your Cart is Empty</p>
            <div v-if="isLogin && userData.cart.length !== 0">
              <div class="container">
                <!-- <a
                  class="navbar-item"
                  v-for="(cart, i) in userData.cart"
                  :key="i"
                >{{cart.productId.name}}</a>-->
                <div class="box navbar-item" v-for="(cart, i) in userData.cart" :key="i">
                  <article class="media">
                    <figure class="media-left">
                      <p class="image is-32x32">
                        <img :src="cart.productId.image" />
                      </p>
                    </figure>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{cart.productId.name}}</strong>
                          <br />
                          IDR {{cart.subtotal | numFormat}}
                        </p>
                      </div>
                      <nav class="level is-mobile">
                        <div class="level-left">
                          <a class="level-item" @click="removeCart(cart.productId._id)">
                            <span class="icon is-small">
                              <i class="fas fa-minus"></i>
                            </span>
                          </a>
                          <span class="level-item">
                            <span class="icon is-small">{{cart.quantity}}</span>
                          </span>
                          <a class="level-item" @click="addCart(cart.productId._id)">
                            <span class="icon is-small">
                              <i class="fas fa-plus"></i>
                            </span>
                          </a>
                        </div>
                      </nav>
                    </div>
                    <div class="media-right">
                      <button class="delete" @click="deleteCart(cart.productId._id)"></button>
                    </div>
                  </article>
                </div>
                <div class="navbar-item">
                  <span>
                    Total: IDR
                    <strong>{{cartTotal | numFormat}}</strong>
                  </span>
                </div>
                <a class="button navbar-item is-success is-fullwidth has-text-centered">CHECKOUT</a>
                <router-link to="/cart">
                  <a class="navbar-item">Go to cart</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <a class="navbar-item">
          <router-link to="/transactions">Transactions</router-link>
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="isLogin && userData.role === 'ADMIN'">
          <router-link to="/admin">
            <a class="has-text-white">Admin Page</a>
          </router-link>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/login" v-if="!isLogin">
              <a class="button is-light">Log in</a>
            </router-link>
            <a class="button is-light" v-if="isLogin" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/ecommerce";
import Swal from "sweetalert2";
import notlogin from "@/components/notlogin.vue";
export default {
  data() {
    return {
      showNav: false,
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      products: state => state.products,
      isLogin: state => state.isLogin,
      userData: state => state.userData
    }),
    cartTotal() {
      let total = 0;
      this.userData.cart.forEach(cart => {
        total += cart.subtotal;
      });
      return total;
    }
  },
  components: {
    notlogin
  },
  methods: {
    logout() {
      Swal.fire({
        title: "Are you sure?",
        text: "Think again",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, bye!"
      }).then(result => {
        if (result.value) {
          localStorage.removeItem("token");
          api.defaults.headers.common["token"] = "";
          this.$store.commit("setLogin", false);
          this.$store.commit("setUserData", {});
          Swal.fire("Bye!", "Sad to see you go :(", "success");
        }
      });
    },
    removeCart(productId) {
      console.log(productId);
      this.$store.dispatch("removeCart", productId);
    },
    addCart(productId) {
      console.log(productId);
      this.$store.dispatch("addCart", productId);
    },
    deleteCart(productId) {
      this.$store.dispatch("deleteCart", productId);
    }
  }
};
</script>

<style scoped>
.box {
  margin: 0;
  box-shadow: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.link {
  color: white;
}
.navbar-start > a {
  color: white;
}
</style>
