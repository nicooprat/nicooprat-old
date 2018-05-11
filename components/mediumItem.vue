<template>
  <a :href="link">
    <span>
      <img v-if="thumb" :src="thumb" :alt="title">
    </span>
    <h4 v-text="title"></h4>
    <small v-text="excerpt"></small>
    <time :datetime="datetime">{{dateFormatted}}</time>
  </a>
</template>

<script>
  import { format } from 'date-fns'
  import fr from 'date-fns/locale/fr'

  export default {
    props: {
      title: {type: String, required: true},
      thumb: {type: [String, Boolean], required: true},
      excerpt: {type: String, required: false},
      link: {type: String, required: true},
      date: {type: String, required: true},
    },

    data() {
      // Split datetime "2018-04-28T17:21:16Z"
      const dateArray = this.$props.date.split(/[-:TZ]+/)
      // Months begin at 0
      dateArray[1] = parseInt(dateArray[1]) - 1
      const d = new Date(...dateArray)
      return {
        datetime: format(d),
        dateFormatted: format(d, 'Do MMMM YYYY', {locale: fr}),
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
    transform-style: preserve-3d;

    &:hover span,
    &:focus span {
      transform: translateZ(20px);
    }
  }

  span {
    display: block;
    position: relative;
    padding-bottom: 56%;
    background-color: rgba(black,.03);
    margin-bottom: calc(var(--gutter) / 2);
    overflow: hidden;
    transition: transform 200ms;
  }

  img {
    display: block;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  h4 {
    margin: 0;
  }

  small {
    display: block;
    margin-top: calc(var(--gutter) / 2);
  }

  time {
    display: block;
    font-size: .8em;
    opacity: .5;
    margin-top: spacer(.25);
  }
</style>
