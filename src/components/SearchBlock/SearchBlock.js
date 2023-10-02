import { Component } from 'react'

import MoviesList from '../MoviesList/MoviesList'
import InputSearch from '../InputSearch/InputSearch'
import MovieService from '../../services/MovieService'
import MoviePagination from '../MoviePagination/MoviePagination'
import './styles.css'
import { GlobalConsumer } from '../GlobalContext'

export default class SearchBlock extends Component {
  #movieService = new MovieService()

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

    this.updateMovies = (searchedValue, page) => {
      this.#movieService
        .getMovies(searchedValue, page)
        .then(({ movies, totalMovies }) => {
          this.setState({ films: movies, loading: false, totalMovies })
        })
        .catch(this.onError)
    }

    this.onError = () => {
      this.setState({
        error: true,
        loading: false,
      })
    }

    this.onSearchedValueChange = (value) => {
      this.setState({ searchedValue: value.target.value, loading: true, currentPage: 1 })
    }

    this.onPaginationChange = (page) => {
      this.setState({ currentPage: page, loading: true })
    }
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

  render() {
    const { films, error, loading, totalMovies, currentPage } = this.state

    return (
      <GlobalConsumer>
        {({ syncWithLocalStorage }) => (
          <>
            <InputSearch onSearchedValueChange={this.onSearchedValueChange} />
            <MoviesList
              films={films}
              error={error}
              loading={loading}
              onError={this.onError}
              syncWithLocalStorage={syncWithLocalStorage}
            />
            {totalMovies ? (
              <MoviePagination current={currentPage} total={totalMovies} onPaginationChange={this.onPaginationChange} />
            ) : null}
          </>
        )}
      </GlobalConsumer>
    )
  }
}
