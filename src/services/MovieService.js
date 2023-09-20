export default class MovieService {
  #apiBase = 'https://api.themoviedb.org/'

  async getResourse(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzIyZjMyYjBmYzg3NTc0ZjA0ZWIzYjgyMzQ1ZTk5MSIsInN1YiI6IjY1MGIyZWNlY2FkYjZiMDBjNGY3ODE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HrFAa8bAchyIkqUEfluQghfCDQy1UdJZDT3eG2VHSAw',
      },
    }

    const response = await fetch(`${this.#apiBase}${url}`, options)

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    const result = await response.json()

    return result
  }

  async getMovies() {
    const url = '3/search/movie?query=return'
    const response = await this.getResourse(url)
    return response.results
  }
}
