<template>
  <section class="container section">
    <h3 class="title">
      Medium
      <svg viewbox="0 0 24 24"><path fill="currentColor" d="M24 24h-24v-24h24v24zm-4.03-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z"/></svg>
      <a href="https://medium.com/@nicooprat">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
      </a>
    </h3>
    <nav v-if="articles">
      <medium-item v-for="article in articles" :article="article" :key="article.title"/>
    </nav>
  </section>
</template>

<script>
  import mediumItem from '~/components/mediumItem.vue'

  export default {
    components: {
      mediumItem,
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

  h3 {
    position: relative;
    display: flex;
    align-items: center;

    > svg {
      width: 1em;
      height: 1em;
      transform: scale(1.5) translateX(-10%);
      opacity: .125;
    }

    > a {
      margin-left: auto;
      border-bottom: none;
      color: inherit;

      > svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
    grid-gap: calc(var(--gutter) * 2) var(--gutter);
  }
</style>
