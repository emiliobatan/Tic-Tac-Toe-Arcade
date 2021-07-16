// testing
// let testElem = document.querySelector('#board');
// console.log('testElem: ', testElem);

// State 
const state = {};

const resetState = () => { 
 // state.board = ['', '', '', '', '', '', '', '', '']; //  Function will wipe out the state and start over 
  state.board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.players = ['', ''];
    state.currentPlayerIdx = 0;
}

const winner = [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//  DOM SELECTORS 
const boardElem = document.querySelector('#board'); 
let playerTurnElem = document.querySelector('#playerTurn');

//  HELPER FUNCTIONS 
const changeTurn = () => { 
    state.currentPlayerIdx = (state.currentPlayerIdx + 1) % 2;
}

// DOM MANIPULATION FUNCTIONS 
const renderBoard = () => {
  boardElem.innerHTML = '';
    //create a row
    for (let rowIdx = 0; rowIdx < state.board.length; rowIdx++) {
      const row = state.board[rowIdx]
        for (let j = 0; j < row.length; j++) {
            // let column = row[j]                // row[j] should be the indexes for each row in the game 
          const columnElem = document.createElement('div');
          columnElem.classList.add('column');
          columnElem.dataset.index = rowIdx;
          columnElem.innerHTML = row;
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
// boardElem.addEventListener('click', function(event) { 
//     if (event.target.className !== 'column') { 
//         console.log('event.target: ', event.target);
//     }
// })
boardElem.addEventListener('click', function(event) { 
    if (event.target.className !== 'column') return;
        console.log('event.target: ', event.target);
        const columnIdx = event.target.dataset.index;
        console.log('columnIdx: ', columnIdx);
        state.board[columnIdx] = '';
        changeTurn();
        console.log('state.currentPlayerIdx: ', state.currentPlayerIdx);
        console.log('state.getCurrentPlayer(): ', state.getCurrentPlayer());
        render();
    
})

playerTurnElem.addEventListener('click', function(event) { 
    if (event.target.className !== 'start') return;
    const player1Name = document.querySelector('input[name=player1]');
    state.players[0] = player1Name.value;
    console.log('state.players: ', state.players[0]);
    const player2Name = document.querySelector('input[name=player2]');
    state.players[1] = player2Name.value;
    console.log('state.players: ', state.players[1]);
    // console.log('foo');
    render();
})


// BOOSTRAPPING 
resetState();
// render();
renderBoard();