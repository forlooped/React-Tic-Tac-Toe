import React, { Component } from 'react';
import './Tile.css';

export default class Tile extends Component {
  tileClick(props) {
    props.updateBoard(props.loc, props.turn);
  }
  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
        <p>{this.props.value}</p>
        { /* this value is going to be whichever player played in this tile, i.e. the value of the gameBoard */ }
      </div>
    );
  }
}

// Notes on why I have to use this.tileClick
