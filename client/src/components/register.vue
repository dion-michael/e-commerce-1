<template>
  <section>
    <form @submit.prevent="uploadImg">
      <b-field>
        <div class="columns">
          <div class="column"></div>
          <div class="column has-text-centered" :style="{'background-image': 'url('+imageurl+')'}">
            <b-upload v-model="file" drag-drop @input="testgambar">
              <section class="section" style="padding: 1.5rem 1.5rem">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                </div>
              </section>
            </b-upload>
            <p class="has-text-centered">{{filename}}</p>
          </div>
          <div class="column"></div>
        </div>
        <!-- <p>profile picture</p> -->
      </b-field>

      <b-field
        label="Username"
        :type="{
          'is-success':username.length !== 0 && username.length>=3,
          'is-danger': username.length === 0 && username.length<3
          }"
        :message="{
          'This username is available': username.length>5,
          'Username cannot be empty': username.length === 0
          }"
      >
        <b-input value maxlength="30" v-model="username"></b-input>
      </b-field>

      <b-field
        label="Email"
        :type="{'is-danger': email.length === 0}"
        :message="{'This email is invalid': email.length === 0}"
      >
        <b-input type="email" v-model="email" maxlength="30"></b-input>
      </b-field>

      <b-field
        label="Password"
        :type="{'is-danger': password.length<=8 && password.length !== 0, 'is-success': password.length>=8}"
        :message="[{'Password must have at least 8 characters': password.length<=8 && password.length !== 0}]"
      >
        <b-input v-model="password" type="password" maxlength="30"></b-input>
      </b-field>

      <b-field>
        <!-- Label left empty for spacing -->
        <p class="control">
          <button class="button is-dark" :class="{'is-loading': loading}" type="submit">Register</button>
        </p>
      </b-field>
    </form>
  </section>
</template>

<script>
import api from "@/api/ecommerce";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      file: null,
      ispassworderr: true,
      username: "",
      email: "",
      password: "",
      picture: "",
      imageurl: null,
      imgbg: "",
      loading: false,
      filename: "Profile Picture"
    };
  },
  watch: {
    password: function() {
      console.log(this.password);
    }
  },
  methods: {
    testgambar() {
      this.filename = this.file.name;
      // Create a new instance of the FileReader
      var reader = new FileReader();

      // Read the local file as a DataURL
      reader.readAsDataURL(this.file);

      // When loaded, set image data as background of page
      reader.onloadend = () => {
        this.imageurl = reader.result;
      };
    },
    login() {
      api({
        url: "/users/login",
        method: "POST",
        data: {
          email: this.email,
          password: this.password
        }
      }).then(({ data }) => {
        localStorage.setItem("token", data.token);
        api.defaults.headers.common["token"] = data.token;
        this.$store.dispatch("setLogin", true);
        this.$store.dispatch("getUserData");
        this.toast("is-success");
        this.email = "";
        this.password = "";
      });
    },
    logout() {
      localStorage.removeItem("token");
      api.defaults.headers.common["token"] = "";
      this.$store.commit("setLogin", false);
      this.$store.commit("setUserData", {});
    },
    toast(type) {
      this.$toast.open({
        message: `successfully signed in`,
        type: type
      });
      this.username = "";
    },
    register() {
      this.$store
        .dispatch("register", {
          username: this.username,
          email: this.email,
          password: this.password,
          image: this.imageurl
        })
        .then(userData => {
          this.empty();
          Swal.fire(
            "Success",
            "Please login with your newly registered account",
            "success"
          );
        })
        .catch(err => {
          Swal.fire("Oops!", "Something went wrong", "error");
        });
    },
    empty() {
      this.username = "";
      this.email = "";
      this.password = "";
      this.image = "";
      this.filename = "";
      this.imageurl = "";
      this.file = null;
    },
    uploadImg() {
      if (this.file) {
        let formData = new FormData();
        this.loading = true;
        console.log(this.file);
        formData.append("image", this.file);
        console.log(formData);
        api({
          url: "/upload",
          method: "POST",
          timeout: 8000,
          data: formData
        })
          .then(({ data }) => {
            this.imageurl = data.link;
            console.log(data.link);
            this.register();
            this.loading = false;
            // this.registerNew();
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        this.registerNew();
      }
    }
  }
};
</script>

<style scoped>
.upload-draggable.is-primary {
  border-radius: 50% !important;
}
</style>
