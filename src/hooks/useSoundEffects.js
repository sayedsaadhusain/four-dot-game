import { useCallback, useRef } from 'react';
import dropSfx from '../assets/mixkit-small-wood-plank-pile-drop-3141.wav';

export function useSoundEffects(enabled = true) {
    const dropAudioRef = useRef(null);

    const playTone = useCallback((freq, type = 'sine', duration = 0.1) => {
        if (!enabled) return;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) { }
    }, [enabled]);

    const playDrop = useCallback(() => {
        if (!enabled) return;
        try {
            // Reuse or create audio element
            if (!dropAudioRef.current) {
                dropAudioRef.current = new Audio(dropSfx);
            }
            const audio = dropAudioRef.current;
            audio.currentTime = 0;
            audio.volume = 0.5;
            audio.play().catch(() => { });
        } catch (e) { }
    }, [enabled]);

    const playWin = useCallback(() => {
        playTone(400, 'square', 0.2);
        setTimeout(() => playTone(500, 'square', 0.4), 200);
    }, [playTone]);

    const playClick = useCallback(() => playTone(600, 'triangle', 0.1), [playTone]);

    return {
        playDrop,
        playWin,
        playClick
    };
}
