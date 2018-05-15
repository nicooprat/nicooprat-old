<template>
  <div :style="styles">
    <cover/>
    <main>
      <curve v-if="showCurves" top="#4c91dd" bottom="white"/>
      <intro/>
      <curve v-if="showCurves" top="white" bottom="#f5f6f7"/>
      <medium :articles="medium"/>
      <curve v-if="showCurves" top="#f5f6f7" bottom="#f44362"/>
      <meetup :events="meetup"/>
      <curve v-if="showCurves" top="#f44362" bottom="#343338"/>
      <codepen :pens="codepen"/>
      <curve v-if="showCurves" top="#343338" bottom="#2aa3ef"/>
      <twitter :tweets="twitter"/>
      <curve v-if="showCurves" top="#2aa3ef" bottom="#25292e"/>
      <github :repos="github"/>
      <curve v-if="showCurves" top="#25292e" bottom="#ea4c89"/>
      <dribbble :shots="dribbble"/>
      <curve v-if="showCurves" top="#ea4c89" bottom="white"/>
      <contact/>
    </main>
    <img class="loader" src="data:image/gif;base64,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">
  </div>
</template>

<script>
  import cachios from 'cachios'
  import anime from 'animejs'
  import animate from 'animate'

  import cover from '~/components/cover.vue'
  import intro from '~/components/intro.vue'
  import medium from '~/components/medium.vue'
  import codepen from '~/components/codepen.vue'
  import twitter from '~/components/twitter.vue'
  import meetup from '~/components/meetup.vue'
  import dribbble from '~/components/dribbble.vue'
  import github from '~/components/github.vue'
  import contact from '~/components/contact.vue'

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
      contact,
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
        scaleY: 0,
        slowness: .85,
        brake: .5,
        showCurves: false
      }
    },

    computed: {
      accelerator() {
        return (window.innerWidth + window.innerHeight) / 2
      },
      styles() {
        return {
          '--transform-top': this.minmax(-this.scaleY, 0, 1).toFixed(4),
          '--transform-bottom': this.minmax(this.scaleY, 0, 1).toFixed(4),
        }
      }
    },

    mounted() {
      this.scaleY = 1
      this.showCurves = true
      const duration = 800
      const delay = 500
      const fps = 120

      anime.timeline({delay})
      .add({
        targets: '.loader',
        opacity: 0,
        duration: duration/3
      })
      .add({
        targets: 'main',
        translateY: ['100vh', '0vh'],
        translateZ: 0,
        elasticity: 200,
        offset: 0,
        duration
      })
      .add({
        targets: this,
        scaleY: 0,
        elasticity: 500,
        duration: duration * 1.5,
        offset: duration/4,
        complete: (anim) => animate(this.updateCurve, fps)
      })
      .add({
        targets: 'header',
        translateY: ['50%', '0%'],
        translateZ: 0,
        opacity: 1,
        elasticity: 400,
        duration: duration,
        offset: duration/3,
      })
    },

    beforeDestroy() {
    },

    methods: {
      updateCurve(e) {
        // Get difference between previous scroll position
        const deltaY = (window.scrollY - this.scrollY) * this.brake
        // Remember current scroll position
        this.scrollY = window.scrollY
        // Calculate new scale
        const newScale = deltaY / this.accelerator
        // Add new scale and slow it
        this.scaleY = (this.scaleY + newScale) * this.slowness
        // Show curves
        this.showCurves = true
      },
      minmax: (val, min, max) => Math.max(min, Math.min(max, val))
    },

    async asyncData({params, error}) {
      const ttl = 86400

      const medium = await cachios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/4jqjYdusZaPwu9bW7/lastExec/results?token=SJpxzSMzhGXDC8nJYND48RWNu', {ttl})
      const codepen = await cachios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/gDEqWbPh4p97ukpEH/lastExec/results?token=oAHr2Bn6Hf73u7b2H2HjgWfct', {ttl})
      const twitter = await cachios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/zGiqmuLEFgDLC8diQ/lastExec/results?token=TdPModM6r6EyB4BG89wcsXqww', {ttl})
      const meetupUpcoming = await cachios.get('https://api.meetup.com/self/events?scroll=future_or_past&photo-host=public&page=6&sig_id=144086432&status=upcoming&fields=group&sig=67fd9ec1b81b7a6027f7332221810b77e262ec20', {ttl})
      const meetupPast = await cachios.get('https://api.meetup.com/self/events?desc=true&scroll=future_or_past&photo-host=public&page=6&sig_id=144086432&status=past&fields=group&sig=23e9ab019654e79ba238dc9e3a32de09cc4bac47', {ttl})
      const dribbble = await cachios.get('https://api.dribbble.com/v2/user/shots?access_token=adf54688450e377e645e62c86e051ad245d211d71803266d099c54d4594a2234', {ttl})
      const github = await cachios.get('https://api.apify.com/v1/KJmGFZ2mADwTHyKpp/crawlers/iMsuiLC6pCB3QFg6r/lastExec/results?token=Fo9YSdwmYwkY5e69ATkmpotJy', {ttl})

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
    background-color: var(--link);
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

  main {
    transform: translateY(100vh);
    position: relative;
    z-index: 1;
  }

  header {
    opacity: 0;
  }

  .loader {
    width: 64px;
    height: 64px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 0;
  }
</style>
