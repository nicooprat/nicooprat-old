<template>
  <header class="container section">
    <img src="https://fr.gravatar.com/userimage/19665931/6bab5fc386a9ec8701f46d143f36851f.jpg?size=200" alt="Nico Prat">
    <div>
      <h1 title="Nico Prat"><span>@</span>nico<span>o</span>prat</h1>
      <h2>designer & développeur front-end</h2>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  header {
    display: flex;
    align-items: center;
    background-color: #f5f6f7;
    position: relative;
  }

  div {
    padding-right: 1em;
  }

  img {
    order: 1;
    margin-left: auto;
    width: 7rem;
    border-radius: 999px;
  }

  h1, h2 {
    margin: 0;
  }

  h1 {
    position: relative;
    font-size: 3em;
    font-weight: 900;
    font-family: 'Arvo';
    letter-spacing: -.075em;
    line-height: 1;

    span {
      opacity: .15;

      &:first-of-type {
        position: absolute;
        right: 100%;
        transform: scale(1.1) translate(10%,-3%);
      }

      &:last-of-type {
        margin-left: -.03em;
        margin-right: -.06em;
      }
    }
  }

  h2 {
    font-size: 1.6em;
    font-weight: 300;
  }
</style>
