import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import ModalsContainer from './components/ModalsContainer';
import GameControls from './components/GameControls';
import { useGameLogic } from './hooks/useGameLogic';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playClick, playDrop } = useSoundEffects(soundEnabled);

  const game = useGameLogic();

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark', 'bg-[#0f172a]', 'text-white');
      document.body.classList.remove('bg-gray-100', 'text-gray-900');
    } else {
      document.body.classList.add('bg-gray-100', 'text-gray-900');
      document.body.classList.remove('dark', 'bg-[#0f172a]', 'text-white');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    playClick();
    setDarkMode(!darkMode);
  };

  const toggleSound = () => {
    playClick();
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className={`min-h-full w-full flex flex-col items-center justify-center p-2 sm:p-4 lg:py-8 transition-colors duration-500 overflow-hidden lg:overflow-auto`}>
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-disc-red to-disc-yellow drop-shadow-lg mb-2">
          Connect Four
        </h1>
      </header>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
        <div className="flex flex-col items-center gap-6">
          <ScoreBoard
            scores={game.scores}
            currentPlayer={game.currentPlayer}
            gameMode={game.gameMode}
          />
          <GameBoard
            board={game.board}
            dropDisc={(col) => { game.dropDisc(col); playDrop(); }}
            winningCells={game.winningCells}
            currentPlayer={game.currentPlayer}
            gameOver={game.isGameOver}
          />
          <GameControls
            onRestart={game.resetGame}
            onNewGame={game.newGame}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            soundEnabled={soundEnabled}
            toggleSound={toggleSound}
          />
        </div>
      </div>

      <ModalsContainer
        gameState={game}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}

export default App;
