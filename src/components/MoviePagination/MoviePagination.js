import './styles.css'
import { Pagination } from 'antd'

export default function MoviePagination({ current, total, onPaginationChange }) {
  return (
    <div className="MoviePagination">
      <Pagination
        className="MoviePagination__pagination"
        current={current}
        total={total}
        pageSize={20}
        onChange={onPaginationChange}
      />
    </div>
  )
}
