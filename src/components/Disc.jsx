import React from 'react';
import { motion } from 'framer-motion';

const Disc = ({ player, isWinning }) => {
    const getDiscColor = () => {
        if (player === 1) return 'bg-disc-red';
        if (player === 2) return 'bg-disc-yellow';
        return 'bg-slot-dark shadow-[inset_0_4px_rgba(0,0,0,0.5)]';
    };

    return (
        <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-visible relative bg-blue-900 border-2 border-blue-950/30 flex items-center justify-center p-0.5">
            {/* The empty hole background */}
            <div className={`w-full h-full rounded-full transition-all duration-300 ${player === 0 ? getDiscColor() : 'bg-transparent'}`}></div>

            {/* The dropped disc */}
            {player !== 0 && (
                <motion.div
                    className={`absolute inset-0 rounded-full m-[1px] ${getDiscColor()}`}
                    initial={{ y: -500, opacity: 0 }}
                    animate={isWinning ? {
                        y: 0,
                        opacity: 1,
                        scale: [1, 1.2, 1],
                        boxShadow: player === 1
                            ? [
                                '0 0 0px rgba(255, 69, 96, 0.4)',
                                '0 0 30px rgba(255, 69, 96, 1), 0 0 60px rgba(255, 69, 96, 0.6)',
                                '0 0 0px rgba(255, 69, 96, 0.4)'
                            ]
                            : [
                                '0 0 0px rgba(255, 208, 40, 0.4)',
                                '0 0 30px rgba(255, 208, 40, 1), 0 0 60px rgba(255, 208, 40, 0.6)',
                                '0 0 0px rgba(255, 208, 40, 0.4)'
                            ]
                    } : { y: 0, opacity: 1 }}
                    transition={isWinning ? {
                        scale: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' },
                        boxShadow: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' },
                        y: { type: 'spring', bounce: 0.4, duration: 0.6 },
                        opacity: { duration: 0.3 }
                    } : {
                        type: "spring", bounce: 0.4, duration: 0.6
                    }}
                    style={{ zIndex: isWinning ? 20 : 1 }}
                />
            )}

            {/* Extra winning ring overlay */}
            {isWinning && player !== 0 && (
                <motion.div
                    className="absolute inset-[-4px] rounded-full border-4 border-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.1, 0.95] }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
                    style={{ zIndex: 21 }}
                />
            )}
        </div>
    );
};

export default Disc;
