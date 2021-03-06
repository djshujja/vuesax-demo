<template>
  <div>
    <b-card>
      <b-button variant="success" class="mb-2 offset-11" v-b-modal.modal-1>
        New
      </b-button>
      <b-modal
        id="modal-1"
        title="Add New Product"
        cancel-variant="danger"
        ok-variant="success"
        ok-title="Add"
        @ok="handleSubmit()"
      >
        <b-form>
          <b-form-select v-model="newCategory">
            <b-form-select-option :value="null" disabled
              >Please select an option</b-form-select-option
            >
            <b-form-select-option
              class="mt-3"
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.title }}
            </b-form-select-option>
          </b-form-select>
          <b-form-group
            label="Product Title"
            label-for="input-1"
            description="Enter a valid title for Product"
          >
            <b-form-input
              v-model="form.title"
              id="input-1"
              type="text"
              placeholder="e.g. Air Jordan 3"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Product Price"
            label-for="product_price"
            description="Enter a valid price for Product"
          >
            <b-form-input
              v-model="form.price"
              id="product_price"
              type="number"
              placeholder="e.g. 50"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>

      <b-form-group
        label="Product Category"
        label-for="product_category"
        description="Select a category"
        class="mb-3"
      >
        <b-form-select
          id="product_category"
          v-model="selected"
          @change="fetchProducts()"
        >
          <b-form-select-option :value="null"
            >All Products</b-form-select-option
          >
          <b-form-select-option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.title }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-table
        striped
        hover
        light
        v-if="items.length > 0"
        :items="items"
        head-variant="dark"
        :fields="fields"
      >
        <template #cell(actions)="row">
          <b-button
            class="mr-1"
            variant="warning"
            @click="handleEdit(row.item)"
          >
            Edit
          </b-button>
          <b-button
            class="mr-1"
            variant="danger"
            @click="handleDelete(row.item)"
          >
            Delete</b-button
          >
        </template>
      </b-table>

      <h4 v-else class="text-center">
        No Products available in the selected category
      </h4>
    </b-card>
  </div>
</template>

<script>
import {
  BTable,
  BButton,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormSelectOption,
} from "bootstrap-vue";

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormSelectOption,
  },
  data() {
    return {
      selected: null,
      newCategory: null,
      categories: [],
      items: [],
      form: {
        title: "",
        price: "",
        category: "",
      },
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "price",
          label: "Price",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  async mounted() {
    await this.$http.post("/products").then((res) => {
      this.items = res.data;
    });
    await this.$http.get("/categories").then((res) => {
      this.categories = res.data;
    });
  },
  methods: {
    async fetchProducts() {
      await this.$http
        .post("/products", {
          category: this.selected,
        })
        .then((res) => (this.items = res.data));
    },
    async handleSubmit() {
      this.form.category = this.newCategory;
      await this.$http.post("/products/new", this.form).then((res) => {
        this.items.push(res.data);
        this.form = {};
      });
    },
    async handleDelete(item) {
      await this.$http.delete(`/products/${item._id}`).then((res) => {
        this.items.splice(this.items.indexOf(res.data), 1);
      });
    },
    handleEdit(item) {
      console.log(item._id);
    },
  },
};
</script>

<style></style>
