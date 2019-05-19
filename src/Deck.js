import React, { Component } from "react";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
const ANYWHERE = "https://cors-anywhere.herokuapp.com/";

export class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(ANYWHERE + API_BASE_URL + "/new/shuffle");
    console.log(deck.data);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(`${ANYWHERE}${cardrl}`);
      if (!cardRes.data.success) {
        throw new Error("No card remaining");
      }
      console.log(cardRes.data);
      let card = cardRes.data.cards[0];
      this.setState(st => {
        return {
          drawn: [
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.suit} of ${card.value}`
            }
          ]
        };
      });
    } catch (err) {
      alert(err);
    }
  }
  render() {
    return (
      <div>
        <h1>card dealear</h1>
        <button onClick={this.getCard}>Get card!</button>
      </div>
    );
  }
}

export default Deck;
