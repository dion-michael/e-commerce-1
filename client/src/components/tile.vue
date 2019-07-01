<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-4">
        <div class="tile is-parent">
          <article class="tile is-child notification is-light">
            <div class="content">
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?1"
                  width="200px"
                  height="200px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
              </div>
              <div class="has-text-centered">
                <b-field>
                  <b-numberinput min="0"></b-numberinput>
                </b-field>
                <a class="button is-primary">Add To Cart</a>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-light">
            <div class="content">
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?2"
                  width="200px"
                  height="200px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
                <div class="centered" v-if="showBuy">
                  <a class="button is-light">Add To Cart</a>
                </div>
              </div>
              <div class="has-text-centered">Product Name</div>
              <div class="has-text-centered">
                <b-field>
                  <b-numberinput min="0"></b-numberinput>
                </b-field>
                <a class="button is-primary">Add To Cart</a>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <div class="content">
            <div class="content is-vcentered">
              <!-- Content -->
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?3"
                  width="500px"
                  height="500px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
              </div>
              <div class="has-text-centered subtitle">Product Name</div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <div class="content">
            <div class="content">
              <!-- Content -->
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?4"
                  width="500px"
                  height="500px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
              </div>
              <div class="has-text-centered subtitle">Product Name</div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-4">
        <div class="tile is-parent">
          <article class="tile is-child notification is-light">
            <div class="content">
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?5"
                  width="200px"
                  height="200px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
                <div class="has-text-centered subtitle">Product Name</div>
              </div>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-light">
            <div class="content">
              <div class="box has-text-centered">
                <img
                  src="https://placeimg.com/200/200/any?6"
                  width="200px"
                  height="200px"
                  alt="image"
                  @mouseover="showBuy = true"
                  @mouseleave="showBuy = false"
                />
                <div class="has-text-centered subtitle">Product Name</div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBuy: false,
      quantity: 3
    };
  },
  components: {},
  methods: {
    updateQuantity(newQuantity) {
      this.quantity = newQuantity;
    }
  }
};
</script>

<style scoped>
.product-img {
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: fill;
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
