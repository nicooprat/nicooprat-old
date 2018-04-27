<template>
  <header>
    <img src="https://fr.gravatar.com/userimage/19665931/6bab5fc386a9ec8701f46d143f36851f.jpg?size=200" alt="Nico Prat">
    <h1 title="Nico Prat"><span>@</span>nico<span>o</span>prat</h1>
    <h2>designer & développeur front-end</h2>
  </header>
</template>

<style lang="scss" scoped>
  header {
    background-color: #f5f6f7;
    color: var(--color);
    padding: 10vh calc(50vw - 25rem);
    position: relative;
  }

  img {
    width: 7rem;
    float: left;
    border-radius: 999px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  h1, h2 {
    margin-left: calc(7rem + 5rem);
  }

  h1 {
    position: relative;
    font-size: 3em;
    font-weight: 900;
    font-family: 'Arvo';
    letter-spacing: -.065em;

    span {
      opacity: .15;

      &:first-of-type {
        position: absolute;
        right: 100%;
        transform: scale(.85);
      }

      &:last-of-type {
        margin-left: .04em;
      }
    }
  }

  h2 {
    font-size: 1.6em;
    font-weight: 300;
  }
</style>
