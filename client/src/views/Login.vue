<template>
  <section class="section" style="margin-top: 52px">
    <div class="container" style="max-width: 750px">
      <div class="columns">
        <div class="column">
          <p class="title has-text-centered">Register</p>
          <div class="box">
            <register />
          </div>
        </div>
        <div class="column">
          <p class="title has-text-centered">Login</p>
          <div class="box">
            <loginform />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import register from "@/components/register.vue";
import loginform from "@/components/loginform.vue";
export default {
  components: {
    register,
    loginform
  }
};
</script>

<style>
</style>
