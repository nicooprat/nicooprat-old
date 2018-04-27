<template>
  <main>
    <cover/>
    <intro/>
    <medium :articles="medium"/>
  </main>
</template>

<script>
  import axios from 'axios'

  import cover from '~/components/cover.vue'
  import intro from '~/components/intro.vue'
  import medium from '~/components/medium.vue'

  export default {
    components: {
      cover,
      intro,
      medium,
    },

    data() {
      return {
        medium: []
      }
    },

    async asyncData({params, error}) {
      const res = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/4jqjYdusZaPwu9bW7/lastExec/results?token=SJpxzSMzhGXDC8nJYND48RWNu')
      return {
        medium: res.data[0].pageFunctionResult
      }
    },
  }
</script>

<style>
</style>
