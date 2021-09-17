<template>
  <section class="prose lg:prose-lg xl:prose-xl max-w-none">
    <article class="bg-white shadow-sm">
      <div class="container mx-auto p-4 py-10">
        <div class="max-w-none md:max-w-lg">
          <h1 class="tracking-wide">Film itu bagus enggak ya ? 🤔</h1>
          <p class="lead">
            Jangan khawatir! dengan <strong>Cari Film</strong>, kamu bisa mencari
            tahu mengenai film yang kamu ragukan.
          </p>

          <form class="grid grid-cols-4" @submit.prevent="searchMovie">
            <input
              id="search"
              v-model="search"
              type="text"
              name="search"
              placeholder="Masukan judul film"
              :class="`input-primary col-span-3 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`"
            />

            <input type="submit" value="Cari" class="py-2 px-6 btn-primary" />
            <small :class="`col-span-full mt-2 ${error ? 'text-red-500' : ''}`">
              {{ message }}
            </small>
          </form>
        </div>
      </div>
    </article>

    <article class="container mx-auto p-4 py-10">
      <template v-if="$fetchState.pending">
        <div class="p-4 text-center">
          <span>Loading ...</span>
        </div>
      </template>

      <template v-else-if="$fetchState.error">
        <BaseErrorCard />
      </template>

      <template v-else>
        <div v-if="movies" class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <BaseCard
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"
            @showPoster="showPoster"
          />
        </div>

        <div v-else>
          <BaseErrorCard
            title="Film yang Anda cari kurang spesifik"
            description="Silahkan masukan judul film secara lebih spesifik agar memudahkan pencarian."
          />
        </div>

        <BasePagination
          v-if="totalPage"
          @prevPage="prevPage"
          @nextPage="nextPage"
        />
      </template>
    </article>

    <BaseModal v-show="poster" @close="poster = ''">
      <img :src="poster" class="poster-show m-0 mx-auto" />
    </BaseModal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      message: 'Masukan judul film yang ingin kamu cari',
      error: false,
      poster: '',
    }
  },
  async fetch() {
    await this.getMovies()
  },
  computed: {
    ...mapGetters('movies', ['movies', 'totalShowMovies', 'totalPage']),
    search: {
      get() {
        return this.$store.state.movies.search
      },
      set(value) {
        this.$store.commit('movies/SET_SEARCH', value)
      },
    },
    page: {
      get() {
        return this.$store.state.movies.page
      },
      set(value) {
        this.$store.commit('movies/SET_PAGE', value)
      },
    },
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue.length === 0) {
        this.error = true
        this.message = 'Anda belum mencari sebuah film'
      } else {
        this.error = false
        this.message = 'Masukan judul film yang ingin kamu cari'
      }
    },
  },
  mounted() {
    this.intersectingFooter()
  },
  methods: {
    ...mapActions('movies', ['getMovies']),
    // search movie form submit
    async searchMovie() {
      if (this.search.length !== 0) {
        this.page = 1
        await this.$fetch()
      }
    },
    // show poster modal
    showPoster(image) {
      this.poster = image
    },
    // set next and prev for pagination
    nextPage() {
      this.page += 1
      this.$fetch()
    },
    prevPage() {
      this.page -= 1
      this.$fetch()
    },
    // intersecting on scroll
    intersectingFooter() {
      const footer = document.querySelector('#footer')

      const options = {
        root: null,
        rootMargin: '0px',
      }

      const handler = (entries) => {
        if (entries[0].isIntersecting && this.totalShowMovies <= 10) {
          setTimeout(() => {
            this.$store.commit('movies/SET_TOTAL_SHOW_MOVIES')
          }, 1000)
        }
      }

      const observer = new IntersectionObserver(handler, options)
      observer.observe(footer)
    },
  },
}
</script>

<style scoped>
.poster-show {
  transform: translate(-2%, 25%);
}
</style>
