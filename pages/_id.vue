<template>
  <section class="prose lg:prose-lg xl:prose-xl max-w-none">
    <article class="bg-white">
      <div class="container mx-auto p-4 py-10">
        <BaseBackLink />

        <template v-if="$fetchState.pending">
          <div class="p-4 text-center">
            <span>Loading ...</span>
          </div>
        </template>

        <template v-else-if="$fetchState.error">
          <BaseErrorCard />
        </template>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-12 my-4 gap-6">
            <div class="col-span-1 md:col-span-3">
              <img
                :src="movie.Poster"
                :alt="movie.Title"
                class="
                  m-0
                  mx-auto
                  md:mx-0
                  rounded-md
                  filter
                  brightness-90
                  contrast-75
                  hover:brightness-100 hover:contrast-100
                "
              />
            </div>

            <div class="col-span-1 md:col-span-9">
              <div class="mb-2 space-x-2">
                <span
                  v-if="movie.Rated !== 'Not Rated'"
                  class="
                    bg-gray-800
                    p-2
                    text-white
                    rounded-lg
                    text-center
                    capitalize
                  "
                >
                  {{ movie.Rated }}
                </span>
                <span
                  v-if="movie.Language !== 'N/A'"
                  class="
                    bg-green-400
                    p-2
                    text-black
                    rounded-lg
                    text-center
                    capitalize
                  "
                >
                  {{ movie.Language }}
                </span>
              </div>

              <div>
                <h1>
                  {{ movie.Title }}
                  <span class="text-gray-600">({{ movie.Year }})</span>
                </h1>
                <p v-if="movie.Director !== 'N/A'" class="my-2">
                  Disutradarai oleh
                  <strong>{{ movie.Director }}</strong>
                </p>
                <p v-if="movie.Production !== 'N/A'" class="my-2">
                  Diproduksi oleh
                  <strong>{{ movie.Production }}</strong>
                </p>
              </div>

              <div class="my-6">
                <hr class="my-2" />

                <span class="block md:inline-block">
                  Pemeran - <strong>{{ movie.Actors }}</strong>
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span class="block md:inline-block">
                  Genre - <strong>{{ movie.Genre }}</strong>
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span class="block md:inline-block">
                  Tanggal rilis - <strong>{{ movie.Released }}</strong>
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span class="block md:inline-block">
                  Durasi - <strong>{{ movie.Runtime }}</strong>
                </span>

                <hr class="my-2" />

                <span class="block md:inline-block">
                  IMDB Rating -
                  <strong>{{ movie.imdbRating }} / 10</strong>
                  ({{ movie.imdbVotes }} votes)
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span v-for="(rating, index) in movie.Ratings" :key="index" class="block md:inline-block">
                  {{ rating.Source }} -
                  <strong>{{ rating.Value }}</strong>
                  <span v-if="index !== movie.Ratings.length - 1">
                    <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                  </span>
                </span>

                <hr class="my-2" />

                <span class="block md:inline-block">
                  Negara - <strong>{{ movie.Country }}</strong>
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span class="block md:inline-block">
                  Penghargaan - <strong>{{ movie.Awards }}</strong>
                  <span class="hidden md:inline-block">&nbsp;|&nbsp;</span>
                </span>
                <span class="block md:inline-block">
                  Box Office - <strong>{{ movie.BoxOffice }}</strong>
                </span>

                <hr class="my-2" />
              </div>

              <div>
                <h2>Sinopsis oleh {{ movie.Writer }}</h2>
                <p class="lead">{{ movie.Plot }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async fetch() {
    const id = this.$route.params.id

    await this.getMovie({ id })
  },
  head() {
    return {
      title: `${this.movie.Title} (${this.movie.Year}) | Cari Film`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.movie.Plot,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('movies', ['movie']),
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },
  methods: {
    ...mapActions('movies', ['getMovie']),
  },
}
</script>

<style></style>
