<template>
  <section class="section" style="margin-top: 58px">
    <div class="container">
      <div class="columns">
        <div class="column">
          <cartlist v-for="(item, i) in cart" :key="i" :item="item" />
        </div>
        <div class="column is-two-fifths">
          <div class="box">
            <p class="title">Total</p>
            <span>
              <span class="subtitle" style="margin-right: 20px">IDR</span>
              <span class="title">{{cartTotal | numFormat}}</span>
              <section class="section">
                <paymentform />
              </section>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import cartlist from "@/components/cartlist.vue";
import paymentform from "@/components/paymentform.vue";
import { mapState } from "vuex";
export default {
  components: {
    cartlist,
    paymentform
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
    cart() {
      return this.userData.cart;
    },
    cartTotal() {
      let total = 0;
      this.userData.cart.forEach(cart => {
        total += cart.subtotal;
      });
      return total;
    }
  }
};
</script>

<style>
</style>
