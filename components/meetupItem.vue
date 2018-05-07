<template>
  <a :href="link" :data-status="status">
    <time :datetime="datetime">{{date}} ⁃ {{time}}</time>
    <h4 v-text="name"></h4>
    <small v-text="description.replace(/(<([^>]+)>)/ig, ' ')"></small>
    <span>
      <strong v-if="group" :title="group.who">{{group.name}}</strong>
      <strong v-if="venue" :title="[venue.address_1, venue.city].join(', ')">{{venue.name}}, {{venue.city}}</strong>
    </span>
  </a>
</template>

<script>
  import { format } from 'date-fns'
  import fr from 'date-fns/locale/fr'

  export default {
    props: {
      link: {type: String, required: true},
      status: {type: String, required: true},
      name: {type: String, required: true},
      description: {type: String, required: false},
      venue: {type: Object, required: false},
      group: {type: Object, required: false},
      local_date: {type: String, required: false},
      local_time: {type: String, required: false},
    },

    data() {
      // Destructure dates
      const dates = this.$props.local_date.split('-').map(d => parseInt(d))
      const times = this.$props.local_time.split(':').map(d => parseInt(d))
      // Months begin at 0
      dates[1] = dates[1] - 1
      const d = new Date(...dates, ...times)
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

    strong + strong:before {
      content: ' ∙ ';
    }
  }
</style>
