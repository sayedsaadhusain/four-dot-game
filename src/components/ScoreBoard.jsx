import React from 'react';
import { User, Cpu } from 'lucide-react';

const ScoreBoard = ({ scores, currentPlayer, gameMode }) => {
    return (
        <div
            className="flex w-full max-w-md justify-between items-center gap-4 bg-white/10 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 dark:border-white/10"
            role="status"
            aria-live="polite"
        >
            <span className="sr-only">
                {currentPlayer === 1 ? 'Player 1\'s turn' : gameMode === 'PvP' ? 'Player 2\'s turn' : 'AI\'s turn'}
            </span>

            <div
                className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${currentPlayer === 1 ? 'bg-disc-red text-white scale-105 shadow-glow-red' : 'bg-white/50 dark:bg-black/50 opacity-70'}`}
                aria-label={`Player 1 score is ${scores.p1}`}
            >
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm" aria-hidden="true">
                    <User size={18} /> P1
                </div>
                <div className="text-3xl font-black mt-1" aria-hidden="true">{scores.p1}</div>
            </div>

            <div className="text-xl font-bold opacity-50 px-2 lg:text-3xl">VS</div>

            <div
                className={`flex-1 flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${currentPlayer === 2 ? 'bg-disc-yellow text-black scale-105 shadow-glow-yellow' : 'bg-white/50 dark:bg-black/50 opacity-70'}`}
                aria-label={`${gameMode === 'PvP' ? 'Player 2' : 'AI'} score is ${scores.p2}`}
            >
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm text-gray-800 dark:text-gray-200" aria-hidden="true">
                    {gameMode === 'PvP' ? <User size={18} /> : <Cpu size={18} />}
                    {gameMode === 'PvP' ? 'P2' : 'AI'}
                </div>
                <div className="text-3xl font-black mt-1 text-gray-900 dark:text-white" aria-hidden="true">{scores.p2}</div>
            </div>

        </div>
    );
};

export default ScoreBoard;
