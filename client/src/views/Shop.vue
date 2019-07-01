<template>
  <div style="margin-top: 58px">
    <div class="container">
      <section class="section">
        <b-tabs v-model="activeTab" position="is-centered">
          <b-tab-item label="Featured" id="featured">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in featured" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="Accesories">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in accessories" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Bags / Wallets" id="bags-wallets">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in bagwallets" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Hoodies">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in hoodies" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Jackets/Coats">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in jacketcoats" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Pants">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in pants" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Shirts">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in shirts" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Sweaters">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in sweaters" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="T-Shirts">
            <div class="columns is-vcentered is-multiline">
              <div class="column is-3" v-for="product in tshirts" :key="product._id">
                <productcard :product="product" />
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import productcard from "@/components/productcard";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeTab: 0
    };
  },
  components: {
    navbar,
    productcard
  },
  computed: {
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
    this.activeTab = Number(this.$route.query.activeTab);
  },
  watch: {
    "$route.query.activeTab": function() {
      console.log("changed");
      this.activeTab = Number(this.$route.query.activeTab);
    }
  }
};
</script>


<style scoped>
.navbar-container {
  background-color: black;
}
</style>
