<template>
  <article class="container section">
    <h3 class="title">Hello <span>!</span></h3>
    <p>Je m’appelle Nico Prat et suis <small>animateur radio sur Le Mouv’</small> designer &amp; développeur front-end à Lyon.</p>
    <p>Je conçois et donne vie à l’interface d’applications et sites internet. Je suis passionné par l’expérience utilisateur, l’intéraction homme-machine, le webdesign et le code : en gros, le web !</p>
    <p>J’ai été webdesigner pendant 5 ans à <a href="http://www.mezcalito.fr/">Mezcalito</a>, agence web Grenobloise, où j’ai pu travailler avec des clients tels que Sport 2000, Go Sport, Twinner, Intersport, Sataski, Serre Chevalier, et bien d’autres.</p>
    <p>En parallèle j’ai aussi co-créé <a href="http://www.cuisine-etudiant.fr/">Cuisine Étudiant</a> dont je me suis occupé du design et du front-end pendant 6 ans (aujourd’hui propriété de Mooveo).</p>
    <p>De retour à Lyon, je travaille maintenant pour des <a href="https://www.pamplemousse.com/">agences</a>, des <a href="https://www.helloshop.io/">startups</a> et des <a href="https://www.blendwebmix.com">associations</a> en tant qu'indépendant, ainsi que sur <a href="http://www.globetrotter.io/">Globetrotter</a>, une plateforme de carnets de voyage.</p>
  </article>
</template>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  article {
  }

  h3 {

    span {
      display: inline-block;
      transform: skew(-10deg) translateX(-.35em) scale(1.65);
      opacity: .125;
    }
  }

  small {
    font-size: 1em;
    text-decoration: line-through;
    opacity: .25;
  }
</style>
