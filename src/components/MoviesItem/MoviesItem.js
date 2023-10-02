/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { Component } from 'react'
import { Tag, Image, Empty, Rate } from 'antd'
import { format } from 'date-fns'
import classNames from 'classnames'
import './styles.css'

import textShorter from '../../utils/textShorter'
import MovieService from '../../services/MovieService'

const movieService = new MovieService()

export default class MoviesItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      genres: [],
      rating: null,
    }

    this.checkRating = (id) => {
      const ratedList = movieService.getRatedList()
      const movie = ratedList.find((item) => item.id === id)
      return movie ? movie.rate : 0
    }

    this.onRate = (number) => {
      if (number === 0) {
        const { id } = this.props
        movieService.removeFromRatedList(id)
      } else {
        movieService.addToRatedList({ ...this.props, rate: number })
        this.setState({ rating: number })
      }

      props.syncWithLocalStorage()
    }
  }

  componentDidMount() {
    const { genreIds } = this.props

    movieService.getGenres(genreIds).then((res) => {
      this.setState(() => {
        const { id } = this.props

        return {
          genres: res,
          rating: this.checkRating(id),
        }
      })
    })
  }

  render() {
    const { title, date, img, description, id, genreIds } = this.props

    let formattedDate = 'Unknown'

    if (date) {
      const dateObj = new Date(date)
      formattedDate = format(dateObj, 'MMMM d, yyyy')
    }

    const { genres, rating } = this.state

    return (
      <div className="MoviesItem">
        <div className="MoviesItem__row">
          <div className="MoviesItem__imgContainer">
            {img ? <Image width={183} src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${img}`} /> : <Empty />}
          </div>
          <div className="MoviesItem__content">
            <span
              className={classNames('MoviesItem__circleRating', {
                'MoviesItem__circleRating--red': rating > 0 && rating < 3,
                'MoviesItem__circleRating--orange': rating >= 3 && rating < 5,
                'MoviesItem__circleRating--yellow': rating >= 5 && rating < 7,
                'MoviesItem__circleRating--green': rating >= 7,
              })}
            >
              {rating}
            </span>
            <h2 className="MoviesItem__title">{textShorter(title, 20)}</h2>
            <p className="MoviesItem__date">{formattedDate}</p>
            <ul className="MoviesItem__genres">
              {genres.map((genre) => (
                <li key={`${genre}}`}>
                  <Tag>{genre}</Tag>
                </li>
              ))}
            </ul>
            <p className="MoviesItem__description">{textShorter(description)}</p>
            <div className="MoviesItem__rateWrapper">
              <Rate allowHalf count={10} defaultValue={this.checkRating(id)} onChange={this.onRate} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
