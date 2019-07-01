<template>
  <div id="app">
    <navbar />
    <router-view></router-view>
    <futer />
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import futer from "@/components/futer";
import HeroNav from "@/components/HeroNav";
export default {
  components: {
    navbar,
    futer,
    HeroNav
  },
  mounted() {
    this.$store.dispatch("getAllProducts");
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.$store.dispatch("getUserData");
      }
    }
  }
};
</script>


<style>
.hero.has-background {
  position: relative;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
.hero-background.is-transparent {
  opacity: 0.3;
}

html {
  scroll-behavior: smooth;
}
</style>
