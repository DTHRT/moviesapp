import { Component } from 'react'
import './styles.css'
import { Col, Row, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import MoviesItem from '../MoviesItem'
import MovieService from '../../services/MovieService'
import Loader from '../Loader/Loader'

export default class MoviesList extends Component {
  movieService = new MovieService()

  constructor() {
    super()

    this.state = {
      films: [],
      error: false,
      loading: true,
    }

    this.movieService
      .getMovies()
      .then((movies) => {
        this.setState({ films: movies, loading: false })
      })
      .catch(this.onError)
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  render() {
    const { films, error, loading } = this.state

    let content = <Loader />

    if (error) {
      content = <Alert message="Something went wrong" type="error" showIcon />
    }

    if (!error && !loading) {
      content = <ShowMovies films={films} />
    }

    return (
      <div className="MoviesList">
        <Offline>
          <Alert message="You are offline" type="warning" showIcon />
        </Offline>
        <Online>{content}</Online>
      </div>
    )
  }
}

function ShowMovies({ films }) {
  return (
    <Row gutter={[36, 37]}>
      {films.map((film) => (
        <Col span={12} key={film.id}>
          <MoviesItem
            title={film.original_title}
            date={film.release_date}
            genres={film.genre_ids}
            description={film.overview}
            img={film.poster_path}
          />
        </Col>
      ))}
    </Row>
  )
}
