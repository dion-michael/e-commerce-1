<template>
  <div class="home">
    <HeroNav />
    <div class="container" id="#shop">
      <div class="home-content">
        <carousel :items="5" :margin="20" :loop="true">
          <div v-for="(category, i) in categories" :key="i">
            <div class="tint">
              <img :src="'https://placeimg.com/200/200/any?' + i" />
            </div>
            <div class="centered subtitle categories">{{category}}</div>
          </div>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroNav from "@/components/HeroNav.vue";
import HeroProduct from "@/components/HeroProduct.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { mapState } from "vuex";
import Swiper from "swiper";
import carousel from "vue-owl-carousel";
import tile from "@/components/tile.vue";

export default {
  name: "home",
  components: {
    HeroNav,
    HeroProduct,
    VueperSlides,
    VueperSlide,
    carousel,
    tile
  },
  data() {
    return {
      categories: [
        "Shoes",
        "Bags",
        "Accesories",
        "Watch",
        "Shirts",
        "Casual Pants",
        "Chinos",
        "Jeans",
        "Footwear"
      ],
      slides: [
        {
          title: "Slide #1",
          content: "slide content"
        }
      ]
    };
  },
  methods: {
    goto(productId) {
      console.log(productId);
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    })
  }
};
</script>

<style scoped>
.title {
  font-family: "Playfair Display SC", serif;
}
.ex--center-mode {
  width: 600px;
  max-width: 100%;
  margin: auto;
}
.title.categories {
  color: white;
  font-weight: bolder;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tint:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: -moz-linear-gradient(
    45deg,
    rgba(15, 32, 39, 0.6) 0%,
    rgba(32, 58, 67, 0.6) 49%,
    rgba(44, 83, 100, 0.6) 100%
  );
  -moz-transition: background 0.3s linear;
  -webkit-transition: background 0.3s linear;
  -o-transition: background 0.3s linear;
  transition: background 0.3s linear;
}

.subtitle.centered {
  color: white;
  font-family: "Playfair Display SC", serif;
}
</style>

