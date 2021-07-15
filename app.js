// testing
// let testElem = document.querySelector('#board');
// console.log('testElem: ', testElem);

// State 
const state = {}; 

const resetState = () => { 
    // state.board = ['', '', '', '', '', '', '', '', '']; //  Function will wipe out the state and start over 
    state.board = [ 
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
        {value: '', isTurned: false},
    ];
    state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
    state.players = ['', ''];
    state.currentPlayerIdx = 0;
}

//  DOM SELECTORS 
const boardElem = document.querySelector('#board'); 
let playerTurnElem = document.querySelector('#playerTurn');

//  HELPER FUNCTIONS 
const changeTurn = () => { 
    state.currentPlayerIdx = (state.currentPlayerIdx + 1) % 2;
}

// DOM MANIPULATION FUNCTIONS 
const renderBoard = () => { 
    boardElem.innerText = ''; // This allows us to refresh the board to blank 
    for(let i=0; i<state.board.length; ++i) {      // Creating the grid for the tic tac toe game 
        const grid = state.board[i];              // This creates the grid for the game 
        // console.log('grid: ', grid);
        const boxElem = document.createElement('div');   // This creates the boxes 
        boxElem.classList.add('box');
        // console.log('boxElem: ', boxElem);
        boxElem.dataset.index = i;     // Grabs data from the board 
        if(grid.isTurned) boxElem.innerText = grid.value;      // This renders to the grid
        boardElem.appendChild(boxElem);    // This creates the boxElem to go to the DOM
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
    if (event.target.className !== 'box') return;
        console.log('event.target: ', event.target);
        const boxIdx = event.target.dataset.index;
        console.log('boxIdx: ', boxIdx);
        state.board[boxIdx].isTurned = true;
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
render();