export const createBoard = (rows, cols, mines) => {
    let board = [];
    for(let r=0; r<rows; r++) {
        let row = [];
        for(let c=0; c<cols; c++) {
            row.push({
                x: r,
                y: c,
                mine: false,
                revealed: false,
                flagged: false,
                adjacent: 0,
            });
        }
        board.push(row);
    }

    let placedMines = 0;
    while(placedMines < mines){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if(!board[r][c].mine){
            board[r][c].mine = true;
            placedMines++;
            console.log(`Placed mine at (${r}, ${c})`);
        }
    }

    for(let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            if(!board[r][c].mine){
                let count = 0;
                const neighbors = getNeighbors(board, r, c);
                neighbors.forEach(cell => {
                    if(cell.mine) count++;
                });
                board[r][c].adjacent = count;
            }
        }
    }

    return board;
};

export const getNeighbors = (board, r, c) => {
    const neighbors = [];
    for(let i=Math.max(r-1,0); i<=Math.min(r+1, board.length-1); i++) {
        for(let j=Math.max(c-1,0); j<=Math.min(c+1, board[0].length-1); j++) {
            if(i !== r || j !== c){
                neighbors.push(board[i][j]);
            }
        }
    }
    return neighbors;
};

export const revealAllMines = (board) => {
    console.log('Revealing all mines');
    for(let r=0; r<board.length; r++) {
        for(let c=0; c<board[0].length; c++) {
            if(board[r][c].mine){
                board[r][c].revealed = true;
            }
        }
    }
};