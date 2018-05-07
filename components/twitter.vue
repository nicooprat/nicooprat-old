<template>
  <section class="container section">
    <heading title="Twitter" link="https://twitter.com/nicooprat">
      <svg slot="icon" viewbox="0 0 24 24"><path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
    </heading>

    <nav v-if="tweets">
      <div v-for="tweet in tweets" :key="tweet.id">
        <blockquote class="twitter-tweet" data-lang="fr">
          <p :lang="tweet.lang" dir="ltr" v-html="tweet.content"></p>
          &mdash; Nico Prat (@nicooprat) <a :href="'https://twitter.com'+tweet.link" v-text="tweet.date"></a></blockquote>
        </div>
    </nav>
  </section>
</template>

<script>
  import heading from '~/components/heading.vue'

  export default {
    components: {
      heading,
    },

    props: {
      tweets: {
        type: Array,
        required: true
      }
    },

    mounted() {
      let script = document.createElement('script')
      script.onload = function () {
        typeof(twttr) != 'undefined' && twttr.widgets.load()
      }
      script.src = '//platform.twitter.com/widgets.js'
      document.body.appendChild(script)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  section {
    --sectionColor: #2aa3ef;
    color: white;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(260px,1fr));
    grid-gap: calc(var(--gutter) * 2) var(--gutter);
    @include snap();

    .twitter-tweet {
      margin: 0 !important;
      background-color: rgba(black,.05);
    }
  }
</style>
