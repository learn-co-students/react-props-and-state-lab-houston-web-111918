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


onFindPetsClick = () => {
  if (this.state.filters.type === "all") {
    fetch('/api/pets')
    .then(res => res.json())
    .then(pets => this.setState({pets}))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(pets => this.setState({pets}))
     }
    }

onChangeType = (e) => {
  this.setState({
    filters: {
      type: e.target.value}})
}

onAdoptPet = (id) => {
  let pets = this.state.pets.map(petId => {
    return petId.id === id ? { ...petId, isAdopted: true } : petId
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
              <Filters fetchPets={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
