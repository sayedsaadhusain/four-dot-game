import React from 'react';
import Column from './Column';

const GameBoard = ({ board, dropDisc, winningCells, currentPlayer, gameOver }) => {
    return (
        <div className="relative p-3 bg-board-blue rounded-3xl shadow-glow-board border-4 border-[#1b3cb3]">
            <div className="flex gap-2">
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
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] h-8 bg-[#1b3cb3] rounded-[50%] -z-10 blur-sm brightness-50"></div>
        </div>
    );
};

export default GameBoard;
