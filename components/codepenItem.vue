<template>
  <a :href="link">
    <span>
      <img v-if="thumb" :src="src" :alt="title">
    </span>
    <h4 v-text="title"></h4>
    <small v-text="excerpt"></small>
    <i v-if="views">
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12.849 24l-3.96-7.853-4.889 4.142v-20.289l16 12.875-6.192 1.038 3.901 7.696-4.86 2.391zm-3.299-10.979l4.194 8.3 1.264-.617-4.213-8.313 4.632-.749-9.427-7.559v11.984l3.55-3.046z"/></svg>
      {{views}}
    </i>
    <i v-if="loves">
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/></svg>
      {{loves}}
    </i>
    <i v-if="comments">
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"/></svg>
      {{comments}}
    </i>
  </a>
</template>

<script>
  export default {
    props: {
      title: {type: String, required: true},
      thumb: {type: String, required: true},
      excerpt: {type: String, required: false},
      link: {type: String, required: true},
      slug: {type: String, required: true},
      views: {type: Number, required: false},
      comments: {type: Number, required: false},
      loves: {type: Number, required: false},
    },

    data() {
      return {
        src: false
      }
    },

    mounted() {
      // Lazy load
      if( typeof(IntersectionObserver) == 'undefined' ) {
        require('intersection-observer')
      }

      const component = this
      new IntersectionObserver(function(entries) {
        if(entries[0].isIntersecting) {
          component.src = component.thumb
          this.disconnect()
        }
      }, {
        rootMargin: '50%'
      }).observe(this.$el)
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    text-decoration: none;
    color: inherit;
    border-bottom: none;

    &:hover span,
    &:focus span {
      transform: translateZ(20px);
    }
  }

  span {
    display: block;
    position: relative;
    padding-bottom: 56%;
    background-color: rgba(black,.03);
    margin-bottom: calc(var(--gutter) / 2);
    transition: transform 200ms;

    &:before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      box-shadow: 0 0 0 2px var(--color) inset;
      opacity: .1;
      z-index: 1;
    }
  }

  img {
    display: block;
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    overflow: hidden;

    &:not([src]) {
      visibility: hidden;
    }
  }

  h4 {
    margin: 0;
  }

  small {
    display: block;
    margin-top: calc(var(--gutter) / 2);
    margin-bottom: calc(var(--gutter) / 2);
    word-wrap: break-word;
  }

  i {
    display: inline-flex;
    align-items: center;
    font-style: normal;
    font-size: .8em;
    opacity: .5;
    margin-right: .75em;
    font-weight: 600;

    svg {
      margin-right: .25em;
      width: .9em;
      height: .9em;
    }
  }
</style>
