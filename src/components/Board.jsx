import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { createBoard, getNeighbors, revealAllMines as revealAllMinesUtil } from '../utils/boardUtils';
import useTimer from '../hooks/useTimer';

const Board = () => {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [flags, setFlags] = useState(0);
    const [mines] = useState(10);
    const { timer, isRunning, startTimer, resetTimer } = useTimer();
    
    useEffect(() => {
        resetGame();
    }, []);
    
    const resetGame = () => {
        const newBoard = createBoard(9, 9, mines);
        setBoard(newBoard);
        setGameOver(false);
        setFlags(0);
        resetTimer();
        stopTimer();
        console.log('Game reset');
    };
    
    const revealAllMines = (newBoard) => {
        revealAllMinesUtil(newBoard);
        setBoard([...newBoard]);
    };
    
    const reveal = (r, c) => {
        if(gameOver || board[r][c].flagged || board[r][c].revealed){
            return;
        }
    
        console.log(`Revealing cell at (${r}, ${c})`);
        let newBoard = board.map(row => row.map(cell => ({...cell})));
        newBoard[r][c].revealed = true;
    
        if(newBoard[r][c].mine){
            console.log('Mine hit! Game Over.');
            setGameOver(true);
            revealAllMines(newBoard);
            stopTimer();
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
        if (!isRunning) {
            startTimer();
        }
        checkWin(newBoard);
    };
    
    const toggleFlag = (r, c) => {
        if(gameOver || board[r][c].revealed){
            return;
        }
        console.log(`Toggling flag at (${r}, ${c})`);
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
    
    const checkWin = (newBoard) => {
        console.log('Checking for win condition');
        for(let r=0; r<newBoard.length; r++) {
            for(let c=0; c<newBoard[0].length; c++) {
                if(!newBoard[r][c].mine && !newBoard[r][c].revealed){
                    return;
                }
            }
        }
        setGameOver(true);
        stopTimer();
        alert("You win!");
        console.log('Player won the game');
    };
    
    const handleCellClick = (r, c) => {
        reveal(r, c);
    };
    
    const handleCellRightClick = (e, r, c) => {
        e.preventDefault();
        toggleFlag(r, c);
    };
    
    const stopTimer = () => {
        // Assuming useTimer hook provides a stop function if needed
    };
    
    return (
        <div className="flex flex-col items-center">
            <div className="mb-2 text-black">
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
                className="mt-4 px-4 py-2 bg-gray-400 text-black border border-gray-600 rounded cursor-pointer disabled:opacity-50"
                disabled={gameOver}
            >
                Restart
            </button>
        </div>
    );
};

export default Board;