import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Board = () => {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [flags, setFlags] = useState(0);
    const [mines] = useState(10);
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(timer => timer + 1);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timer]);

    const resetGame = () => {
        const newBoard = createBoard(9, 9, mines);
        setBoard(newBoard);
        setGameOver(false);
        setFlags(0);
        setTimer(0);
        setIsRunning(false);
    };

    const createBoard = (rows, cols, mines) => {
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

    const getNeighbors = (board, r, c) => {
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

    const reveal = (r, c) => {
        if(gameOver || board[r][c].flagged || board[r][c].revealed){
            return;
        }

        let newBoard = board.map(row => row.map(cell => ({...cell})));
        newBoard[r][c].revealed = true;

        if(newBoard[r][c].mine){
            setGameOver(true);
            revealAllMines(newBoard);
        } else {
            if(newBoard[r][c].adjacent === 0){
                const neighbors = getNeighbors(newBoard, r, c);
                neighbors.forEach(cell => {
                    if(!cell.revealed && !cell.flagged){
                        reveal(cell.x, cell.y);
                    }
                });
            }
        }

        setBoard(newBoard);
        setIsRunning(true);
        checkWin(newBoard);
    };

    const revealAllMines = (board) => {
        for(let r=0; r<board.length; r++) {
            for(let c=0; c<board[0].length; c++) {
                if(board[r][c].mine){
                    board[r][c].revealed = true;
                }
            }
        }
        setBoard([...board]);
    };

    const toggleFlag = (r, c) => {
        if(gameOver || board[r][c].revealed){
            return;
        }
        let newBoard = board.map(row => row.map(cell => ({...cell})));
        if(newBoard[r][c].flagged){
            newBoard[r][c].flagged = false;
            setFlags(flags -1);
        } else {
            newBoard[r][c].flagged = true;
            setFlags(flags +1);
        }
        setBoard(newBoard);
    };

    const checkWin = (board) => {
        for(let r=0; r<board.length; r++) {
            for(let c=0; c<board[0].length; c++) {
                if(!board[r][c].mine && !board[r][c].revealed){
                    return;
                }
            }
        }
        setGameOver(true);
        alert("You win!");
    };

    const handleCellClick = (r, c) => {
        reveal(r, c);
    };

    const handleCellRightClick = (e, r, c) => {
        e.preventDefault();
        toggleFlag(r, c);
    };

    return (
        <div>
            <div className="mb-2">
                <span>Time: {timer}s </span>
                <span>Flags: {flags}/{mines}</span>
            </div>
            <div className="grid grid-cols-9 gap-px bg-gray-500">
                {board.map((row) => (
                    row.map(cell => (
                        <Cell 
                            key={`${cell.x}-${cell.y}`} 
                            cell={cell} 
                            onClick={handleCellClick} 
                            onRightClick={handleCellRightClick}
                        />
                    ))
                ))}
            </div>
            <button 
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer disabled:opacity-50"
                disabled={gameOver}
            >
                Restart
            </button>
        </div>
    );
};

export default Board;