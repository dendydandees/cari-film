<template>
  <div
    class="
      col-span-1
      md:col-span-4
      lg:col-span-3
      rounded-md
      shadow-md
      relative
      bg-white
    "
    @mouseover="hoverEvent(movie.imdbID)"
    @mouseleave="hover = null"
  >
    <img
      :src="movie.Poster"
      :alt="movie.Title"
      class="poster-movies group m-0 mx-auto w-full object-cover object-top rounded-md"
      :class="[
        hover === movie.imdbID
          ? 'filter brightness-100 contrast-100'
          : 'filter brightness-90 contrast-75',
      ]"
    />

    <button
      class="btn-primary absolute top-0 right-0 p-2"
      title="Show Poster"
      @click="$emit('showPoster', movie.Poster)"
    >
      <client-only>
        <span
          class="iconify"
          data-icon="clarity:resize-line"
          data-width="24"
          data-height="24"
        ></span>
      </client-only>
    </button>

    <div
      v-show="hover === movie.imdbID"
      class="movie-desc bg-white p-4 w-full md:absolute md:bottom-0"
    >
      <small
        class="bg-yellow-600 p-2 text-white rounded-lg text-center capitalize"
      >
        {{ movie.Type }}
      </small>
      <NuxtLink :to="`/${movie.imdbID}`" class="text-2xl line-clamp-2 mt-2">
        {{ movie.Title }}
        <span class="opacity-80 font-normal"> ({{ movie.Year }}) </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {
        return {}
      },
    },
    poster: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hover: null,
    }
  },
  methods: {
    hoverEvent(id) {
      this.hover = id
    },
  },
}
</script>

<style scoped>
.poster-movies {
  height: unset !important;
}

.movie-desc {
  height: 140px !important;
}

@media screen and (min-width: 768px) {
  .poster-movies {
    height: 370px !important;
  }
}
</style>
