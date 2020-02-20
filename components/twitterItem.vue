<template>
  <a :href="`https://twitter.com/nicooprat/status/${tweet.id_str}`">
    <p class="infos">
      <img :src="tweet.user.profile_image_url_https" :alt="tweet.user.screen_name">
      <span>
        <strong>{{tweet.user.name}}</strong>
        <time :datetime="tweet.created_at">
          {{ Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(tweet.created_at)) }}
        </time>
      </span>
    </p>
    <p :lang="tweet.lang" dir="ltr" v-text="tweet.text" />
    <p v-for="(medias, type) in tweet.extended_entities" :key="type" class="medias">
      <img v-for="media in medias" v-if="media.type === 'photo'" :key="media.id" :src="media.media_url_https" />
      <video v-for="media in medias.slice(0,2)" v-if="media.type === 'animated_gif'" :key="media.id" :poster="media.media_url_https" autoplay muted loop>
        <source v-for="(variant, i) in media.video_info.variants" :key="i" :src="variant.url" :type="variant.content_type" />
      </video>
    </p>
  </a>
</template>

<script>
  export default {
    props: {
      tweet: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/common.scss";

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: none;
  }

  .infos {
    display: flex;

    img {
      width: 48px;
      height: 48px;
      margin-right: 1em;
      border-radius: 100%;
    }

    time {
      display: block;
      font-size: 0.8em;
      font-weight: bold;
      opacity: 0.5;
    }
  }

  .medias {
    display: flex;
    border-radius: 3px;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 20vh;
      object-fit: cover;
    }

    img + img {
      margin-left: 2px;
    }
  }

  div {
    overflow: hidden;
  }
</style>
