import { useCallback } from 'react';
// A completely fake simple implementation of useSound to avoid the dependency missing audio assets issue, or we can use empty urls.
// For the sake of UI we don't have local sound files, so we'll just mock it or play tiny base64 sounds.
// Actually, let's use tiny beep sounds with AudioContext.

export function useSoundEffects(enabled = true) {

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

    const playDrop = () => playTone(300, 'sine', 0.2);
    const playWin = () => {
        playTone(400, 'square', 0.2);
        setTimeout(() => playTone(500, 'square', 0.4), 200);
    };
    const playClick = () => playTone(600, 'triangle', 0.1);

    return {
        playDrop,
        playWin,
        playClick
    };
}
