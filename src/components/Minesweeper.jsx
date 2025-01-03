import React from 'react';
import Board from './Board';

const Minesweeper = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Minesweeper</h1>
            <Board />
            <div className="mt-4">
                <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline cursor-pointer">
                    Made on ZAPT
                </a>
            </div>
        </div>
    );
};

export default Minesweeper;