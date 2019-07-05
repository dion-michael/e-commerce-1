<template>
  <div>
    <div class="card" v-if="selected.hasOwnProperty('_id')">
      <header class="card-header">
        <p class="card-header-title" v-if="selected">
          {{selected.name}}
          <br />
          {{selected.description}}
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <p class="has-text-centered">
            <img :src="selected.image" width="300px" height="300px" />
          </p>
          <a href="#">IDR {{selected.price | numFormat}}</a>
          <br />
          <p>Stock: {{selected.stock}}</p>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a class="card-footer-item" @click="del">Delete</a>
      </footer>
    </div>
    <div class="box" style="margin-top: 20px">
      <form @submit.prevent="update">
        <b-field label="Product name">
          <b-input type="text" v-model="name"></b-input>
        </b-field>
        <b-field label="Description">
          <b-input type="text" :value="selected.description" v-model="desc"></b-input>
        </b-field>
        <b-field label="Price">
          <b-input type="number" :value="selected.price" v-model="price"></b-input>
        </b-field>
        <b-field label="Stock">
          <b-numberinput v-model="selected.stock"></b-numberinput>
        </b-field>
        <b-field label="Category">
          <b-select :placeholder="selected.section" v-model="cat">
            <option v-for="(category, i) in categories" :value="category" :key="i">{{ category }}</option>
          </b-select>
        </b-field>
        <b-field label="Image">
          <b-field class="Image">
            <b-upload v-model="file" @input="upload">
              <a class="button is-primary" :class="{'is-loading': loading}">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="file">{{ file.name }}</span>
            <span class="file-name" v-if="!file">{{ selected.image }}</span>
          </b-field>
        </b-field>
        <button class="button" type="submit" :class="{'is-loading': loading}">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["selected"],
  methods: {
    ...mapActions([
      "deleteItem",
      "getAllProducts",
      "uploadImg",
      "updateProduct"
    ]),
    del() {
      console.log(this.$route.params.productId);
      this.$dialog.confirm({
        title: "Deleting item",
        message:
          "Are you sure you want to <b>delete</b> this item? This action cannot be undone.",
        confirmText: "Delete Item",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.deleteItem(this.$route.params.productId)
            .then(() => {
              this.getAllProducts();
              this.$toast.open({
                type: "is-success",
                message: "successfully delete 1 item"
              });
              this.$emit("deleted");
            })
            .catch(err => {
              console.log(err);
              this.$toast.open({
                message: "unknown error occured",
                type: "is-danger"
              });
            });
        }
      });
    },
    update() {
      let image = this.fileurl;
      if (!image) image = this.selected.image;
      let data = {
        productId: this.$route.params.productId,
        data: {
          name: this.name,
          description: this.desc,
          price: this.price,
          stock: this.selected.stock,
          section: this.cat,
          image
        }
      };
      this.updateProduct(data);
      console.log();
      this.selected = {};
    },
    upload() {
      this.loading = true;
      this.uploadImg(this.file).then(link => {
        console.log(link);
        this.fileurl = link;
        this.loading = false;
      });
    }
  },
  data() {
    return {
      categories: [
        "featured",
        "accesories",
        "Wallet & Bag",
        "hoodies",
        "Jacket-coat-blazer",
        "Pants",
        "Shirt",
        "Sweater",
        "T-shirt"
      ],
      loading: false,
      file: null,
      fileurl: "",
      name: "",
      desc: "",
      price: "",
      cat: ""
    };
  },
  created() {
    console.log(this.selected);
  },
  watch: {
    selected() {
      this.fileurl = this.selected.image;
      this.name = this.selected.name;
      this.desc = this.selected.description;
      this.price = this.selected.price;
      this.cat = this.selected.section;
      console.log(this.cat);
    }
  }
};
</script>

<style>
</style>
