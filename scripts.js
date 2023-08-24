const gameBoard = (() => {
    const gameBoardContainer = document.querySelector('.gameBoard-container');
    const gameBoardContent = ['O', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O'];
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
            fillCell(index);
            clearGameBoard();
            renderGameBoard();
            GameController.playerTurn();
        })
    };

    const fillCell = function(index){
        if(GameController.currentTurn.value === 1) {
            gameBoardContent[index] = 'X';
        } else gameBoardContent[index] = 'O';
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

   return{ 
        currentTurn, 
        playerTurn
   };
    
})();

gameBoard.renderGameBoard();