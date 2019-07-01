<template>
  <section class="section" style="margin-top: 58px">
    <p class="title">Admin page</p>
    <div class="columns">
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
        <b-tabs position="is-centered" class="block">
          <b-tab-item label="Pictures">lorem</b-tab-item>
          <b-tab-item label="Music">ipsum</b-tab-item>
          <b-tab-item label="Videos">dolor</b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import api from "@/api/ecommerce";
export default {
  data() {
    return {
      toggle: 0,
      transactions: null,
      status: "ON DELIVERY"
    };
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
