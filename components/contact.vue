<template>
  <section class="section">
    <form name="contact" method="POST" netlify>
      <h3>Disponible pour discuter de vos projets. </h3>

      <p>
        Intégration sans problème <small>(HTML, ES6, SCSS, SVG)</small> beaucoup de front-end <small>(Meteor, Vue, WordPress)</small> un peu de back-end <small>(Symfony, MySQL, MongoDB)</small> de quoi me débrouiller en DevOps <small>(Bash, SSH)</small> et tout le reste <small>(Git, Invision, Slack, Trello/Airtable)</small>.
      </p>

      <fieldset>
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" required>
      </fieldset>

      <fieldset>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </fieldset>

      <fieldset>
        <label for="message">Message</label>
        <textarea name="message" id="message" rows="5" required></textarea>
      </fieldset>

      <fieldset>
        <input type="hidden" name="form-name" value="contact" />
        <button type="submit">Envoyer</button>
      </fieldset>
    </form>

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
  import autosize from 'autosize'
  import CalendarView from '~/node_modules/vue-simple-calendar/src/CalendarView'

  export default {
    components: {
      CalendarView
    },

    props: {
      events: Array
    },

    mounted() {
      autosize(this.$el.querySelectorAll('textarea'))
    },

    methods: {
      getMonth(day) {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
        return day.getDate() === 1 ? months[parseInt(day.getMonth())] : false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  section {
    box-shadow: 0 200px 0 0 white; // Avoid blue background on scroll overflow

    @include media('>tablet') {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  }

  form {
    flex-basis: 40%;
    max-width: 30em;
    margin-left: auto;
    margin-right: auto;
    margin: spacer();

    @include media('>tablet') {
      position: sticky;
      top: 1em;
    }

    > *:first-child {
      margin-top: 0;
    }
  }

  p {

    small {
      font-size: 1em;
      opacity: .5;
    }
  }

  fieldset {
    border: none;
    padding: 0;
    margin-top: spacer();
    margin-bottom: spacer();

    &:first-of-type {
      margin-top: spacer(2);
    }
  }

  label {
    display: block;
    font-size: .9em;
    font-weight: 900;
    padding-bottom: .5em;
    opacity: .75;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: none;
    background-color: rgba($color,.05);
    padding: .5em;
    font: inherit;

    &:hover,
    &:focus {
      background-color: rgba($color,.1);
    }
  }

  button {
    display: inline-block;
    appareance: none;
    background-color: $link;
    color: white;
    text-transform: uppercase;
    letter-spacing: .05em;
    text-decoration: none;
    font-weight: bold;
    padding: 0.7em 1em 0.65em;
    font-size: .9em;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transform: translate3d(0,0,1px) perspective(100px);
    transition: all 300ms cubic-bezier(0.175, 0.885, 0.355, 1.640);

    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: $link;
      z-index: -1;
      transition: all 400ms cubic-bezier(0.175, 0.885, 0.355, 1.640);
    }

    &:before {
      top: 0; bottom: 0;
      left: -7%; right: -7%;
      border-top-left-radius: 50% 300%;
      border-bottom-left-radius: 50% 300%;
      border-top-right-radius: 50% 300%;
      border-bottom-right-radius: 50% 300%;
      transform: scaleX(0.85);
    }

    &:after {
      top: -7%; bottom: -7%;
      left: 0; right: 0;
      border-top-left-radius: 300% 50%;
      border-bottom-left-radius: 300% 50%;
      border-top-right-radius: 300% 50%;
      border-bottom-right-radius: 300% 50%;
      transform: scaleY(0.85);
    }

    &:hover,
    &:focus {
      outline: none;
      border-radius: 10%;
      transform: translate3d(0,0,0) scale(1.07);
      filter: drop-shadow(0 .25em .5em rgba(black,.1));

      &:before,
      &:after {
        transition-duration: 200ms;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.355, 1.640);
      }

      &:before {
        transform: scaleX(1);
      }

      &:after {
        transform: scaleY(1);
      }
    }

    &:active {
      transition-duration: 100ms;
      transform: scale(1);
    }
  }
</style>

<style lang="scss">
  @import "~/assets/common.scss";

  .cv-wrapper {
    flex-basis: 60%;
    max-width: 50em;
    overflow: auto;
    margin-left: -1px;
    margin-right: -1px;

    @include media('>phone') {
      margin: spacer();
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
