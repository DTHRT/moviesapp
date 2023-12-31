import './styles.css'
import MoviesList from '../MoviesList/MoviesList'
import { GlobalConsumer } from '../GlobalContext'

function RatedBlock() {
  return (
    <GlobalConsumer>
      {({ localFilms, syncWithLocalStorage }) => (
        <MoviesList films={localFilms} syncWithLocalStorage={syncWithLocalStorage} />
      )}
    </GlobalConsumer>
  )
}

export default RatedBlock
