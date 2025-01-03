import React from 'react';

const Cell = ({ cell, onClick, onRightClick }) => {
    let content = "";
    if(cell.revealed){
        if(cell.mine){
            content = "💣";
        } else if(cell.adjacent > 0){
            content = cell.adjacent;
        }
    } else if(cell.flagged){
        content = "🚩";
    }

    return (
        <div 
            className={`w-8 h-8 border border-gray-500 flex items-center justify-center text-sm
                ${cell.revealed ? 'bg-gray-300' : 'bg-gray-200'}
                cursor-pointer
            `}
            onClick={() => onClick(cell.x, cell.y)}
            onContextMenu={(e) => onRightClick(e, cell.x, cell.y)}
        >
            {content}
        </div>
    );
};

export default Cell;