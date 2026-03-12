import React from 'react';
import Disc from './Disc';

const Column = ({ colIndex, colData, dropDisc, winningCells, currentPlayer, gameOver }) => {
    const isWinningDisc = (rIdx) => {
        return winningCells.some(([c, r]) => c === colIndex && r === rIdx);
    };

    const handleMouseEnter = (e) => {
        if (gameOver) return;
        const hoverColor = currentPlayer === 1 ? 'rgba(255, 69, 96, 0.2)' : 'rgba(255, 208, 40, 0.2)';
        e.currentTarget.style.backgroundColor = hoverColor;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
    };

    return (
        <button
            className="flex flex-col-reverse gap-2 md:gap-3 lg:gap-4 cursor-pointer transition-colors duration-200 rounded-full p-1 lg:p-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            onClick={dropDisc}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            aria-label={`Drop disc in column ${colIndex + 1}`}
            disabled={gameOver}
        >
            {/* Using index as key is fine as array length doesn't change */}
            {colData.map((discValue, rowIndex) => (
                <Disc
                    key={rowIndex}
                    player={discValue}
                    isWinning={isWinningDisc(rowIndex)}
                />
            ))}
        </button>
    );
};

export default Column;
