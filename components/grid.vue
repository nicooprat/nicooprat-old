<template>
  <nav>
    <slot></slot>
  </nav>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
    grid-gap: calc(var(--gutter) * 2) var(--gutter);
    @include snap();
  }
</style>
