(() => {
    function onEnd() {
        if (controlBtn.classList.contains('record')) {
            recognition.start();
        }
    }
    function onResult(e) {
        const result = e.results[0][0].transcript;
        output.value += " " + result;
    }
    function onVoicesChanged() {
        const voices = this.getVoices();
        voices.forEach((voice, index) => {
            const voiceOption = document.createElement('option');
            voiceOption.innerHTML = voice.name;
            voiceOption.value = voice.lang;
            voiceOption.setAttribute('data-index', index);
            voiceSelect.appendChild(voiceOption); 
        });
        // set default value
        const defaultVoice = voices.find(voice => voice.lang === 'en-US');
        if (defaultVoice) {
            voiceSelect.value = defaultVoice.lang;
        }
    }
    function playPause() {
        if (this.classList.contains('record')) {
            // pause
            recognition.stop();
            this.classList.remove('record');
            this.classList.add('pause');
        } else {
            // record
            // setup speechRecognition
            recognition.lang = voiceSelect.value;
            // start()
            recognition.start();
            this.classList.remove('pause');
            this.classList.add('record');
        }
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const output = document.querySelector('#output');
    const voiceSelect = document.querySelector('#voice-select');
    const controlBtn = document.querySelector('div.control');
    async function App() {
        // control button
        controlBtn.addEventListener('click', playPause);
        // get all supported voices
        onVoicesChanged.bind(speechSynthesis)();
        speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
        // listening to event
        recognition.onresult = onResult;
        recognition.onend = onEnd;
        // error handling
        recognition.onerror = function(event) {
            alert('Speech recognition error detected: ' + event.error);
            if (event.message) {
                alert('Additional information: ' + event.message);
            }
        }
    }
    App();
})();