<template>
  <section class="section" style="margin-top: 58px">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title">Transactions</h1>
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
              <tr v-for="(transaction, i) in userTransactions" :key="i">
                <th>{{i+1}}</th>
                <td>{{transaction._id}}</td>
                <td>{{transaction.createdAt | moment("DD/MM/YYYY") }}</td>
                <td>{{transaction.items.length}}</td>
                <td>{{transaction.total | numFormat}}</td>
                <td>{{transaction.status}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="column is-6">
          <p class="title">Details</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userTransactions: ""
    };
  },
  mounted() {
    this.$store.dispatch("getUserTransactions").then(success => {
      console.log(success);
      this.$store.commit("setUserTransactions", success);
      console.log(this.userTransactions);
      this.userTransactions = success;
    });
  }
};
</script>

<style>
</style>
