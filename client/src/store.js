import Vue from "vue";
import Vuex from "vuex";
import api from './api/ecommerce'
import Swal from 'sweetalert2'
import {
  rejects
} from "assert";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    userData: {},
    isLogin: false,
    transaction: {},
    user: 0,
    userTransactions: null
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setLogin(state, v) {
      state.isLogin = v
    },
    setUserData(state, v) {
      state.userData = v
    },
    setUserTransactions(state, v) {
      state.userTransaction = v
    }
  },
  actions: {
    getAllProducts({
      commit
    }) {
      api({
          url: "/products",
          method: "GET"
        })
        .then(({
          data
        }) => {
          commit("setProducts", data)
        })
        .catch(error => {
          Swal.fire("The Internet?", "That thing is still around?", "question");
        });
    },
    setLogin({
      commit
    }, v) {
      commit('setLogin', v)
    },
    getUserData({
      commit
    }) {
      api({
        url: "/users",
        headers: {
          token: localStorage.getItem('token')
        },
        method: "GET"
      }).then(({
        data
      }) => {
        console.log(data);
        commit("setUserData", data)
        commit('setLogin', true)
      }).catch(err => {
        console.log(err);
      })
    },
    register({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        api({
          url: "/users/register",
          method: "POST",
          data: payload
        }).then(({
          data
        }) => {
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    login({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        api({
          url: "/users/login",
          method: "POST",
          data: payload
        }).then(({
          data
        }) => {
          localStorage.setItem('token', data.token)
          this.dispatch("getUserData")
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addCart({
      commit
    }, payload) {
      api({
        url: `/users/cart/${payload}`,
        method: "POST",
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({
        data
      }) => {
        console.log(data);
        this.dispatch("getUserData")
      })
    },
    removeCart({
      commit
    }, payload) {
      api({
        url: `/users/cart/${payload}`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({
        data
      }) => {
        console.log(data);
        this.dispatch("getUserData")
      })
    },
    deleteCart({
      commit
    }, payload) {
      api({
        url: `/users/cart/${payload}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({
        data
      }) => {
        console.log(data);
        this.dispatch("getUserData")
      })
    },
    checkout({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        api({
          url: "/users/checkout",
          method: "POST",
          headers: {
            token: localStorage.getItem("token")
          },
          data: {
            paymentDetail: payload
          }
        }).then(({
          data
        }) => {
          console.log(data);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserTransactions({
      commit
    }) {
      return new Promise((resolve, reject) => {
        api({
          url: "/users/transactions",
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        }).then(({
          data
        }) => {
          console.log(data);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteItem({
      commit
    }, productId) {
      return new Promise((resolve, reject) => {
        api({
          url: "/products/" + productId,
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token")
          }
        }).then(({
          data
        }) => {
          console.log(data);
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    uploadImg({
      dispatch,
      commit
    }, file) {
      console.log(file);
      let formData = new FormData()
      formData.append('image', file)
      return new Promise((resolve, reject) => {
        api({
          url: '/upload',
          method: 'POST',
          headers: {
            token: localStorage.getItem('token')
          },
          data: formData
        }).then(({
          data
        }) => {
          resolve(data.link)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateProduct({
      dispatch
    }, product) {
      console.log(product);
      api({
        url: "/products/" + product.productId,
        method: "PUT",
        data: product.data,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({
        data
      }) => {
        console.log(data);
        dispatch('getAllProducts')
      }).catch(err => {
        console.log(err);
      })
    }
  }
});