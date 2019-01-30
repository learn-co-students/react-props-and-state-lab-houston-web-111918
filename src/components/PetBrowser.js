import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return <div className="ui cards">
      {this.props.pets.map( pet =>
        <Pet selectedPet={pet} key={pet.id} adoptPet={this.props.adoptPet}/>
        )}

    </div>
  }
}

export default PetBrowser
