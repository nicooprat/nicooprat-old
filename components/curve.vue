<template>
  <div aria-hidden="true">
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
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  div {
    position: absolute;
    z-index: 2;
    width: 100%;
    transform: translate3d(0,-50%,0);
    pointer-events: none;
    overflow: hidden;
  }

  svg {
    display: block;
  }

  .top {
    // 1.1 = 1px margin on Safari
    transform: scale3d(1.1, var(--transform-top), 1);
    transform-origin: bottom;
  }

  .bottom {
    // 1.1 = 1px margin on Safari
    transform: scale3d(1.1, var(--transform-bottom), 1);
    transform-origin: top;
    margin-top: -1px; // Fix overlapping
  }
</style>
