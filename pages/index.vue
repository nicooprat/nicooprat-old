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
      <calendar :events="events"/>
      <curve v-if="showCurves" top="white" bottom="#4c91dd"/>
      <contact/>
    </main>

    <svg class="loader" width="64px" height="64px" viewBox="0 0 128 128">
      <path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#ffffff" fill-opacity="1" />
    </svg>
  </div>
</template>

<script>
  import cachios from 'cachios'
  import anime from 'animejs'
  import animate from 'animate'
  import ical from 'ical.js'

  import cover from '~/components/cover.vue'
  import intro from '~/components/intro.vue'
  import medium from '~/components/medium.vue'
  import codepen from '~/components/codepen.vue'
  import twitter from '~/components/twitter.vue'
  import meetup from '~/components/meetup.vue'
  import dribbble from '~/components/dribbble.vue'
  import github from '~/components/github.vue'
  import calendar from '~/components/calendar.vue'
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
      calendar,
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
        slowness: .8,
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
      const delay = 250
      const fps = 120

      anime.timeline({delay})
      .add({
        targets: '.loader',
        opacity: 0,
        duration: delay*2
      })
      .add({
        targets: 'main',
        translateY: ['100vh', '0vh'],
        translateZ: 0,
        elasticity: 200,
        offset: delay,
        duration
      })
      .add({
        targets: this,
        scaleY: 0,
        elasticity: 500,
        duration: duration * 1.5,
        offset: delay + duration/4,
        complete: (anim) => animate(this.updateCurve, fps)
      })
      .add({
        targets: 'header',
        translateY: ['50%', '0%'],
        translateZ: 0,
        opacity: 1,
        elasticity: 400,
        duration: duration,
        offset: delay + duration/3,
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
      },
      minmax: (val, min, max) => Math.max(min, Math.min(max, val))
    },

    async asyncData({params, error}) {
      const ttl = process.env.NODE_ENV === 'production' ? 0 : 86400

      const medium = await cachios.get(process.env.medium, {ttl})
      const codepen = await cachios.get(process.env.codepen, {ttl})
      const twitter = await cachios.get(process.env.twitter, {ttl})
      const meetupUpcoming = await cachios.get(process.env.meetupUpcoming, {ttl})
      const meetupPast = await cachios.get(process.env.meetupPast, {ttl})
      const dribbble = await cachios.get(process.env.dribbble, {ttl})
      const github = await cachios.get(process.env.github, {ttl})
      const calendar = await cachios.get(process.env.calendar, {ttl})

      // Parse events from ICS to JSON
      // https://github.com/mozilla-comm/ical.js/issues/222#issuecomment-204083519
      // According to calendar expected format
      // https://github.com/richardtallent/vue-simple-calendar#calendar-event-properties
      const comp = new ical.Component(ical.parse(calendar.data))
      const events = comp.getAllSubcomponents('vevent').map(e => {
        return {
          title: 'Indisponible',
          startDate: e.getFirstPropertyValue('dtstart').toJSDate(),
          endDate: e.getFirstPropertyValue('dtend').toJSDate(),
        }
      })

      return {
        medium: medium.data && medium.data[0].pageFunctionResult.slice(0,6),
        codepen: codepen.data && codepen.data[0].pageFunctionResult.slice(0,6),
        twitter: twitter.data && twitter.data[0].pageFunctionResult.slice(0,6),
        meetup: [...meetupUpcoming.data, ...meetupPast.data].slice(0,6),
        dribbble: dribbble.data && dribbble.data.slice(0,6),
        github: github.data && github.data[0].pageFunctionResult.slice(0,6),
        events,
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
    transform-origin: center;
    z-index: 0;
    animation: loader 700ms infinite both linear;
  }

  @keyframes loader {
    from { transform: translate(-50%,-50%) rotate(0turn); }
    to   { transform: translate(-50%,-50%) rotate(1turn); }
  }
</style>
