import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Cpu, Play } from 'lucide-react';

const ModalsContainer = ({ gameState, soundEnabled }) => {
    const { gameMode, isGameOver, winner, resetGame, newGame, selectMode } = gameState;

    return (
        <AnimatePresence>
            {/* Mode Selection Modal */}
            {!gameMode && (
                <ModalWrapper>
                    <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl space-y-8 max-w-sm w-full mx-4 border-2 border-dashed border-gray-300 dark:border-gray-700">
                        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Pick A Mode</h2>
                        <div className="space-y-4 flex flex-col items-center">
                            <button
                                className="w-full flex items-center justify-between p-4 rounded-xl font-bold bg-blue-100 text-blue-900 hover:bg-blue-200 transition-colors group"
                                onClick={() => selectMode('PvP')}
                            >
                                <div className="flex items-center gap-4"><Users /> <span className="text-lg">Player vs Player</span></div>
                                <Play className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button
                                className="w-full flex items-center justify-between p-4 rounded-xl font-bold bg-purple-100 text-purple-900 hover:bg-purple-200 transition-colors group"
                                onClick={() => selectMode('PvAI')}
                            >
                                <div className="flex items-center gap-4"><Cpu /> <span className="text-lg">Player vs AI</span></div>
                                <Play className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>

                        <LeaderboardPanel />
                    </div>
                </ModalWrapper>
            )}

            {/* Winner Announcement Modal */}
            {isGameOver && (
                <ModalWrapper>
                    <div className="text-center p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] border  border-gray-100 dark:border-gray-800 max-w-sm w-full mx-4 relative overflow-hidden">

                        {/* Background decorative glow */}
                        <div className={`absolute top-0 right-0 left-0 h-32 blur-3xl rounded-full opacity-30 -translate-y-1/2 ${winner === 1 ? 'bg-disc-red' : winner === 2 ? 'bg-disc-yellow' : 'bg-gray-500'}`}></div>

                        <Trophy className={`mx-auto mb-6 w-20 h-20 ${winner === 1 ? 'text-disc-red' : winner === 2 ? 'text-disc-yellow' : 'text-gray-400'}`} />

                        <h2 className="text-4xl font-black mb-2 dark:text-white">
                            {winner === 'draw' ? "It's a Draw!" : winner === 1 ? 'Player 1 Wins!' : gameMode === 'PvP' ? 'Player 2 Wins!' : 'AI Wins!'}
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[200px] mx-auto text-lg">
                            {winner === 'draw' ? 'No more moves left.' : 'Flawless victory.'}
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={resetGame}
                                className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-lg"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={newGame}
                                className="w-full py-4 rounded-xl font-bold text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                Main Menu
                            </button>
                        </div>
                    </div>
                </ModalWrapper>
            )}
        </AnimatePresence>
    );
};

const ModalWrapper = ({ children }) => (
    <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
        >
            {children}
        </motion.div>
    </motion.div>
);

const LeaderboardPanel = () => {
    const [stats, setStats] = useState(() => {
        const statsJSON = localStorage.getItem('connect4Stats');
        return statsJSON ? JSON.parse(statsJSON) : { p1Wins: 0, p2Wins: 0, gamesPlayed: 0 };
    });

    if (stats.gamesPlayed === 0) return null;

    const resetStats = () => {
        localStorage.removeItem('connect4Stats');
        setStats({ p1Wins: 0, p2Wins: 0, gamesPlayed: 0 });
    };

    return (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 relative">
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-4">Local Leaderboard</h3>
            <button
                onClick={resetStats}
                className="absolute top-6 right-0 text-[10px] text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md transition-colors"
                title="Reset Leaderboard"
            >
                RESET
            </button>
            <div className="flex justify-between items-center px-4">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-disc-red font-black text-2xl">{stats.p1Wins}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase">P1 Wins</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-50">
                    <span className="text-xl font-black">{stats.gamesPlayed}</span>
                    <span className="text-xs font-bold uppercase">Games</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-disc-yellow font-black text-2xl">{stats.p2Wins}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase">P2 Wins</span>
                </div>
            </div>
        </div>
    );
};

export default ModalsContainer;
