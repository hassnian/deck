import React, { Component } from 'react'

export class Card extends Component {
  render() {
    return (
      <img className="card" src={this.props.image} alt={this.props.name}/>
    )
  }
}

export default Card
