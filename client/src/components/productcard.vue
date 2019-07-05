<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img class="fit" alt="Placeholder image" :src="product.image" @click="$emit('imageclicked', product._id)" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-6">
            <a>{{product.name}}</a>
          </p>
          <p class="subtitle is-6">IDR {{product.price | numFormat}}</p>
        </div>
      </div>

      <div class="content">
        <p class="buttons">
          <a @click="addToCart(product._id)" class="button is-small" v-if="!hidecart">add to cart</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "buefy/dist/components/toast";
export default {
  props: ["product", "hidecart"],
  methods: {
    addToCart(productId) {
      this.$store.dispatch("addCart", productId);
      Toast.open({
        type: "is-success",
        message: "successfully added to cart"
      });
      console.log("masuk", productId);
    }
  }
};
</script>

<style>
</style>
