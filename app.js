// State 
const state = {};
state.currentPlayerIdx = 0;
state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
state.players = ['', ''];
const resetState = () => { 
  state.board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.players = ['', ''];
    state.currentPlayerIdx = 0;
}

//  DOM SELECTORS 
const boardElem = document.querySelector('#board'); 
const playerTurnElem = document.querySelector('#playerTurn');
const restartBtn = document.querySelector('.restartBtn');


//  HELPER FUNCTIONS 
const changeTurn = () => {
  if (state.currentPlayerIdx == 0) { 
    state.currentPlayerIdx = 1;
  }
  else { 
    state.currentPlayerIdx = 0;
  }
}

const flattenBoard = () => { 
  let flatBoard = [].concat.apply([], state.board);
  return flatBoard;
}

const checkWinner = (player) => { 
  const newBoard = flattenBoard(); 
  let symbol = "";
  if(state.currentPlayerIdx === 0) {
    symbol = "X";
  } else {
    symbol = "O";
  }
  let winner = false
  if (newBoard[0] === symbol && newBoard[1] === symbol && newBoard[2] === symbol) { 
    console.log('Winner on top row ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[3] === symbol && newBoard[4] === symbol && newBoard[5] === symbol) { 
    console.log('Winner on middle row ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[6] === symbol && newBoard[7] === symbol && newBoard[8] === symbol) { 
    console.log('Winner is bottom row ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[0] === symbol && newBoard[3] === symbol && newBoard[6] === symbol) { 
    console.log('Winner is first column ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[1] === symbol && newBoard[4] === symbol && newBoard[7] === symbol) { 
    console.log('Winner is second column ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[2] === symbol && newBoard[5] === symbol && newBoard[8] === symbol) { 
    console.log('Winner is third column ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[0] === symbol && newBoard[4] === symbol && newBoard[8] === symbol) { 
    console.log('Winner is top left to bottom right diagonal ', `${state.getCurrentPlayer()}`); winner = true;
  }
  if (newBoard[2] === symbol && newBoard[4] === symbol && newBoard[6] === symbol) { 
    console.log('Winner is top right to bottom left diagonal ', `${state.getCurrentPlayer()}`); winner = true;
  }
  return winner;
} 


// DOM MANIPULATION FUNCTIONS 
const renderBoard = () => {
  boardElem.innerHTML = '';
    //create a row
  for (let rowIdx = 0; rowIdx < state.board.length; rowIdx++) {
    const row = state.board[rowIdx]
    for (let j = 0; j < row.length; j++) {
    const columVal = row[j];
    const columnElem = document.createElement('div');
    columnElem.classList.add('column');
    columnElem.dataset.row = rowIdx;
    columnElem.dataset.index = j;
    columnElem.innerHTML = columVal;
    boardElem.appendChild(columnElem);
    }
  }
}

const renderPlayer = () => { 
  let text;
  if (!state.players[0] || !state.players[1]) {
    text = `
      <input name='player1' placeholder='Player 1'>
      <input name='player2' placeholder='Player 2'>
      <button class="start">Start</button>
    `
  } else {
      // if we do have players
    //  console.log(state.getCurrentPlayer());
     text = `It's currently ${state.getCurrentPlayer()}'s turn`
  }
  playerTurnElem.innerHTML = text;
}

const render = () => { 
  renderBoard();
  renderPlayer();
}

// EVENT LISTENERS 

boardElem.addEventListener('click', function(event) { 
  if (event.target.childNodes.length) return;   //  Checks to see if anything is inside clicked element 
  if (event.target.className !== 'column') return;
  const columnIdx = event.target.dataset.index;
  const rowIdx = event.target.dataset.row;
  if(state.currentPlayerIdx === 0) {
    state.board[rowIdx][columnIdx] = 'X';
  } else {
    state.board[rowIdx][columnIdx] = 'O';
  }
  if (checkWinner(state.getCurrentPlayer)) { 
    playerTurnElem.innerHTML = `${state.getCurrentPlayer()} has won!`;
  } else {
    render();
    changeTurn();
  }
})

playerTurnElem.addEventListener('click', function(event) { 
    if (event.target.className !== 'start') return;
    const player1Name = document.querySelector('input[name=player1]');
    state.players[0] = player1Name.value;
    const player2Name = document.querySelector('input[name=player2]');
    state.players[1] = player2Name.value;
    if(state.players[1] == '' ) { 
      state.players[1] = 'Computer';
    }
    changeTurn();
    render();
})

restartBtn.addEventListener('click', function(event) {
  console.log(event);
  if (event.target.className != 'restartBtn') return;
  resetState();
  render();
  console.log('resetState: ', resetState);
})


// BOOSTRAPPING 
resetState();
render();
renderBoard();
checkWinner();
changeTurn();