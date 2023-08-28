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

    const refillContent = function (){
        gameBoardContent.length = 0;
        for(let i = 0; i <  9; i++){
            gameBoardContent.push(' ');
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

    const threeInRow = function(index1, index2, index3, marker) {
        if (gameBoardContent[index1] === marker && gameBoardContent[index2] === marker && gameBoardContent[index3] === marker){
            return true;
        };
    };

    const checkForThreeInRow = function(marker){
        if(threeInRow(0, 1, 2, marker) || threeInRow(0, 3, 6, marker) || threeInRow(0, 4, 8, marker) || 
        threeInRow(1, 4, 7, marker) || threeInRow(2, 5, 8, marker) || threeInRow(2, 4, 6, marker) || 
        threeInRow(3, 4, 5, marker) || threeInRow(6, 7, 8, marker)) {
            return true;
        } else false;
    };

    const checkForTie = function() {
        if(!gameBoardContent.includes(' ') && !checkForThreeInRow('X') && !checkForThreeInRow('O')){
            alert('it\'s a tie');
            return true;
        };
    };

    const resetGameBoard = function(){
        refillContent();
        clearGameBoard();
    };

    return {
        renderGameBoard,
        checkForThreeInRow,
        checkForTie,
        resetGameBoard
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
            checkForWin();
            gameBoard.checkForTie();
            if(gameBoard.checkForTie == true){
                changeBtnToRestart();
            }
            playerTurn();
        };
    };

    const checkForWin = function() {
        if(gameBoard.checkForThreeInRow('X')){
            alert('Player one wins');
            changeBtnToRestart();
            return true;
        } else if(gameBoard.checkForThreeInRow('O')) {
            alert('Player two wins');
            changeBtnToRestart();
            return true;
        };
    };

    const startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', event => {
        playGame();
    });

    const changeBtnToRestart = function(){
        startBtn.innerHTML = 'Restart';
    }

    const player1Name = document.getElementsByClassName('playerName')[0];
    const player2Name = document.getElementsByClassName('playerName')[1];

    const setPlayerNames = function () {
        if(player1Name.innerHTML === '' && player2Name.innerHTML === ''){
            player1Name.innerHTML = prompt('Enter player one name', ' ');
            player2Name.innerHTML = prompt('Enter player two name', ' ');
        };
    };

    const playGame = function () {
        gameBoard.resetGameBoard();
        setPlayerNames();
        gameBoard.renderGameBoard();
    };

   return{
        fillCell
   };
    
})();