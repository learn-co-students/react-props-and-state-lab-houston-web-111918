import React from "react";
import { getAll, getByType } from "../data/pets";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

let updateElementInArray = (array, id, values) => {
  return array.map(element => {
    if (element.id == id) {
      return { ...element, ...values };
    } else {
      return element;
    }
  });
};

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      adopted: false,
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  adoptPet = (id) => {
    this.setState({
      pets: updateElementInArray(this.state.pets, id, {isAdopted: true})
    })
  }


  onChangeType = e => {
    let type = e.target.value;
    this.setState({ filters: { type: type } });
  };

  fetchData = () => {
    if (this.state.filters.type !== "all") {
      this.setState({ pets: getByType(this.state.filters.type) });
    } else {
      this.setState({ pets: getAll() });
    }
  };

  render() {
   
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div />
            <div className="four wide column">
              <Filters
                fetchData={this.fetchData}
                onChangeType={this.onChangeType}
              />
            </div>

            <div className="twelve wide column">
              <PetBrowser
                allPets={this.state.pets}
                adoptPet={this.adoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
