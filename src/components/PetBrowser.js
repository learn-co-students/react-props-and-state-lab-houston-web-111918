import React from 'react'

import Pet from './Pet'

export default class PetBrowser extends React.Component {
  render() {
    // console.log(this.props)
    return (
    <div className="ui cards">
    
    {this.props.allPets.map(pet =>
      <Pet adoptPet={this.props.adoptPet} key={pet.id} selectedPet={pet}  />)}
    </div>
    )
  }
    
}


