<template>
  <section class="hero is-dark is-fullheight animated fadeIn">
    <img
      src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=format%2Ccompress&cs=tinysrgb&h=750&w=1260"
      alt
      class="hero-background is-transparent"
    />
    <div class="hero-body">
      <div class="container">
        <div class="hero-text animated fadeInDown">
          <h1
            class="title is-size-2 is-size-4-mobile"
          >“Being perfectly well-dressed gives one a tranquillity that no religion can bestow.”</h1>
          <h2 class="subtitle is-size-5">Ralph Waldo Emerson</h2>
          <router-link class="button" to="/shop">Start Shopping</router-link>
        </div>
      </div>
    </div>
    <div id="shop"></div>
  </section>
</template>

<script>
import navbar from "@/components/navbar";
export default {
  components: {
    navbar
  }
};
</script>

<style>
.hero-text {
  font-family: "Playfair Display SC", serif;
  line-break: loose;
}

.hero-text {
  text-align: center;
  padding: 0 200px;
}
</style>
