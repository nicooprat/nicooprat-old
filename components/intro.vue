<template>
  <article class="container section">
    <heading title="Hello">
      <span slot="icon">!</span>
    </heading>
    <p>Je m’appelle Nico Prat et suis <strong>designer & développeur front-end à Lyon</strong>. Je conçois et donne vie à des <strong>applications</strong> et <strong>sites internet</strong> et suis passionné par <strong>l’expérience utilisateur</strong>, le <strong>webdesign</strong> et le <strong>code</strong> : en gros, le web !</p>
    <p>J’ai été webdesigner pendant 5 ans à l'agence web Grenobloise <a href="http://www.mezcalito.fr/">Mezcalito</a>, où j’ai travaillé avec des clients tels que Sport 2000, Go Sport, Intersport, Serre Chevalier, et bien d’autres. En parallèle j’ai aussi co-créé <a href="http://www.cuisine-etudiant.fr/">Cuisine Étudiant</a> dont je me suis occupé du front-end pendant 6 ans (aujourd’hui propriété de la société Mooveo).</p>
    <p>De retour à Lyon, je travaille maintenant pour des <a href="https://www.pamplemousse.com/">agences</a>, des <a href="https://www.helloshop.io/">startups</a> et des <a href="https://www.blendwebmix.com">associations</a> en tant qu'indépendant, ainsi que sur des projets personnels comme <a href="http://www.globetrotter.io/">Globetrotter</a> (plateforme de carnets de voyage) et <a href="https://www.alterecolo.fr/">AlterÉcolo</a> (liste participative d'alternatives écologiques).</p>
  </article>
</template>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  h3 {

    span {
      display: inline-block;
      transform: skew(-10deg) translateX(-.15em) scale(1.65);
      opacity: .125;
    }
  }

  strong:first-of-type:before {
    content: 'animateur radio sur Le Mouv’';
    text-decoration: line-through;
    opacity: .25;
    font-weight: normal;
    margin-right: .35em;
  }
</style>

<script>
  import heading from '~/components/heading.vue'

  export default {
    components: {
      heading,
    },
  }
</script>
