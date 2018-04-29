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
      thumb: {type: String, required: true},
      excerpt: {type: String, required: false},
      link: {type: String, required: true},
      slug: {type: String, required: true},
      views: {type: Number, required: false},
      comments: {type: Number, required: false},
      loves: {type: Number, required: false},
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

    &:before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      box-shadow: 0 0 0 2px var(--color) inset;
      opacity: .1;
      z-index: 1;
    }
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
    word-wrap: break-word;
  }
</style>
