<template>
  <section class="section container">
    <form name="contact" method="POST" netlify>
      <p>
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" required>
      </p>
      <p>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </p>
      <p>
        <label for="message">Message</label>
        <textarea name="message" id="message" rows="5" required></textarea>
      </p>
      <p>
        <button type="submit">Envoyer</button>
      </p>
    </form>
  </section>
</template>

<script>
  import autosize from 'autosize'

  export default {
    mounted() {
      autosize(this.$el.querySelectorAll('textarea'))
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  section {
    box-shadow: 0 200px 0 0 white; // Avoid blue background on scroll overflow
  }

  form {
    max-width: 30em;
    margin-left: auto;
    margin-right: auto;
  }

  p {
    margin-top: spacer();
    margin-bottom: spacer();
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
    background-color: $color;
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
      background-color: $color;
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
