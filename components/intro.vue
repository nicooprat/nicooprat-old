<template>
  <article class="container section">
    <heading title="Hello">
      <span slot="icon">!</span>
    </heading>

    <p>Je m’appelle <strong>Nico Prat</strong> et suis <strong>designer & développeur front-end à Lyon</strong>. Je conçois et donne vie à des <strong>applications</strong> et <strong>sites internet</strong> et suis passionné par <strong>l’expérience utilisateur</strong>, le <strong>webdesign</strong> et le <strong>code</strong> : en gros, le web !</p>

    <p>J’ai travaillé pendant 5 ans à l'agence web Grenobloise <a href="http://www.mezcalito.fr/">Mezcalito</a>, avec des clients tels que Sport 2000, Go Sport, Intersport, Serre Chevalier, et bien d’autres. De retour à Lyon, je travaille maintenant pour des <a href="https://www.pamplemousse.com/">agences</a>, des <a href="https://www.365talents.com/">startups</a> et des <a href="https://www.blendwebmix.com">associations</a> en tant qu'<strong>indépendant</strong>, ainsi que sur des projets personnels comme...</p>

    <grid v-if="projects">
      <project-item v-for="project in projects" v-bind="project" :key="project.title"/>
    </grid>
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

  p:first-of-type strong:nth-of-type(2):before {
    content: 'animateur radio sur Le Mouv’';
    text-decoration: line-through;
    opacity: .25;
    font-weight: normal;
    margin-right: .35em;
  }

  nav {
    margin-top: calc(var(--gutter) * 4);
  }
</style>

<script>
  import heading from '~/components/heading.vue'
  import grid from '~/components/grid.vue'
  import projectItem from '~/components/projectItem.vue'

  export default {
    components: {
      heading,
      grid,
      projectItem,
    },
    data() {
      return {
        projects: [{
          title: 'Globetrotter',
          desc: 'Plateforme d\'écriture et de partage de carnets de voyage en ligne, développée avec Meteor et Mapbox.',
          logo: 'globetrotter',
          link: 'https://www.globetrotter.io',
          color: '#277de8',
        }, {
          title: 'AlterÉcolo',
          desc: 'Liste participative d\'alternatives écologiques, réalisée avec Nuxt, Netlify et Airtable pour les données.',
          logo: 'alterecolo',
          link: 'https://www.alterecolo.fr',
          color: '#2fcb59',
        }, {
          title: 'Diaporama',
          desc: 'Webapp de scrolly-telling de vidéos Youtube grâce aux sous-titres, basée sur Nuxt et Netlify (+ lambdas).',
          logo: 'diaporama',
          link: 'https://www.diaporama.app',
          color: '#f91628',
        }]
      }
    }
  }
</script>
