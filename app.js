// State 
const state = {};
state.currentPlayerIdx = 0;
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

// let flatList = []; 
// const winner = [ 
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ];

// const winner = { 
//   0:
//   1:
//   2:
//   3: 
//   4:
//   5: 
//   6:
//   7:
//   8:
// }

// true = X | false = O
// let isPlayer1 = true;


//  DOM SELECTORS 
const boardElem = document.querySelector('#board'); 
const playerTurnElem = document.querySelector('#playerTurn');


//  HELPER FUNCTIONS 
const changeTurn = () => { 
  // state.currentPlayerIdx = (state.currentPlayerIdx + 1) % 2;
  if (state.currentPlayerIdx === 0) { 
    state.currentPlayerIdx = 1;
    return
  }
  else { 
    state.currentPlayerIdx = 0;
    return
  }

  // if(isPlayer1 == true) {
  //   isPlayer1 = false;
  // } else {
  //   isPlayer1 = true;
  // }
  // isPlayer1 = !isPlayer1;
}

const flattenBoard = () => { 
  let flatBoard = [].concat.apply([], state.board);
  return flatBoard;
}


const checkWinner = () => { 
  const newBoard = flattenBoard(); 
  console.log('check winner: ', newBoard);
  if (newBoard[0] === newBoard[1] && newBoard[1] === newBoard[2]) { 
    console.log('Winner is ', `${state.getCurrentPlayer()}`);
  }

} 

// }
// function equals(a, b, c){ 
//   return a === b && b === c && a!= '';
// }

// function checkMoves() { 
//   let winner = null; 
//   if (equals(state.board[rowIdx][0], state.board[rowIdx][1], state.board[rowIdx][2])) { 
//     winner = state.board[rowIdx][0];
//   }

//   // Checks if horizontal rows have won 
// }
// console.log(flattenBoard(state.board));
// let flatBoard = [].concat.apply([], state.board);

// function flattenList (list) { 
//   let board = state.board
//   let flatList = []; 
//   for (let i = 0; i < board.length: i++) { 
//     for (let j= 0; j < )
//   }
// }

// function flattenList(list) { 
//   let flatList = []; 

//   list.forEach(element => {
//     if (Array.isArray(element)) { 
//       flatList = flatList.concat(flattenList(element));
//     }
//     else { 
//       flatList.push(element);
//     }
//   });
  
//     return flatList;

// const newBoard = flattenList(state.board);

// const winningMove = (player) => { 
//   if(flattenList(state.board)[0] === player) { 
//     if (flattenList(state.board)[1] === player && flattenList(state.board)[2]) { 
//       console.log('winner');
//       return true;
//     }
//   }
// }


// function checkMoves() { 
//   let winner = null; 
//   // Checking for Horizontal winners 
//   for (let i = 0; i < 3; i++) {
//     if (equals(state.board[i][0], state.board[i][1], state.board[i][2])) {
//       winner = state.board[i][0];
//     }
//   }

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
  // console.log('event.target: ', event.target);
  const columnIdx = event.target.dataset.index;
  // console.log('columnIdx: ', columnIdx);
  const rowIdx = event.target.dataset.row;
  // console.log(isPlayer1);
  if(state.currentPlayerIdx === 0) {
    state.board[rowIdx][columnIdx] = 'X';
  } else {
    state.board[rowIdx][columnIdx] = 'O';
  }
  
  // console.log(rowIdx);
  // console.log(columnIdx);
  // console.log(state)
  // console.log(state.board)
  // console.log('Flat List', flattenList(state.board));
  // console.log(state.board);
  changeTurn();
  // console.log('state.currentPlayerIdx: ', state.currentPlayerIdx);
  // console.log('state.getCurrentPlayer(): ', state.getCurrentPlayer());
  render();
  checkWinner();
  // console.log(newBoard);
  // console.log(newBoard);
  // checkMoves();
  // console.log(checkMoves);
  // winningMove();
  // console.log(flattenList(state.board));

})

playerTurnElem.addEventListener('click', function(event) { 
    if (event.target.className !== 'start') return;
    const player1Name = document.querySelector('input[name=player1]');
    state.players[0] = player1Name.value;
    // console.log('state.players: ', state.players[0]);
    const player2Name = document.querySelector('input[name=player2]');
    state.players[1] = player2Name.value;
    // console.log('state.players: ', state.players[1]);
    render();
})


// BOOSTRAPPING 
resetState();
render();
renderBoard();