<template>
  <section>
    <form @submit.prevent="checkout">
      <b-field horizontal label="From">
        <b-input
          :value="userData.username"
          name="name"
          placeholder="Name"
          v-model="username"
          expanded
          disabled
        ></b-input>
        <b-input
          :value="userData.email"
          v-model="email"
          name="email"
          type="email"
          placeholder="Email"
          expanded
          disabled
        ></b-input>
      </b-field>

      <b-field horizontal label="Payment Method">
        <b-select expanded placeholder="Select a payment method" v-model="method">
          <option value="CC">Credit Card</option>
          <option value="ATM">ATM Transfer</option>
        </b-select>
      </b-field>

      <b-field horizontal v-if="method === 'CC'">
        <b-input placeholder="Credit card" icon-pack="far" icon="credit-card"></b-input>
      </b-field>

      <b-field horizontal>
        <b-notification v-if="method === 'ATM'" type="is-info" has-icon>
          Please transfer the exact amount so your transaction can be processed immediately.
          <div class="box" style="margin: 10px 0">
            <p class="has-text-centered">Our Account:</p>
            <p class="has-text-centered">
              <strong class="subtitle">0262 378 444 (BNI)</strong>
            </p>
          </div>
        </b-notification>
      </b-field>

      <b-field horizontal label="Shipping Address">
        <b-input type="textarea"></b-input>
      </b-field>

      <b-field horizontal>
        <!-- Label left empty for spacing -->
        <p class="control">
          <button class="button is-success">Proceed</button>
        </p>
      </b-field>
    </form>
  </section>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ccnumber: "",
      method: "",
      username: "",
      email: "",
      address: ""
    };
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    })
  },
  mounted() {
    this.username = this.userData.username;
    this.email = this.userData.email;
  },
  methods: {
    checkout() {
      let data = {
        ccnumber: this.ccnumber,
        method: this.method,
        username: this.username,
        email: this.email,
        address: this.address
      };
      this.$store.dispatch("checkout", data).then(success => {
        console.log(success);
        this.$router.push("/transactions");
      });
    }
  }
};
</script>
