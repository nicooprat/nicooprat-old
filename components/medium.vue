<template>
  <section class="container section">
    <heading title="Medium" link="https://medium.com/@nicooprat">
      <svg slot="icon" viewbox="0 0 24 24"><path fill="currentColor" d="M24 24h-24v-24h24v24zm-4.03-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z"/></svg>
    </heading>

    <grid :items="articles">
      <medium-item v-for="article in articles" v-bind="article" :key="article.title"/>
    </grid>
  </section>
</template>

<script>
  import mediumItem from '~/components/mediumItem.vue'
  import heading from '~/components/heading.vue'
  import grid from '~/components/grid.vue'

  export default {
    components: {
      mediumItem,
      heading,
      grid,
    },

    props: {
      articles: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  section {
    --sectionColor: var(--bgColor);
  }

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
    grid-gap: calc(var(--gutter) * 2) var(--gutter);
    @include snap();
  }
</style>
