// testing
// let testElem = document.querySelector('#board');
// console.log('testElem: ', testElem);

// State 
const state = {}; 

let resetState = () => { 
    state.board = ['', '', '', '', '', '', '', '', '']; //  Function will wipe out the state and start over 
};

//  DOM SELECTORS 
let boardElem = document.querySelector('#board'); 

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
        boxElem.innerText = grid;      // This renders to the grid
        boardElem.appendChild(boxElem);    // This creates the boxElem to go to the DOM
    }
}

// EVENT LISTENERS 
boardElem.addEventListener('click', function(event) { 
    if (event.target.className === 'box') { 
        console.log('event.target: ', event.target);
        let boxIdx = event.target.dataset.index;
        console.log('boxIdx: ', boxIdx);
        state.board[boxIdx] = 'X'
        renderBoard();
    }
})


// BOOSTRAPPING 
resetState();
renderBoard();