<template>
  <main :style="styles">
    <cover/>
    <curve top="#4c91dd" bottom="white"/>
    <intro/>
    <curve top="white" bottom="#f5f6f7"/>
    <medium :articles="medium"/>
    <curve top="#f5f6f7" bottom="#f44362"/>
    <meetup :events="meetup"/>
    <curve top="#f44362" bottom="#343338"/>
    <codepen :pens="codepen"/>
    <curve top="#343338" bottom="#08a2ec"/>
    <twitter :tweets="twitter"/>
    <curve top="#08a2ec" bottom="#25292e"/>
    <github :repos="github"/>
    <curve top="#25292e" bottom="#f04a89"/>
    <dribbble :shots="dribbble"/>

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

  import curve from '~/components/curve.vue'

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
      curve,
    },

    data() {
      return {
        medium: [],
        codepen: [],
        twitter: [],
        meetup: [],
        dribbble: [],
        github: [],

        scrollY: 0,
        deltaY: 0,
        scaleY: 0,
        slowness: .85,
        accelerator: 1
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
        this.deltaY = (oldVal - val) * this.accelerator
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
    },

    async asyncData({params, error}) {
      const medium = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/4jqjYdusZaPwu9bW7/lastExec/results?token=SJpxzSMzhGXDC8nJYND48RWNu')
      const codepen = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/gDEqWbPh4p97ukpEH/lastExec/results?token=oAHr2Bn6Hf73u7b2H2HjgWfct')
      const twitter = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/zGiqmuLEFgDLC8diQ/lastExec/results?token=TdPModM6r6EyB4BG89wcsXqww')
      const meetupUpcoming = await axios.get('https://api.meetup.com/self/events?scroll=future_or_past&photo-host=public&page=6&sig_id=144086432&status=upcoming&fields=group&sig=67fd9ec1b81b7a6027f7332221810b77e262ec20')
      const meetupPast = await axios.get('https://api.meetup.com/self/events?desc=true&scroll=future_or_past&photo-host=public&page=6&sig_id=144086432&status=past&fields=group&sig=23e9ab019654e79ba238dc9e3a32de09cc4bac47')
      const dribbble = await axios.get('https://api.dribbble.com/v2/user/shots?access_token=adf54688450e377e645e62c86e051ad245d211d71803266d099c54d4594a2234')
      const github = await axios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/iMsuiLC6pCB3QFg6r/lastExec/results?token=Fo9YSdwmYwkY5e69ATkmpotJy')

      return {
        medium: medium.data && medium.data[0].pageFunctionResult.slice(0,6),
        codepen: codepen.data && codepen.data[0].pageFunctionResult.slice(0,6),
        twitter: twitter.data && twitter.data[0].pageFunctionResult.slice(0,6),
        meetup: [...meetupUpcoming.data, ...meetupPast.data].slice(0,6),
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
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
  }

  html {
    --link: #{$link};
    --color: #{$color};
    --bgColor: #{$bgColor};
    --gutter: #{$gutter};
    --sectionColor: white;
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
    scroll-behavior: smooth;
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
    background-color: var(--sectionColor);

    @include media('<=phone') {
      padding-top: 5vh;
      padding-bottom: 5vh;
    }
  }
</style>
