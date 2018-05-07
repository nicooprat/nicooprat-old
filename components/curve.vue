<template>
  <div :style="styles">
    <svg class="top" viewBox="0 0 500 105" PreserveAspectRatio="none">
      <path :fill="bottom" d="M250,104.6C152.1,104.6,63.7,64.6,0,0l0,105.1h500V0C436.3,64.6,347.9,104.6,250,104.6z"/>
    </svg>
    <svg class="bottom" viewBox="0 0 500 105" PreserveAspectRatio="none">
      <path :fill="top" d="M250,0.5c97.9,0,186.3,40,250,104.6V0H0v105.1C63.7,40.5,152.1,0.5,250,0.5z"/>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      top: String,
      bottom: String
    },

    data() {
      return {
        scrollY: 0,
        deltaY: 0,
        scaleY: 0,
        slowness: .85
      }
    },

    computed: {
      styles() {
        return {
          '--transformTop': this.minmax(this.scaleY, 0, 1).toFixed(4),
          '--transformBottom': this.minmax(-this.scaleY, 0, 1).toFixed(4),
        }
      }
    },

    watch: {
      scrollY(val, oldVal) {
        this.deltaY = oldVal - val
      },
      deltaY(val, oldVal) {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const vmax = vw+vh
        this.scaleY += val / (vmax/2)
      },
    },

    mounted() {
      document.addEventListener('scroll', this.handleScroll)
      requestAnimationFrame(this.slowDown)
    },

    beforeDestroy() {
      document.removeEventListener('scroll', this.handleScroll)
    },

    methods: {
      handleScroll(e) {
        this.scrollY = window.scrollY
      },
      slowDown(e) {
        this.scaleY *= this.slowness
        requestAnimationFrame(this.slowDown)
      },
      minmax: (val, min, max) => Math.max(min, Math.min(max, val))
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  div {
    --transformTop: 0;
    --transformBottom: 0;
    position: absolute;
    z-index: 3;
    width: 100%;
    transform: translate3d(0,-50%,0);
  }

  svg {
    display: block;
  }

  .top {
    margin-bottom: -1px;
    transform: scaleY(var(--transformTop));
    transform-origin: bottom;
  }

  .bottom {
    margin-top: -1px;
    transform: scaleY(var(--transformBottom));
    transform-origin: top;
  }
</style>
