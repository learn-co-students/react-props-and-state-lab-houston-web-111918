import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchAllPets = () => {
    let petsAPI = '/api/pets'

    if (this.state.filters.type !== 'all') {
       petsAPI += `?type=${this.state.filters.type}`;
    }

    fetch(petsAPI)
      .then(res => res.json())
      .then(pets => this.setState({pets}))
  }

  onChangeType = (e) => {
    this.setState({filters: {type: e.target.value}})
  }

  ifIsAdopted = (id) => {
    let pets = this.state.pets.map(pet => {
      if (pet.id === id) {
        pet.isAdopted = true
        return pet
      }
      else {
        return pet
      }
    })
    this.setState({pets})
}

  render() {

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.fetchAllPets} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} ifIsAdopted={this.ifIsAdopted} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
