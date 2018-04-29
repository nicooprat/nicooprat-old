<template>
  <a :href="link">
    <span>
      <img v-if="thumb" :src="thumb" :alt="title">
    </span>
    <h4 v-text="title"></h4>
    <small v-text="excerpt"></small>
  </a>
</template>

<script>
  export default {
    props: {
      title: {type: String, required: true},
      thumb: {type: [String, Boolean], required: true},
      excerpt: {type: String, required: false},
      link: {type: String, required: true},
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: none;
  }

  span {
    display: block;
    position: relative;
    padding-bottom: 56%;
    background-color: rgba(black,.03);
    margin-bottom: calc(var(--gutter) / 2);
    overflow: hidden;
  }

  img {
    display: block;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  h4 {
    margin: 0;
  }

  small {
    display: block;
    margin-top: calc(var(--gutter) / 2);
  }
</style>
