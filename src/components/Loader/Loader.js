import './styles.css'
import { Spin } from 'antd'

function Loader() {
  return (
    <div className="Loader">
      <Spin className="Loader__spin" />
    </div>
  )
}

export default Loader
