import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleChange = e => {
    this.setState({
      filters: {
        type: e.target.value
      }
    });
  };

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch(`/api/pets`)
        .then(res => res.json())
        .then(pets => this.setState({ pets }));
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then(res => res.json())
        .then(pets => this.setState({ pets }));
    }
  };

  onAdoptPet = id => {
    let pets = this.state.pets.map(petId => {
      return petId.id === id ? { ...petId, isAdopted: true } : petId;
    });
    this.setState({ pets });
  };
  //     if (animalId === id) {
  //       return this.setState({ ...this.state.pets, isAdopted: true });
  //     } else {
  //       return { ...this.state.pets };
  //     }
  //   });
  // };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                handleChange={this.handleChange}
                onClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                petsData={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
