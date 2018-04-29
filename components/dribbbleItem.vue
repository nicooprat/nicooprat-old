<template>
  <a :href="html_url">
    <span>
      <img :src="images.hidpi || images.normal" :alt="title" width="400" height="300">
    </span>
    <h4 v-text="title"></h4>
    <small v-text="description.replace(/(<([^>]+)>)/ig, ' ')"></small>
    <i v-for="tag in tags" :key="tag">#{{tag}}</i>
  </a>
</template>

<script>
  export default {
    props: {
      html_url: {type: String, required: true},
      images: {type: Object, required: true},
      description: {type: String, required: false},
      title: {type: String, required: true},
      tags: {type: Array, required: false}
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
    padding-bottom: 75%;
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

  i {
    display: inline-block;
    font-size: .8em;
    opacity: .5;

    & + & {
      margin-left: .5em;
    }
  }
</style>
