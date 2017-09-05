import React, { Component } from 'react';
import './Announcement.css';

export default class Announcement extends Component {
  render() {
    return(
      <div className={this.props.winner ? 'visible' : 'hidden'}>        
        <h1>Game Over {this.props.winner} wins </h1>
      </div>
    )
  }
}
