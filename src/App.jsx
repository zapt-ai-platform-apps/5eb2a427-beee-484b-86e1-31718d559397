import React from 'react';
import Minesweeper from './components/Minesweeper';

export default function App(){
    return (
        <div className="min-h-screen h-full flex items-center justify-center bg-gray-200">
            <Minesweeper />
        </div>
    )
}