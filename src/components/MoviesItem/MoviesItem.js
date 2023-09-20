import { Button, Col, Image, Row } from 'antd'
import './styles.css'
import { format } from 'date-fns'

import textShorter from '../../utils/textShorter'

export default function MoviesItem({ title, date, img, description }) {
  const imagePath = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${img}`

  let formattedDate = 'Unknown'

  if (date) {
    const dateObj = new Date(date)
    formattedDate = format(dateObj, 'MMMM d, yyyy')
  }

  return (
    <div className="MoviesItem">
      <Row>
        <Col span={11}>
          <Image width={183} src={imagePath} />
        </Col>
        <Col span={13} className="MoviesItem__content">
          <h2 className="MoviesItem__title">{title}</h2>
          <p className="MoviesItem__date">{formattedDate}</p>
          <ul className="MoviesItem__genres">
            <li>
              <Button>Cinema</Button>
            </li>
          </ul>
          <p className="MoviesItem__description">{textShorter(description)}</p>
        </Col>
      </Row>
    </div>
  )
}
