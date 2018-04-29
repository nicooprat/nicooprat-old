<template>
  <main>
    <cover/>
    <intro/>
    <medium :articles="medium"/>
    <codepen :pens="codepen"/>
    <twitter :tweets="twitter"/>
    <meetup :events="meetup"/>
    <dribbble :shots="dribbble"/>
    <github :repos="github"/>

    <form name="contact" method="POST" netlify>
      <p>
        <label>Your Name: <input type="text" name="name"></label>
      </p>
      <p>
        <label>Your Email: <input type="email" name="email"></label>
      </p>
      <p>
        <label>Message: <textarea name="message"></textarea></label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  </main>
</template>

<script>
  import axios from 'axios'

  import cover from '~/components/cover.vue'
  import intro from '~/components/intro.vue'
  import medium from '~/components/medium.vue'
  import codepen from '~/components/codepen.vue'
  import twitter from '~/components/twitter.vue'
  import meetup from '~/components/meetup.vue'
  import dribbble from '~/components/dribbble.vue'
  import github from '~/components/github.vue'

  export default {
    components: {
      cover,
      intro,
      medium,
      codepen,
      twitter,
      twitter,
      meetup,
      dribbble,
      github,
    },

    data() {
      return {
        medium: [],
        codepen: [],
        twitter: [],
        meetup: [],
        dribbble: [],
        github: [],
      }
    },

    async asyncData({params, error}) {
      const medium = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/4jqjYdusZaPwu9bW7/lastExec/results?token=SJpxzSMzhGXDC8nJYND48RWNu')
      const codepen = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/gDEqWbPh4p97ukpEH/lastExec/results?token=oAHr2Bn6Hf73u7b2H2HjgWfct')
      const twitter = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/zGiqmuLEFgDLC8diQ/lastExec/results?token=TdPModM6r6EyB4BG89wcsXqww')
      const meetup = await axios.get('https://api.meetup.com/self/events?desc=true&scroll=next_upcoming&photo-host=secure&page=12&sig_id=144086432&sig=53af04b00dfc30e042a19bb595be7e054ff71487')
      const dribbble = await axios.get('https://api.dribbble.com/v2/user/shots?access_token=adf54688450e377e645e62c86e051ad245d211d71803266d099c54d4594a2234')
      const github = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/iMsuiLC6pCB3QFg6r/lastExec/results?token=Fo9YSdwmYwkY5e69ATkmpotJy')

      return {
        medium: medium.data && medium.data[0].pageFunctionResult.slice(0,6),
        codepen: codepen.data && codepen.data[0].pageFunctionResult.slice(0,6),
        twitter: twitter.data && twitter.data[0].pageFunctionResult.slice(0,6),
        meetup: meetup.data && meetup.data.slice(0,6),
        dribbble: dribbble.data && dribbble.data.slice(0,6),
        github: github.data && github.data[0].pageFunctionResult.slice(0,6),
      }
    },
  }
</script>

<style lang="scss">
  @import "normalize.css/normalize.css";
  @import "~/assets/common.scss";

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html {
    --link: #{$link};
    --color: #{$color};
    --gutter: #{$gutter};
  }

  html {
    color: var(--color);
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 18px;
    line-height: 1.4;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  a {
    color: var(--link);
    text-decoration: none;
    border-bottom: 1px solid;

    &:hover,
    &:focus {
      opacity: .5;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    padding-left: calc(50vw - 25rem);
    padding-right: calc(50vw - 25rem);
    border-left: var(--gutter) solid transparent;
    border-right: var(--gutter) solid transparent;
  }

  .section {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
</style>
