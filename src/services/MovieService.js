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
    return { movies: response.results, totalMovies: response.total_results }
  }
}
