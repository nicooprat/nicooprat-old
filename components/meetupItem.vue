<template>
  <a :href="event.link" :data-status="event.status">
    <time :datetime="datetime">{{date}} ⁃ {{time}}</time>
    <h4 v-text="event.name"></h4>
    <small v-text="event.description.replace(/(<([^>]+)>)/ig, ' ')"></small>
    <span v-if="event.venue">
      <strong :title="[event.venue.address_1, event.venue.city].join(', ')">{{event.venue.name}}</strong>
    </span>
  </a>
</template>

<script>
  import { format } from 'date-fns'
  import fr from 'date-fns/locale/fr'

  export default {
    props: ['event'],

    data() {
      const dates = this.$props.event.local_date.split('-')
      const times = this.$props.event.local_time.split(':')
      // Day & month are reversed in French
      const d = new Date(dates[0], dates[2], dates[1], times[0], times[1])
      return {
        datetime: format(d),
        date: format(d, 'dddd Do MMMM', {locale: fr}),
        time: format(d, 'H:mm', {locale: fr}),
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: none;

    &[data-status="past"] {
      opacity: .5;
    }
  }

  time {
    display: block;
    font-size: .8em;
    font-weight: 500;
    opacity: .5;
    text-transform: capitalize;
  }

  h4 {
    margin: 0;
    display: block;
  }

  small {
    display: block;
    max-height: 5.5em;
    overflow: hidden;
    margin-top: calc(var(--gutter) / 2);
  }

  span {
    display: block;
    font-size: .8em;
    margin-top: calc(var(--gutter) / 2);
  }
</style>
