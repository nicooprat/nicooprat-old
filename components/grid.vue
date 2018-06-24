<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
    grid-gap: calc(var(--gutter) * 2) var(--gutter);
    @include snap();

    > * {
      position: relative;
      transform-style: preserve-3d;

      // Fallback on Safari
      &:not([style]) {
        transition: transform 200ms;

        &:hover,
        &:focus {
          transform: translateY(-5px);
        }
      }

      &:hover,
      &:focus {
        z-index: 4;
        opacity: 1 !important;
      }

      &:before {
        content: '';
        background-color: var(--sectionColor);
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        margin: spacer(-1);
        opacity: 0;
        transition: all 200ms;
      }

      &:hover:before,
      &:focus:before {
        opacity: 1;
        box-shadow: 0 spacer() spacer(3) rgba(black,.1);
      }

      &:after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        background-color: rgba(white,.1);
        margin: spacer(-1);
        opacity: 0;
        transition: all 200ms;
      }

      &:hover:after,
      &:focus:after {
        opacity: 1;
      }
    }
  }
</style>
