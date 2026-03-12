import React from 'react';
import Column from './Column';

const GameBoard = ({ board, dropDisc, winningCells, currentPlayer, gameOver }) => {
    return (
        <div
            className="relative p-3 md:p-5 lg:p-6 bg-board-blue rounded-3xl lg:rounded-[2rem] shadow-glow-board border-4 md:border-6 lg:border-8 border-[#1b3cb3] max-w-full overflow-hidden"
            role="region"
            aria-label="Connect Four Game Board"
        >
            <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center">
                {board.map((col, colIndex) => (
                    <Column
                        key={colIndex}
                        colIndex={colIndex}
                        colData={col}
                        dropDisc={() => dropDisc(colIndex)}
                        winningCells={winningCells}
                        currentPlayer={currentPlayer}
                        gameOver={gameOver}
                    />
                ))}
            </div>
            {/* Decorative base block */}
            <div className="absolute -bottom-6 md:-bottom-8 lg:-bottom-10 left-1/2 -translate-x-1/2 w-[110%] h-8 md:h-12 lg:h-16 bg-[#1b3cb3] rounded-[50%] -z-10 blur-sm md:blur-md lg:blur-lg brightness-50"></div>
        </div>
    );
};

export default GameBoard;
