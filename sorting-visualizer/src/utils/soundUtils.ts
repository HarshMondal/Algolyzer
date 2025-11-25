// Sound utility for sorting visualization
// Uses Web Audio API to generate tones

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = null; // Will be initialized on first use
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: 'sine' | 'square' = 'sine') {
    if (!this.enabled) return;

    try {
      const audioContext = this.getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio is not available
      console.debug('Audio not available:', error);
    }
  }

  playComparisonSound() {
    // Higher pitch for comparison
    this.playTone(440, 0.05, 'sine');
  }

  playSwapSound() {
    // Lower pitch for swap
    this.playTone(220, 0.1, 'square');
  }

  playCompleteSound() {
    // Success chord
    const frequencies = [523.25, 659.25, 783.99]; // C major chord
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'sine');
      }, index * 50);
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();

