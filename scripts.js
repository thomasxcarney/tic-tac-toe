const gameBoard = (() => {
    const gameBoardContainer = document.querySelector('.gameBoard-container');
    const gameBoardContent = ['O', 'X', 'O', 'O', 'X', 'O', 'X', 'X', 'O'];
    const renderGameBoard = function() {
        for(let i = 0; i < gameBoardContent.length; i++) {
            let cell = document.createElement('div');
            cell.classList.add(i, 'cell');
            cell.innerHTML = gameBoardContent[i];
            gameBoardContainer.appendChild(cell);
        };
    };
    return {
        renderGameBoard
    };
})();

gameBoard.renderGameBoard();