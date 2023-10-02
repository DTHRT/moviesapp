import './styles.css'

import { Component } from 'react'

import TabsNav from '../TabsNav/TabsNav'
import MovieService from '../../services/MovieService'
import { GlobalProvider } from '../GlobalContext'

export class App extends Component {
  #movieService = new MovieService()

  constructor(props) {
    super(props)

    this.state = {
      localFilms: this.#movieService.getRatedList(),
    }

    this.syncWithLocalStorage = () => {
      this.setState({ localFilms: this.#movieService.getRatedList() })
    }
  }

  componentDidMount() {
    this.#movieService.createStorage()
  }

  render() {
    const { localFilms } = this.state

    const obj = { localFilms, syncWithLocalStorage: this.syncWithLocalStorage }

    return (
      <div className="App">
        <div className="App__container">
          <GlobalProvider value={obj}>
            <TabsNav />
          </GlobalProvider>
        </div>
      </div>
    )
  }
}

export default App
