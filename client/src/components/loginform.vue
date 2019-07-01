<template>
  <section>
    <form @submit.prevent="login">
      <b-field label="Username" :type="{ 'is-danger': hasError }">
        <b-input v-model="email" maxlength="30" required></b-input>
      </b-field>

      <b-field
        label="Password"
        :type="{ 'is-danger': hasError }"
        :message="[
                { 'Password is too short': hasError },
                { 'Password must have at least 8 characters': hasError }
            ]"
      >
        <b-input v-model="password" type="password" maxlength="30" required></b-input>
      </b-field>
      <b-field>
        <!-- Label left empty for spacing -->
        <p class="control">
          <button class="button is-dark" :class="{'is-loading': loading}" type="submit">Log in</button>
        </p>
      </b-field>
    </form>
  </section>
</template>

<script>
import { Toast } from "buefy/dist/components/toast";
export default {
  name: "loginform",
  data() {
    return {
      hasError: false,
      loading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(success => {
          this.$router.push("/");
          Toast.open({
            type: "is-success",
            message: "successfully log in"
          });
        });
    }
  }
};
</script>
