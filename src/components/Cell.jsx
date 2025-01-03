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

    const getCellStyle = () => {
        if (cell.revealed) {
            return 'bg-gray-300 border-gray-600 text-black';
        } else {
            return 'bg-gray-200 border-gray-600';
        }
    };

    return (
        <div 
            className={`w-8 h-8 border border-gray-600 flex items-center justify-center text-sm box-border cursor-pointer 
                ${getCellStyle()}
                hover:bg-gray-400
            `}
            onClick={() => onClick(cell.x, cell.y)}
            onContextMenu={(e) => onRightClick(e, cell.x, cell.y)}
        >
            {content}
        </div>
    );
};

export default Cell;