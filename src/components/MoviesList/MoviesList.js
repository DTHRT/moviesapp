import './styles.css'
import { Col, Row, Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'

import MoviesItem from '../MoviesItem'
import Loader from '../Loader/Loader'

export default function MoviesList({ films, error, loading }) {
  let content = null

  if (loading) {
    content = <Loader />
  }

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

function ShowMovies({ films }) {
  if (films.length === 0) {
    return <Alert message="No movies found" type="info" showIcon />
  }

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
