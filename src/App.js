import React, { Component } from 'react';
import './App.css';
import Announcement from './Announcement';
import ResetButton from './ResetButton';
import Tile from './Tile';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        '', '', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      winner: null,
      turn: 'x'
    }
  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      winner: null,
      turn: 'x'
    })
  }

  updateBoard(loc, player) {
    console.log(this.state.winner, this.state.turn, this.state.gameBoard);
    if(this.state.winner !== null) {
      // make game over Component visible. And more importantly, when there's an winner, the return() makes sure, we are not able to play further.
      console.log("Winner", this.state.winner);
      return;
    }

    // If a tile already contains an 'x' or an 'o' then we should return. Here "loc" is the index no of the array of the gameBoard
    if(this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o') {
      return; // invalid move
    }

    let currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc, 1, this.state.turn);
    //The above .splice() method removes one item at loc-index (i.e. at the location that was clicked) position and inserts this.state.turn at loc-index position. But in here, I can understand it as just insering 1 element, which is, this.state.turn at the loc-index position. So, basically I am just splicing in a player's move at loc-index.


      this.setState({gameBoard: currentGameBoard}, function(){
      let moves = this.state.gameBoard.join('').replace(/ /g, '');
      // We are joining all the elements of the array with no delimiters (so just back to back to back), and then replace any empty space with nothing (the single quotes with no space in between). What this gives is then - the length of moves will become the no of plays that has been played so far.
      console.log('Moves:', moves, 'Winner:', this.state.winner);
      if(moves.length === 9) {
        this.setState({winner: 'd'});
        // i.e. if all the tiles are filled its a draw. Make the game over component visible.
        return;
      } else {
        // Now implement Winner logic - The Game assumes that for given symbol, it is considered a winner, if three “instances” of that symbol occupy a row, a column, or one of two slants.  For a player, say 'x', there are 8 ways to win and each corresponds to 3 'x' in a row/column/diagonal.
       let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
       if(topRow.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }
       let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];
       if(middleRow.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }
       let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];
       if(bottomRow.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }
       let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
       if(leftCol.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }

       let middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
       if(middleCol.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }

       let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
       if(rightCol.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }

       let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];
       if(leftDiag.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }

       let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];
       if(bottomRow.match(/xxx|ooo/)) {
         this.setState({winner: this.state.turn});
         return;
       }
       // After checking all the above possibilites for winning combinations, if there's no winner, that means we need to change over to the other player, i.e. the next turn. So, below we setState for current turn, based on the previous turn.
       this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x'});
      }
    }, this);
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic-Tac-Toe</h1>
          <Announcement winner={this.state.winner} />
          <ResetButton reset={this.resetBoard.bind(this)} />
          {/* Here with ResetButton, I am passing a prop, which is a function and we have to use the .bind(this) here as this resetBoard() function is defined in App component and not ResetButton component and hence we have to bind the "this" from App component. Otherwise ResetButton component will not know from where the resetBoard() function comes from */}
        </div>
        {this.state.gameBoard.map(function (value, i) {
            return (
              <Tile
                key={i}
                loc={i}
                value={value}
                updateBoard={this.updateBoard.bind(this)}
                turn={this.state.turn} />
            );
            {/*In the above Tile Comoponent, the "value" is the value of the tile, i.e. what is inside that square. And in updateBoard we use .bind() to make sure that its "this" refers App Component's this instead of Tile Component's - in other words, the funtion updateBoard is bound to App Component's "this"
            */}
        }.bind(this))}
      </div>
    );
  }
}
