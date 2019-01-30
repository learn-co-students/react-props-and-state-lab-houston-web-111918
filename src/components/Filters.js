import React from 'react'

class Filters extends React.Component {
  render() {
    return (
      // <div onClick={(e) => this.props.onFindPetsClick()}
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
          <select defaultValue='all' onChange={(e) => this.props.onChangeType(e.target.value)} name="type" id="type">
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
         
        </div>

        <div className="field">
          <button onClick={(e) => this.props.onFindPetsClick(e)} className="ui secondary button">Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
