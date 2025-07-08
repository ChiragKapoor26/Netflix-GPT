export const SpeakText = (text) => {
  if ('speechSynthesis' in window) {
    // Stop any currently speaking voice
    window.speechSynthesis.cancel();

    const message = Array.isArray(text) ? text.join(", ") : text;
    const utterance = new SpeechSynthesisUtterance(message);

    // Set up speech parameters
    utterance.lang = 'hi-IN';
    utterance.rate = 1;
    utterance.pitch = 1.1; // Slightly sweeter tone
    utterance.volume = 1;

    const setHindiVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      // Find a Hindi voice
      const hindiVoice = voices.find(voice => voice.lang === 'hi-N');

      if (hindiVoice) {
        utterance.voice = hindiVoice;
      } else {
        console.warn("Hindi voice not found, using default.");
      }

      // Speak the message
      window.speechSynthesis.speak(utterance);
    };

    // Voices may not be available immediately
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setHindiVoice;
    } else {
      setHindiVoice();
    }

  } else {
    console.warn("Speech Synthesis not supported in this browser.");
  }
};
