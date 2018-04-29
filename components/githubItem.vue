<template>
  <a :href="repo.link">
    <h4 v-text="repo.title"></h4>
    <small v-text="repo.description"></small>
    <time :datetime="datetime">
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 24l3-9h-9l14-15-3 9h9l-14 15z"/></svg>
      {{date}}
    </time>
  </a>
</template>

<script>
  import { format } from 'date-fns'
  import fr from 'date-fns/locale/fr'

  export default {
    props: ['repo'],

    data() {
      // Split datetime "2018-04-28T17:21:16Z"
      const dateArray = this.$props.repo.updated.split(/[-:TZ]+/)
      // Months begin at 0
      dateArray[1] = parseInt(dateArray[1]) - 1
      const d = new Date(...dateArray)
      return {
        datetime: format(d),
        date: format(d, 'Do MMMM YYYY', {locale: fr}),
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
  }

  span {
    display: block;
    position: relative;
    padding-bottom: 56%;
    background-color: rgba(black,.03);
    margin-bottom: calc(var(--gutter) / 2);
    overflow: hidden;
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
    display: flex;
    align-items: center;
    font-size: .8em;
    opacity: .5;
    text-transform: capitalize;
    margin-top: calc(var(--gutter) / 4);

    svg {
      width: .9em;
      height: .9em;
      margin-right: .25em;
      transform: scaleX(.75);
    }
  }
</style>
