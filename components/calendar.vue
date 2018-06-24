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

    .cv-weeks {

      @include media('<=phone') {
        margin: -1px;
      }
    }

    .cv-week {
      min-height: 3.4em;
    }

    .cv-day, .cv-weeks {
      border-color: white;
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
        opacity: 1 !important;

        &:before {
          content: '';
          width: 26px; height: 25px;
          position: absolute;
          top: 50%; left: 50%;
          z-index: -1;
          border-radius: 100%;
          background-color: $link;
          transform: translate(-51%,-52%);
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
      color: rgba($color,.8);
    }

    .cv-day-number {
      color: mix(white,$color,50);
      position: static;
      margin-bottom: auto;
    }

    // Week-ends
    .dow6,
    .dow0 {
      background-image: linear-gradient(to right bottom, white 50%, mix(white,$color,85) 50%, white 51%);
      box-shadow: 0 0 0 .5em white inset;

      .cv-day-number {
        opacity: .35;
      }
    }

    .cv-event {
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      top: auto !important;
      bottom: 0;
      background: mix(white,$color,93);
      color: rgba($color,.5);
      font-size: .7em;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: .05em;
      padding: .25em .5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 999px;
      line-height: inherit;

      $w: 4px;
      $h: $w*2;

      &:before,
      &:after {
        position: absolute;
        top: 0; bottom: 0;
        width: $w;
        background-size: $w $h, $w $h;
        background-position: 0 (-$w);
      }

      &:before {
        left: 0;
        background-image: linear-gradient(45deg, white 33.33%, transparent 33.33%),
                          linear-gradient(135deg, white 33.33%, transparent 33.33%);
      }

      &:after {
        right: 0;
        background-image: linear-gradient(225deg, white 33.33%, transparent 33.33%),
                          linear-gradient(315deg, white 33.33%, transparent 33.33%);
      }

      &.toBeContinued {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;

        &:after {
          content: '';
        }
      }

      &.continued {
        color: transparent;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;

        &:before {
          content: '';
        }
      }

      &.toBeContinued.continued {
        border-radius: 0;
      }

      @include media('<=phone') {
        text-indent: -200vw;
      }
    }
  }
</style>
