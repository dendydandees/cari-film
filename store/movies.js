export const state = () => ({
  movies: [],
  movie: {},
  totalMovies: null,
  search: 'Marvel',
  page: 1,
  totalPage: null,
  totalShowMovies: 4,
})

export const getters = {
  movies: (state, getters) => {
    if (state.movies && state.movies.length >= 10) {
      return state.movies.slice(0, getters.totalShowMovies)
    }

    return state.movies
  },
  movie: (state) => {
    return state.movie
  },
  totalMovies: (state) => {
    return state.totalMovies
  },
  page: (state) => {
    return state.page
  },
  totalPage: (state) => {
    return state.totalPage
  },
  totalShowMovies: (state) => {
    return state.totalShowMovies
  },
}

export const mutations = {
  SET_MOVIES(state, value) {
    state.movies = value
  },
  SET_MOVIE(state, value) {
    state.movie = value
  },
  SET_TOTAL_MOVIES(state, value) {
    state.totalMovies = value
  },
  SET_SEARCH(state, value) {
    state.search = value
  },
  SET_PAGE(state, value) {
    state.page = value
  },
  SET_TOTAL_PAGE(state, value) {
    state.totalPage = value
  },
  SET_TOTAL_SHOW_MOVIES(state) {
    state.totalShowMovies += 4
  },
  RESET_TOTAL_SHOW_MOVIES(state) {
    state.totalShowMovies = 4
  }
}

export const actions = {
  // get list of movies from omdb API
  async getMovies({ commit, state }) {
    await commit('RESET_TOTAL_SHOW_MOVIES')

    const { data } = await this.$axios.get(
      `/?apikey=${this.$config.apiKey}&s=${state.search}&page=${state.page}`
    )

    if (data.Response) {
      await commit('SET_MOVIES', data.Search)
      await commit('SET_TOTAL_MOVIES', data.totalResults)
      await commit('SET_TOTAL_PAGE', Math.ceil(data.totalResults / 10))
    }
  },
  // get detail of movie from omdb API
  async getMovie({ commit, state }, { id }) {
    const { data } = await this.$axios.get(
      `/?apikey=${this.$config.apiKey}&i=${id}&plot=full`
    )

    await commit('SET_MOVIE', data)
  },
}
