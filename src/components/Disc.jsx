import React from 'react';
import { motion } from 'framer-motion';

const Disc = ({ player, isWinning }) => {
    const getDiscColor = () => {
        if (player === 1) return 'bg-disc-red shadow-[inset_0_-4px_rgba(0,0,0,0.3)] shadow-glow-red';
        if (player === 2) return 'bg-disc-yellow shadow-[inset_0_-4px_rgba(0,0,0,0.3)] shadow-glow-yellow';
        return 'bg-slot-dark shadow-[inset_0_4px_rgba(0,0,0,0.5)]'; // Empty slot
    };

    return (
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden relative bg-blue-900 border-2 border-blue-950/30 flex items-center justify-center p-0.5">
            {/* The empty hole background */}
            <div className={`w-full h-full rounded-full transition-all duration-300 ${player === 0 ? getDiscColor() : 'bg-transparent'}`}></div>

            {/* The dropped disc */}
            {player !== 0 && (
                <motion.div
                    className={`absolute inset-0 rounded-full m-[1px] ${getDiscColor()} ${isWinning ? 'animate-pulse ring-4 ring-white z-10' : ''}`}
                    initial={{ y: -500, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                />
            )}
        </div>
    );
};

export default Disc;
