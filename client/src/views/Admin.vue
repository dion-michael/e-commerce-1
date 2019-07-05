<template>
  <section class="section" style="margin-top: 58px">
    <div class="container">
      <p class="title">Admin page</p>
      <div class="columns is-multiline">
        <div class="column">
          <a @click="toggle = 0">
            <div class="box">Manage transactions</div>
          </a>
        </div>
        <div class="column">
          <a @click="toggle = 1">
            <div class="box">Manage Products</div>
          </a>
        </div>
      </div>
      <div class="columns">
        <div class="column" v-if="toggle === 0">
          <table class="table is-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, i) in transactions" :key="i">
                <th>{{i+1}}</th>
                <td>{{transaction._id}}</td>
                <td>{{transaction.createdAt | moment("DD/MM/YYYY") }}</td>
                <td>{{transaction.items.length}}</td>
                <td>{{transaction.total | numFormat}}</td>
                <td>
                  <b-field>
                    <b-select
                      expanded
                      v-model="transactions[i].status"
                      :placeholder="transactions[i].status"
                      @input="changeStatus({id: transactions[i]._id, status: transactions[i].status})"
                    >
                      <option value="WAITING_FOR_PAYMENT">WAITING_FOR_PAYMENT</option>
                      <option value="ON_PROCESS">ON_PROCESS</option>
                      <option value="ON_DELIVERY">ON_DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </b-select>
                  </b-field>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="title">Total Income: IDR {{income | numFormat}}</div>
        </div>
        <div class="column" v-if="toggle === 1">
          <div class="columns">
            <div class="column is-7">
              <b-tabs position="is-centered" class="block">
                <b-tab-item label="Featured" id="featured">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in featured" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>
                <b-tab-item label="Accesories">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in accessories" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Bags / Wallets" id="bags-wallets">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in bagwallets" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Hoodies">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in hoodies" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Jackets/Coats">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in jacketcoats" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Pants">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in pants" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Shirts">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in shirts" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="Sweaters">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in sweaters" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>

                <b-tab-item label="T-Shirts">
                  <div class="columns is-vcentered is-multiline">
                    <div class="column is-3" v-for="product in tshirts" :key="product._id">
                      <productcard :product="product" :hidecart="true" @imageclicked="select" />
                    </div>
                  </div>
                </b-tab-item>
              </b-tabs>
            </div>
            <div class="column">
              <router-view :selected="selected" @deleted="selected = {}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/ecommerce";
import productcard from "@/components/productcard.vue";
import editcard from "@/components/editcard.vue";
export default {
  data() {
    return {
      toggle: 0,
      transactions: null,
      status: "ON DELIVERY",
      selected: {}
    };
  },
  components: {
    productcard,
    editcard
  },
  computed: {
    ...mapState({
      allTransactions: state => state.allTransactions,
      products: state => state.products
    }),
    income() {
      let total = 0;
      this.transactions.forEach(transaction => {
        total += transaction.total;
      });
      return total;
    },
    ...mapState({
      products: state => state.products,
      isLogin: state => state.isLogin,
      userData: state => state.userData
    }),
    accessories() {
      let filter = this.products.filter(product => {
        return product.section === "accessories";
      });
      return filter;
    },
    bagwallets() {
      let filter = this.products.filter(product => {
        return product.section === "Wallet & Bag";
      });
      return filter;
    },
    hoodies() {
      let filter = this.products.filter(product => {
        return product.section === "hoodies";
      });
      return filter;
    },
    jacketcoats() {
      let filter = this.products.filter(product => {
        return product.section === "Jacket-coat-blazer";
      });
      return filter;
    },
    pants() {
      let filter = this.products.filter(product => {
        return product.section === "Pants";
      });
      return filter;
    },
    shirts() {
      let filter = this.products.filter(product => {
        return product.section === "Shirt";
      });
      return filter;
    },
    sweaters() {
      let filter = this.products.filter(product => {
        return product.section === "Sweater";
      });
      return filter;
    },
    tshirts() {
      let filter = this.products.filter(product => {
        return product.section === "T-shirt";
      });
      return filter;
    },
    featured() {
      let filter = this.products.filter(product => {
        return product.section === "featured";
      });
      return filter;
    }
  },
  mounted() {
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      api({
        url: "/transactions",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        console.log(data);
        this.transactions = data;
      });
    },
    changeStatus(status) {
      console.log(status);
      api({
        url: `/transactions/${status.id}`,
        method: "PATCH",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          status: status.status
        }
      }).then(({ data }) => {
        console.log(data);
        this.getTransactions();
      });
    },
    select(productId) {
      let selected = this.products.filter(product => {
        return product._id === productId;
      });
      this.selected = selected[0];
      this.$router.push("/admin/" + productId + "/edit");
      console.log(this.selected);
    }
  }
};
</script>

<style scoped>
.box:hover {
  background-color: #d71149;
  color: white;
}
</style>
