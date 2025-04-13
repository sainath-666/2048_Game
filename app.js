const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

const boardContainer = document.querySelector(".board");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("new-game");
let score = 0;
let gameOver = false;

// Add event listener for the New Game button
newGameButton.addEventListener("click", initGame);

function display() {
    let elem = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                boardContainer.children[elem].style.color = "";
                boardContainer.children[elem].innerText = "";
                boardContainer.children[elem].style.backgroundColor = "";
                elem++
            } else {
                if (board[row][col] >= 128) {
                    boardContainer.children[elem].style.color = "white";
                }
                boardContainer.children[elem].innerText = board[row][col];
                boardContainer.children[elem].style.backgroundColor = changeColor(row, col);
                elem++
            }
        }
    }
    
    // Update score display
    scoreDisplay.textContent = score;
}

function assignRandom() {
    // Count empty cells to check for game over
    let emptyCells = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyCells++;
            }
        }
    }
    
    if (emptyCells === 0) {
        if (!canMove()) {
            gameOver = true;
            setTimeout(() => {
                alert("Game Over! Your score: " + score);
            }, 300);
            return;
        }
        return;
    }
    
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    
    if (board[row][col] === 0) {
        let chance = Math.random();
        if (chance > 0.9) {
            board[row][col] = 4;
        } else {
            board[row][col] = 2;
        }
    } else {
        assignRandom();
    }
}
// Check if any moves are possible
function canMove() {
    // Check for possible horizontal moves
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === board[i][j + 1] && board[i][j] !== 0) {
                return true;
            }
        }
    }
    
    // Check for possible vertical moves
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i + 1][j] && board[i][j] !== 0) {
                return true;
            }
        }
    }
    
    return false;
}

// Move tiles up
function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        // Step 1: Compress the column (move all non-zero elements to the top)
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                    board[currentRow - 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow--;
                    moved = true;
                }
            }
        }
        
        // Step 2: Merge tiles with the same value
        for (let row = 0; row < 3; row++) {
            if (board[row][col] !== 0 && board[row][col] === board[row + 1][col]) {
                board[row][col] *= 2;
                score += board[row][col];
                board[row + 1][col] = 0;
                moved = true;
            }
        }
        
        // Step 3: Compress again after merging
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                    board[currentRow - 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow--;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles down
function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        // Step 1: Compress the column (move all non-zero elements to the bottom)
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && board[currentRow + 1][col] === 0) {
                    board[currentRow + 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow++;
                    moved = true;
                }
            }
        }
        
        // Step 2: Merge tiles with the same value
        for (let row = 3; row > 0; row--) {
            if (board[row][col] !== 0 && board[row][col] === board[row - 1][col]) {
                board[row][col] *= 2;
                score += board[row][col];
                board[row - 1][col] = 0;
                moved = true;
            }
        }
        
        // Step 3: Compress again after merging
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && board[currentRow + 1][col] === 0) {
                    board[currentRow + 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow++;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles left
function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        // Step 1: Compress the row (move all non-zero elements to the left)
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                    board[row][currentCol - 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol--;
                    moved = true;
                }
            }
        }
        
        // Step 2: Merge tiles with the same value
        for (let col = 0; col < 3; col++) {
            if (board[row][col] !== 0 && board[row][col] === board[row][col + 1]) {
                board[row][col] *= 2;
                score += board[row][col];
                board[row][col + 1] = 0;
                moved = true;
            }
        }
        
        // Step 3: Compress again after merging
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                    board[row][currentCol - 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol--;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Move tiles right
function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        // Step 1: Compress the row (move all non-zero elements to the right)
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && board[row][currentCol + 1] === 0) {
                    board[row][currentCol + 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol++;
                    moved = true;
                }
            }
        }
        
        // Step 2: Merge tiles with the same value
        for (let col = 3; col > 0; col--) {
            if (board[row][col] !== 0 && board[row][col] === board[row][col - 1]) {
                board[row][col] *= 2;
                score += board[row][col];
                board[row][col - 1] = 0;
                moved = true;
            }
        }
        
        // Step 3: Compress again after merging
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && board[row][currentCol + 1] === 0) {
                    board[row][currentCol + 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol++;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

window.addEventListener('keyup', (e) => {
    if (gameOver) return;
    
    let moved = false;
    
    switch (e.key) {
        case "ArrowUp":
            moved = moveUp();
            break;
        case "ArrowDown":
            moved = moveDown();
            break;
        case "ArrowLeft":
            moved = moveLeft();
            break;
        case "ArrowRight":
            moved = moveRight();
            break;
        default:
            return;
    }
    
    if (moved) {
        display();
        assignRandom();
        display();
        
        // Check for winning condition (reaching 2048)
        checkWin();
    }
})

function changeColor(row, col) {
    let value = board[row][col];
    return `hsla(${30 * Math.log2(value)}, 70%, 60%, 1)`;
}
// Initialize the game
function initGame() {
    // Reset variables
    score = 0;
    gameOver = false;
    
    // Clear the board
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    
    // Add two initial tiles
    assignRandom();
    assignRandom();
    display();
    
    // Update score display
    scoreDisplay.textContent = score;
}

// Function to check if player has won (reached 2048)
function checkWin() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 2048) {
                setTimeout(() => {
                    const playAgain = confirm("Congratulations! You've reached 2048! Continue playing?");
                    if (!playAgain) {
                        initGame();
                    }
                }, 300);
                return;
            }
        }
    }
}

// Start the game
initGame();

// Add touch support for mobile devices
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    if (gameOver) return;
    
    let moved = false;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Determine if the swipe was horizontal or vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 50) {
            // Right swipe
            moved = moveRight();
        } else if (deltaX < -50) {
            // Left swipe
            moved = moveLeft();
        }
    } else {
        // Vertical swipe
        if (deltaY > 50) {
            // Down swipe
            moved = moveDown();
        } else if (deltaY < -50) {
            // Up swipe
            moved = moveUp();
        }
    }
    
    if (moved) {
        display();
        assignRandom();
        display();
        
        // Check for winning condition (reaching 2048)
        checkWin();
    }
}