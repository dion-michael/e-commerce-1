<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-256x256">
        <img :src="item.productId.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{item.productId.name}}</strong>
          <br />
          <span>
            IDR
            <strong>{{item.productId.price | numFormat}} x {{item.quantity}}</strong>
          </span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" @click="removeCart(item.productId._id)">
            <span class="icon is-small">
              <i class="fas fa-minus"></i>
            </span>
          </a>
          <span class="level-item">
            <span class="icon is-small">{{item.quantity}}</span>
          </span>
          <a class="level-item" @click="addCart(item.productId._id)">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
          </a>
        </div>
      </nav>
      <div class="content">
        <p class="title is-4">IDR {{item.subtotal | numFormat}}</p>
      </div>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<script>
export default {
  props: ["item"],
  methods: {
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

<style>
</style>
