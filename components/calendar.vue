<template>
  <section class="section container">
    <calendar-view
      :events="events"
      :displayPeriodCount=3
      :startingDayOfWeek=1
      displayPeriodUom="month"
      :disablePast=true>
      <span
        v-if="getMonth(day)"
        slot="dayContent"
        slot-scope="{day}"
        class="cv-month-header">
        {{getMonth(day)}}
      </span>
      <div slot="header"/>
      <div slot="dayHeader" slot-scope="noop"/>
    </calendar-view>
  </section>
</template>

<script>
  import CalendarView from '~/node_modules/vue-simple-calendar/src/CalendarView'

  export default {
    components: {
      CalendarView
    },

    props: {
      events: Array
    },

    methods: {
      getMonth(day) {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
        return day.getDate() === 1 ? months[parseInt(day.getMonth())] : false
      }
    }
  }
</script>

<style lang="scss">
  @import "~/assets/common.scss";

  .cv-wrapper {
    max-width: 50em;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;

    @include media('<=phone') {
      margin: -5vh spacer(-1);
    }

    .cv-weeks {

      @include media('<=phone') {
        margin: -1px;
      }
    }

    .cv-week {
      min-height: 3.4em;
    }

    .cv-day, .cv-weeks {
      border-color: mix(white,$color,90);
    }

    .cv-day {

      &.d01 .cv-day-number {
        display: none;
      }
    }

    .today {

      .cv-day-number {
        color: white;
        position: relative;
        font-weight: bold;

        &:before {
          content: '';
          width: 1.8em; height: 1.8em;
          position: absolute;
          top: 50%; left: 50%;
          z-index: -1;
          border-radius: 999px;
          background-color: $color;
          transform: translate(-51%,-51%);
          margin-right: 0;
        }
      }
    }

    .cv-month-header,
    .cv-day-number {
      padding: .7em;
      font-size: .8em;
      line-height: 1em;

      @include media('<=phone') {
        font-size: .7em;
      }
    }

    .cv-month-header {
      font-weight: bold;
      color: rgba($color,0.5);

      &:before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: -1;
        background-color: mix(white,$color,90);
      }
    }

    .cv-day-number {
      color: mix(white,$color,50);
      position: static;
      margin-bottom: auto;
    }

    // Week-ends
    .dow6,
    .dow0 {
      background-image: linear-gradient(to right bottom, white 50%, mix(white,$color,80) 50%, white 51%);
      box-shadow: 0 0 0 .5em white inset;

      .cv-day-number {
        opacity: .5;
      }
    }

    .cv-event {
      border: none;
      margin-top: auto;
      top: auto !important;
      bottom: 0;
      background: repeating-linear-gradient(-45deg, rgba(white,.2), rgba(white,.2) .5em, transparent .5em, transparent 1em) repeat $link;
      color: white;
      font-size: .9em;
      font-weight: bold;
      padding: .25em .5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @include media('<=phone') {
        text-indent: -999px;
      }
    }
  }
</style>
