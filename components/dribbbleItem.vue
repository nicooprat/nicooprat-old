<template>
  <a :href="html_url" @mouseenter="mouseEnter" @touchstart="mouseEnter" @mouseleave="mouseLeave" @touchend="mouseLeave" :data-state="state">
    <span>
      <img :src="src" :data-src="lazySrc" :alt="title" width="400" height="300">
      <button v-if="state !== 'loaded' && isGif">
        <strong v-if="state === 'standby' || state === 'loaded' && !hovering">&nbsp;▶︎</strong>
        <strong v-if="state === 'loading'">∙∙∙</strong>
      </button>
      <img class="gif" v-if="state !== 'standby' && isGif && hovering" :src="images.hidpi || images.normal" :alt="title" width="400" height="300" @load="gifLoaded">
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
      const isGif = this.images.normal.includes('.gif')
      return {
        isGif,
        lazySrc: isGif ? this.images.teaser : this.images.hidpi,
        src: false,
        state: isGif ? 'standby' : 'loaded',
        hovering: false
      }
    },

    mounted() {
      // Lazy load dribbbles
      if( typeof(IntersectionObserver) != 'undefined' ) {
        const component = this
        new IntersectionObserver(function(entries) {
          if(entries[0].isIntersecting) {
            component.loadSrc()
            this.disconnect()
          }
        }, {
          rootMargin: '50%'
        }).observe(this.$el)
      } else {
        setTimeout(() => this.loadSrc(), 2000)
      }
    },

    methods: {
      loadSrc() {
        this.src = this.lazySrc
      },
      mouseEnter(e) {
        this.state = 'loading'
        this.hovering = true
      },
      mouseLeave(e) {
        this.state = 'standby'
        this.hovering = false
      },
      gifLoaded(e) {
        this.state = 'loaded'
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
    background: center no-repeat rgba(black,.03);
    background-size: cover;
    margin-bottom: calc(var(--gutter) / 2);
    overflow: hidden;
    transform: translateZ(0px);
    transition: transform 200ms;
    perspective: 100px;
  }

  img {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    overflow: hidden;

    // Lazyload
    &:not([src]) {
      visibility: hidden;
    }

    &.gif {
      display: none;
    }
  }

  a[data-state="loading"] {

    button {
      animation: loading .8s infinite alternate ease-in-out;

      @keyframes loading {
        to {
          transform: translate3d(-50%,-50%,-30px);
        }
      }
    }
  }

  a[data-state="loaded"] {

    .gif {
      display: block;
    }
  }

  button {
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%; left: 50%;
    width: 2.5em; height: 2.5em;
    background: white;
    padding: 0;
    border: none;
    font: inherit;
    color: $color;
    border-radius: 999px;
    transform: translate(-50%,-50%);
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
