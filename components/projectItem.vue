<template>
  <a :href="link" :style="{'--color': color}">
    <img v-if="logo" :src="`/logos/${logo}.svg`" :alt="title">
    <h4 v-text="title"></h4>
    <small v-text="desc"></small>
  </a>
</template>

<script>
  export default {
    props: {
      title: {type: String, required: true},
      logo: {type: String, required: true},
      desc: {type: String, required: true},
      link: {type: String, required: true},
      color: {type: String, required: true},
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: none;
    text-align: center;

    &:hover span,
    &:focus span {
      transform: translateZ(20px);
    }
  }

  img {
    display: inline-block;
    width: auto;
    height: auto;
    max-height: 120px;
    margin: 1em auto;
  }

  h4 {
    margin: 0;
    color: var(--color);
  }

  small {
    display: block;
    margin: calc(var(--gutter) / 2) auto;
    word-wrap: break-word;
    max-width: 20em;
  }

  i {
    display: inline-flex;
    align-items: center;
    font-style: normal;
    font-size: .8em;
    opacity: .5;
    margin-right: .75em;
    font-weight: 600;

    svg {
      margin-right: .25em;
      width: .9em;
      height: .9em;
    }
  }
</style>
