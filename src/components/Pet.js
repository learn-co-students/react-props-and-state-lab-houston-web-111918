import React from 'react'

export default class Pet extends React.Component {
  
  render() {
    const adopted = <button className="ui disabled button">Already adopted</button>
    const adoptButton = <button onClick={() => this.props.adoptPet(this.props.selectedPet.id)}className="ui primary button">Adopt pet</button>
    
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.selectedPet.gender == 'male' ? '♀' : '♂'}
            {this.props.selectedPet.name}
          </a>
          <div className="meta">
            <span className="date">Pet Type: {this.props.selectedPet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.selectedPet.age}</p>
            <p>Weight: {this.props.selectedPet.weight}lbs</p>
          </div>
        </div>
        <div className="extra content">
          {this.props.selectedPet.isAdopted == true ? adopted : adoptButton }
         
        </div>
      </div>
    )
  }
}


