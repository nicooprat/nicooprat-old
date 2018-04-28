<template>
  <a :href="shot.html_url">
    <span>
      <img :src="shot.images.hidpi || shot.images.normal" :alt="shot.title" width="400" height="300">
    </span>
    <h4 v-text="shot.title"></h4>
    <small v-text="shot.description.replace(/(<([^>]+)>)/ig, ' ')"></small>
    <i v-for="tag in shot.tags" :key="tag">#{{tag}}</i>
  </a>
</template>

<script>
  export default {
    props: {
      shot: {
        title: {type: String, required: true},
        thumb: {type: String, required: true},
        excerpt: {type: String, required: false},
        link: {type: String, required: true},
      }
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
