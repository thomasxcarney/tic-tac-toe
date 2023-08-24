const gameBoard = (() => {
    const gameBoardContainer = document.querySelector('.gameBoard-container');
    const gameBoardContent = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const renderGameBoard = function() {
        for(let i = 0; i < gameBoardContent.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add(i, 'cell');
            addListener(cell);
            cell.innerHTML = gameBoardContent[i];
            gameBoardContainer.appendChild(cell);
        };
    };

    const addListener = function(target) {
        let index = target.classList[0];
        target.addEventListener('click', event => {
            GameController.fillCell(index, gameBoardContent);
            clearGameBoard();
            renderGameBoard();
        })
    };

    const clearGameBoard = function(){
        gameBoardContainer.innerHTML = '';
    };

    return {
        renderGameBoard
    };
})();

const GameController = (() => {
    const playerCreator = (name, value) => {
        return {name, value};
    };

    const playerOne = playerCreator('Player One', 1);
    const playerTwo = playerCreator('Player Two', 2);

    let currentTurn = playerOne;

    const playerTurn = () => {
        currentTurn.value === 1 ? currentTurn = playerTwo : currentTurn = playerOne;
    };

    const fillCell = function(index, object){
        if(object[index] === ' '){
            if(currentTurn.value === 1) {
                object[index] = 'X';
            } else object[index] = 'O';
            playerTurn();
        };
    };

    const playGame = () => {
        
    };

   return{
        fillCell
   };
    
})();

gameBoard.renderGameBoard();