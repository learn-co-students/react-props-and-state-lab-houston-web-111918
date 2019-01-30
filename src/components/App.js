import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { getAll, getByType } from '../data/pets.js'

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

  fetchPets = () => {

    if (this.state.filters.type !== 'all') {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(json => this.setState({
        // pets: json
         // adding line below to utilize getByType, otherwise, don't actually need it
        pets: getByType(this.state.filters.type)
      }))
      // can just do the following instead of fetching...
      // this.setState({pets: getByType(this.state.filters.type)})
    }
    else {
      fetch('/api/pets')
      .then(res => res.json())
      .then(json => this.setState({
        // pets: json
        // adding line below to utilize getAll, otherwise, don't actually need it
        pets:getAll()
      }))
      // can just do the following instead of fetching...
      // this.setState({pets:getAll()})
    }
    
  }

  onChangeType = (e) => {
    this.setState({ filters: { type: e.target.value } } )
  }
  
  onAdoptPet = (id) => {
    let pets = this.state.pets
    pets.map(pet => {
      if(pet.id === id){
        pet.isAdopted = true
        return pet
      }
      else {
        return pet
      }
    })
    this.setState({ pets: pets})
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
              <Filters  onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets}/>
           
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
