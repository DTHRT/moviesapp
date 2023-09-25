import './styles.css'
import { Component } from 'react'

import MoviesList from '../MoviesList/MoviesList'
import InputSearch from '../InputSearch/InputSearch'
import MovieService from '../../services/MovieService'
import MoviePagination from '../MoviePagination/MoviePagination'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [],
      error: false,
      loading: true,
      searchedValue: '',
      totalMovies: null,
      currentPage: 1,
    }

    this.movieService = new MovieService()
  }

  componentDidMount() {
    const { searchedValue } = this.state

    this.updateMovies(searchedValue)
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchedValue, currentPage } = this.state
    if (prevState.searchedValue !== searchedValue || prevState.currentPage !== currentPage) {
      this.updateMovies(searchedValue, currentPage)
    }
  }

  updateMovies = (searchedValue, page) => {
    this.movieService
      .getMovies(searchedValue, page)
      .then(({ movies, totalMovies }) => {
        this.setState({ films: movies, loading: false, totalMovies })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  onSearchedValueChange = (value) => {
    this.setState({ searchedValue: value.target.value, loading: true, currentPage: 1 })
  }

  onPaginationChange = (page) => {
    this.setState({ currentPage: page, loading: true })
  }

  render() {
    const { films, error, loading, totalMovies, currentPage } = this.state

    return (
      <div className="App">
        <div className="App__container">
          <InputSearch onSearchedValueChange={this.onSearchedValueChange} />
          <MoviesList films={films} error={error} loading={loading} onError={this.onError} />
          {totalMovies ? (
            <MoviePagination current={currentPage} total={totalMovies} onPaginationChange={this.onPaginationChange} />
          ) : null}
        </div>
      </div>
    )
  }
}
