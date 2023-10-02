/* eslint-disable */
import './styles.css'
import { Col, Row, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import MoviesItem from '../MoviesItem'
import Loader from '../Loader/Loader'

function MoviesList({ films, error, loading, syncWithLocalStorage }) {
  let content = null

  if (loading) {
    content = <Loader />
  }

  if (error) {
    content = <Alert message="Something went wrong" type="error" showIcon />
  }

  if (!error && !loading) {
    content = <ShowMovies films={films} syncWithLocalStorage={syncWithLocalStorage} />
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

function ShowMovies({ films, syncWithLocalStorage }) {
  if (films.length === 0) {
    return <Alert message="No movies found" type="info" showIcon />
  }

  return (
    <Row gutter={[36, 37]}>
      {films.map((film) => (
        <Col span={12} key={film.id}>
          <MoviesItem
            id={film.id}
            title={film.title}
            date={film.date}
            genreIds={film.genreIds}
            description={film.description}
            img={film.img}
            syncWithLocalStorage={syncWithLocalStorage}
          />
        </Col>
      ))}
    </Row>
  )
}

MoviesList.defaultProps = {
  error: false,
  loading: false,
}

export default MoviesList
