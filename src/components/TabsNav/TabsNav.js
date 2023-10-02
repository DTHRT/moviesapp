import { Tabs } from 'antd'

import SearchBlock from '../SearchBlock/SearchBlock'
import './styles.css'
import RatedBlock from '../RatedBlock/RatedBlock'

const items = [
  {
    key: '1',
    label: 'Search',
    children: <SearchBlock />,
  },
  {
    key: '2',
    label: 'Rated',
    children: <RatedBlock />,
  },
]

function TabsNav() {
  return <Tabs className="TabsNav" defaultActiveKey="1" items={items} centered />
}

export default TabsNav
