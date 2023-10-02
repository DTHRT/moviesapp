/* eslint-disable class-methods-use-this */
export default class MovieService {
  #apiBase = 'https://api.themoviedb.org/'

  #apiKey = process.env.REACT_APP_MOVIEAPP_KEY

  async getResourse(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this.#apiKey,
      },
    }

    const response = await fetch(`${this.#apiBase}${url}`, options)

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    const result = await response.json()

    return result
  }

  async getMovies(name = '', page = 1) {
    const url = `3/search/movie?query=${name}&page=${page}`
    const response = await this.getResourse(url)
    return { movies: this.transformMoviesData(response.results), totalMovies: response.total_results }
  }

  transformMoviesData(movies) {
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.original_title,
      date: movie.release_date,
      img: movie.poster_path,
      description: movie.overview,
      genreIds: movie.genre_ids,
    }))
  }

  async getGenres(genreIds) {
    const url = '3/genre/movie/list'
    const response = await this.getResourse(url)

    const genres = response.genres.filter((genre) => genreIds.includes(genre.id)).map((genre) => genre.name)

    return genres
  }

  createStorage() {
    if (!localStorage.getItem('ratedList')) {
      return localStorage.setItem('ratedList', '[]')
    }

    return this.getRatedList()
  }

  getRatedList() {
    return JSON.parse(localStorage.getItem('ratedList'))
  }

  addToRatedList(film) {
    const ratedList = this.getRatedList()

    const index = ratedList.findIndex((ratedFilm) => ratedFilm.id === film.id)

    let newArr = []

    if (index === -1) {
      newArr = [...ratedList, film]
    } else {
      newArr = [...ratedList.slice(0, index), film, ...ratedList.slice(index + 1)]
    }

    localStorage.setItem('ratedList', JSON.stringify(newArr))
  }

  removeFromRatedList(id) {
    const ratedList = this.getRatedList()
    const index = ratedList.findIndex((ratedFilm) => ratedFilm.id === id)

    const newArr = [...ratedList.slice(0, index), ...ratedList.slice(index + 1)]
    localStorage.setItem('ratedList', JSON.stringify(newArr))
  }
}
