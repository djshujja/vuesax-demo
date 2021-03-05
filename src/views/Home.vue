<template>
  <div>
    <b-card title="Changes I made ✨">
      <b-card-text>I used to starter template & made some changes.</b-card-text>
      <b-card-text>I've added 🐱 & 🐶 Menus</b-card-text>
      <b-card-text>Showing images from unsplash.com</b-card-text>
    </b-card>

    <b-card title="Removed Unused Components ❌">
      <b-card-text
        >I've also removed any unused componnets from the template as well!
        :)</b-card-text
      >
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
};
</script>

<style></style>
