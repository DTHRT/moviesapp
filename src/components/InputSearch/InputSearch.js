import { Input } from 'antd'
import './styles.css'
import _ from 'lodash'

export default function InputSearch({ onSearchedValueChange }) {
  return (
    <Input className="InputSearch" placeholder="Type to search..." onChange={_.debounce(onSearchedValueChange, 1000)} />
  )
}
