// testing
let testElem = document.querySelector('#board');
console.log('testElem: ', testElem);

// State 
let state = {}; 

function resetState () { 
    state.board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
};

//  DOM SELECTORS 
let boardElem = document.querySelector('#board'); 

// DOM MANIPULATION FUNCTIONS 
function renderBoard () { 
    // How to empty an Element
    boardElem.innerText = '';
    for(let i=0; i<state.board.length; ++i) { 
        let grid = state.board[i];
        // console.log('grid: ', grid);
        let boxElem = document.createElement('div');
        boxElem.classList.add('box');
        // console.log('boxElem: ', boxElem);
        boxElem.innerText = grid;
        boardElem.appendChild(boxElem);
    }
}

// EVENT LISTENERS 



// BOOSTRAPPING 
resetState();
renderBoard();