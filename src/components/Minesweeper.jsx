import React from 'react';
import Board from './Board';

const Minesweeper = () => {
    return (
        <div className="flex flex-col items-center p-2 border border-gray-500 bg-gray-300 shadow-inner">
            <div className="w-full mb-2">
                <div className="flex items-center justify-between bg-blue-700 text-white p-2">
                    <span className="font-bold">Minesweeper</span>
                    <div className="flex space-x-2">
                        <button className="w-4 h-4 bg-red-600 border border-gray-500 cursor-pointer"></button>
                        <button className="w-4 h-4 bg-yellow-400 border border-gray-500 cursor-pointer"></button>
                        <button className="w-4 h-4 bg-green-600 border border-gray-500 cursor-pointer"></button>
                    </div>
                </div>
            </div>
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