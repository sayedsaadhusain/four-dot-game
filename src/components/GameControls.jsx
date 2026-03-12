import React from 'react';
import { RefreshCcw, LogOut, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

const GameControls = ({ onRestart, onNewGame, darkMode, toggleDarkMode, soundEnabled, toggleSound }) => {
    return (
        <div className="flex gap-4 p-4 glass rounded-2xl dark:glass-dark w-full justify-center mt-4">
            <button
                onClick={onRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-[#1b3cb3] text-white hover:bg-blue-600 transition-all shadow-glow-board hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            >
                <RefreshCcw size={20} aria-hidden="true" /> Restart
            </button>

            <button
                onClick={onNewGame}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-white text-gray-800 hover:bg-gray-100 transition-all shadow-md hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
            >
                <LogOut size={20} aria-hidden="true" /> Exit
            </button>

            <button
                onClick={toggleSound}
                className="p-3 rounded-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white transition-all shadow-md hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                title="Toggle Sound"
                aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            >
                {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <button
                onClick={toggleDarkMode}
                className="p-3 rounded-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white transition-all shadow-md hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                title="Toggle Dark Mode"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
        </div>
    );
};

export default GameControls;
