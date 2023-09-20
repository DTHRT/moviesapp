import { Component } from 'react'
import './styles.css'
import { Col, Row } from 'antd'

import MoviesItem from '../MoviesItem'
import MovieService from '../../services/MovieService'

export default class MoviesList extends Component {
  movieService = new MovieService()

  constructor() {
    super()

    this.state = {
      films: [],
    }

    this.movieService.getMovies().then((movies) => {
      this.setState({ films: movies })
    })
  }

  render() {
    const { films } = this.state

    console.log('films from state:', films)

    return (
      <div className="MoviesList">
        <Row gutter={[36, 37]}>
          {films.map((film) => (
            <Col span={12}>
              <MoviesItem
                key={film.id}
                title={film.original_title}
                date={film.release_date}
                genres={film.genre_ids}
                description={film.overview}
                img={film.poster_path}
              />
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
