import React from 'react'
import {getAll, getByType} from '../data/pets.js'
import Filters from './Filters'
import PetBrowser from './PetBrowser'
import { get } from 'https';

let updateElementInArray = (array, id, values) => {
  return array.map( element => {
    if(element.id == id){
      return { ...element, ...values }
    } else {
      return element
    }
  })
}

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

  adoptPet = (id) => {
    this.setState({
      pets: updateElementInArray(this.state.pets, id, {isAdopted: true})
    })
  }
  onChangeType = (e) => {
    let type = e.target.value
    this.setState({filters: {type: type}})
  }
  
  fetchData = () => {
    if(this.state.filters.type !== 'all'){
      this.setState({pets: getByType(this.state.filters.type)})
    }
    else{
      this.setState({pets: getAll()})
    }
  }

  

  
  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} filters={this.state.filters} fetchData={this.fetchData}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser fetchData={this.fetchData} pets={this.state.pets} adoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
