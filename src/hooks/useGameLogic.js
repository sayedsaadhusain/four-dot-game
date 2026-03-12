import { useState, useEffect, useCallback } from 'react';

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const P1 = 1;
const P2 = 2; // Can be human or AI

export function useGameLogic() {
    const [board, setBoard] = useState(getEmptyBoard());
    const [currentPlayer, setCurrentPlayer] = useState(P1);
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState(null); // null, P1, P2, 'draw'
    const [winningCells, setWinningCells] = useState([]);
    const [gameMode, setGameMode] = useState(null); // 'PvP' or 'PvAI'
    const [scores, setScores] = useState({ p1: 0, p2: 0 });

    function getEmptyBoard() {
        return Array.from({ length: COLS }, () => Array(ROWS).fill(EMPTY));
    }

    const resetGame = useCallback(() => {
        setBoard(getEmptyBoard());
        setCurrentPlayer(P1);
        setIsGameOver(false);
        setWinner(null);
        setWinningCells([]);
    }, []);

    const newGame = () => {
        resetGame();
        setGameMode(null);
    };

    const selectMode = (mode) => {
        setGameMode(mode);
        resetGame();
    };

    const checkWin = useCallback((currentBoard) => {
        // Check horizontal
        for (let c = 0; c <= COLS - 4; c++) {
            for (let r = 0; r < ROWS; r++) {
                if (currentBoard[c][r] !== EMPTY &&
                    currentBoard[c][r] === currentBoard[c + 1][r] &&
                    currentBoard[c][r] === currentBoard[c + 2][r] &&
                    currentBoard[c][r] === currentBoard[c + 3][r]) {
                    return { winner: currentBoard[c][r], cells: [[c, r], [c + 1, r], [c + 2, r], [c + 3, r]] };
                }
            }
        }
        // Check vertical
        for (let c = 0; c < COLS; c++) {
            for (let r = 0; r <= ROWS - 4; r++) {
                if (currentBoard[c][r] !== EMPTY &&
                    currentBoard[c][r] === currentBoard[c][r + 1] &&
                    currentBoard[c][r] === currentBoard[c][r + 2] &&
                    currentBoard[c][r] === currentBoard[c][r + 3]) {
                    return { winner: currentBoard[c][r], cells: [[c, r], [c, r + 1], [c, r + 2], [c, r + 3]] };
                }
            }
        }
        // Check diagonal right
        for (let c = 0; c <= COLS - 4; c++) {
            for (let r = 0; r <= ROWS - 4; r++) {
                if (currentBoard[c][r] !== EMPTY &&
                    currentBoard[c][r] === currentBoard[c + 1][r + 1] &&
                    currentBoard[c][r] === currentBoard[c + 2][r + 2] &&
                    currentBoard[c][r] === currentBoard[c + 3][r + 3]) {
                    return { winner: currentBoard[c][r], cells: [[c, r], [c + 1, r + 1], [c + 2, r + 2], [c + 3, r + 3]] };
                }
            }
        }
        // Check diagonal left
        for (let c = 3; c < COLS; c++) {
            for (let r = 0; r <= ROWS - 4; r++) {
                if (currentBoard[c][r] !== EMPTY &&
                    currentBoard[c][r] === currentBoard[c - 1][r + 1] &&
                    currentBoard[c][r] === currentBoard[c - 2][r + 2] &&
                    currentBoard[c][r] === currentBoard[c - 3][r + 3]) {
                    return { winner: currentBoard[c][r], cells: [[c, r], [c - 1, r + 1], [c - 2, r + 2], [c - 3, r + 3]] };
                }
            }
        }
        // Check draw
        let isDraw = true;
        for (let c = 0; c < COLS; c++) {
            if (currentBoard[c][ROWS - 1] === EMPTY) isDraw = false;
        }
        if (isDraw) return { winner: 'draw', cells: [] };

        return null;
    }, []);

    const dropDisc = useCallback((colIndex) => {
        if (isGameOver || gameMode === null) return;
        if (board[colIndex][ROWS - 1] !== EMPTY) return; // Column full

        const newBoard = [...board];
        newBoard[colIndex] = [...newBoard[colIndex]];

        // Find empty slot
        let rowIndex = newBoard[colIndex].findIndex(val => val === EMPTY);
        if (rowIndex === -1) return; // Should not happen

        newBoard[colIndex][rowIndex] = currentPlayer;
        setBoard(newBoard);

        const winResult = checkWin(newBoard);
        if (winResult) {
            setIsGameOver(true);
            setWinner(winResult.winner);
            setWinningCells(winResult.cells);
            if (winResult.winner === P1) setScores(s => ({ ...s, p1: s.p1 + 1 }));
            if (winResult.winner === P2) setScores(s => ({ ...s, p2: s.p2 + 1 }));
            // Save stats
            updateStats(winResult.winner, gameMode);
        } else {
            setCurrentPlayer(currentPlayer === P1 ? P2 : P1);
        }
    }, [board, currentPlayer, isGameOver, gameMode, checkWin]);

    const updateStats = (v, gMode) => {
        if (v === 'draw' || gMode !== 'PvP') return;
        const statsJSON = localStorage.getItem('connect4Stats');
        const stats = statsJSON ? JSON.parse(statsJSON) : { p1Wins: 0, p2Wins: 0, gamesPlayed: 0 };
        stats[v === P1 ? 'p1Wins' : 'p2Wins']++;
        stats.gamesPlayed++;
        localStorage.setItem('connect4Stats', JSON.stringify(stats));
    };

    // AI Logic
    useEffect(() => {
        if (gameMode === 'PvAI' && currentPlayer === P2 && !isGameOver) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, isGameOver, gameMode]);

    const makeAIMove = () => {
        // 1. Check if AI can win
        const blockMove = findWinningMove(board, P1);
        const winMove = findWinningMove(board, P2);

        if (winMove !== -1) {
            dropDisc(winMove);
        } else if (blockMove !== -1) {
            // 2. Block player's winning move
            dropDisc(blockMove);
        } else {
            // 3. Random valid move
            let validCols = [];
            for (let c = 0; c < COLS; c++) {
                if (board[c][ROWS - 1] === EMPTY) validCols.push(c);
            }
            if (validCols.length > 0) {
                const randCol = validCols[Math.floor(Math.random() * validCols.length)];
                dropDisc(randCol);
            }
        }
    };

    const findWinningMove = (currentBoard, player) => {
        for (let c = 0; c < COLS; c++) {
            if (currentBoard[c][ROWS - 1] !== EMPTY) continue;

            const newBoard = currentBoard.map(col => [...col]);
            let r = newBoard[c].findIndex(val => val === EMPTY);
            if (r !== -1) {
                newBoard[c][r] = player;
                const win = checkWin(newBoard);
                if (win && win.winner === player) return c;
            }
        }
        return -1;
    };

    return {
        board,
        currentPlayer,
        isGameOver,
        winner,
        winningCells,
        gameMode,
        scores,
        dropDisc,
        resetGame,
        newGame,
        selectMode
    };
}
