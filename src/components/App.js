import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

let updatePets = (array, id, values) => {
  return array.map( element => {
    if(element.id === id){
      return {...element, ...values}
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

    

  // isAdopted = () => {
  //   // this.state.pets.filter( pet => !pet.isAdopted)
  //   this.state.pets
  // }
  
  onAdoptPet = (id) => {
    console.log(id)
    this.setState({
      pets: updatePets(this.state.pets, id, {isAdopted: true})
    })
  }
  

  onFindPetsClick = (e) => {
    let type = this.state.filters.type 
    if(type === 'all'){
      fetch('/api/pets')
      .then(res => res.json())
      .then(res => {
      this.setState({
        pets: res
      })
    })  
    
    } 
    else{
      fetch(`/api/pets?type=${type}`)
      .then(res => res.json())
      .then(res => {
      this.setState({
        pets: res
      })
    })
    
    }
    // .then(res => console.log(this.state.filters.type))

    
  }
  
  onChangeType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })

  }


  render() {
    // let isAdopted = this.state.pets.filter( pet => !pet.isAdopted)
    // let notAdopted = this.state.pets.filter( pet => pet.isAdopted)
    return (
      
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
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
