<template>
  <a :href="html_url">
    <span>
      <img :src="lazySrc" :data-src="src" :alt="title" width="400" height="300">
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
    },

    data() {
      return {
        lazySrc: !process.browser, // Only load if SSR
        src: this.images.hidpi || this.images.normal
      }
    },

    mounted() {
      // Lazy load tweets
      if( typeof(IntersectionObserver) != 'undefined' ) {
        const component = this
        new IntersectionObserver(function(entries) {
          if(entries[0].isIntersecting) {
            component.loadImg()
            this.disconnect()
          }
        }, {
          rootMargin: '50%'
        }).observe(this.$el)
      } else {
        setTimeout(() => this.loadImg(), 2000)
      }
    },

    methods: {
      loadImg() {
        this.lazySrc = this.src
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: none;
    transform-style: preserve-3d;

    &:hover span,
    &:focus span {
      transform: translateZ(20px);
    }
  }

  span {
    display: block;
    position: relative;
    padding-bottom: 75%;
    background-color: rgba(black,.03);
    margin-bottom: calc(var(--gutter) / 2);
    overflow: hidden;
    transform: translate3d(0,0,20px);
  }

  img {
    display: block;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    overflow: hidden;

    &:not([src]) {
      visibility: hidden;
    }
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
