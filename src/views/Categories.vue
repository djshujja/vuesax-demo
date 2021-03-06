<template>
  <div>
    <b-card title="Categories">
      <b-button variant="success" class="mb-2 offset-11" v-b-modal.modal-1>
        New
      </b-button>
      <b-modal
        id="modal-1"
        title="Add New Category"
        cancel-variant="danger"
        ok-variant="success"
        ok-title="Add"
        @ok="handleSubmit()"
      >
        <b-form>
          <b-form-group
            label="Category Title"
            label-for="input-1"
            description="Enter a valid title for Category"
          >
            <b-form-input
              v-model="form.title"
              id="input-1"
              type="text"
              placeholder="e.g. Shirts"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <b-table
        striped
        hover
        light
        :items="items"
        head-variant="dark"
        :fields="fields"
      >
        <template #cell(actions)="row">
          <b-button
            class="mr-1"
            variant="warning"
            @click="editCategory(row.item)"
          >
            Edit
          </b-button>
          <b-button
            class="mr-1"
            variant="danger"
            @click="deleteCategory(row.item)"
          >
            Delete</b-button
          >
        </template>
      </b-table>
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
} from "bootstrap-vue";

export default {
  components: {
    BTable,
    BButton,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      items: [],
      isBusy: true,
      fields: [
        {
          key: "title",
          label: "Title",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions" },
      ],
      form: {
        title: "",
      },
    };
  },
  async mounted() {
    this.isBusy = true;
    await this.$http.get("http://localhost:9000/categories/").then((res) => {
      this.items = res.data;
      this.isBusy = false;
    });
  },
  methods: {
    editCategory(item) {
      console.log(item._id);
    },
    async deleteCategory(item) {
      await this.$http.delete(`/categories/${item._id}`).then((res) => {
        this.items.splice(this.items.indexOf(res.data), 1);
      });
    },
    async handleSubmit() {
      await this.$http.post("/categories/", this.form).then((res) => {
        this.items.push(res.data);
        this.form = {};
      });
    },
  },
};
</script>

<style></style>
