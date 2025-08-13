import { useEffect, useState } from "react";

export const ExperementFile = () => {
    const [ruVoice, setRuVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [enVoice, setEnVoice] = useState<SpeechSynthesisVoice | null>(null);
    "Microsoft Irina - Russian (Russia) (ru-RU)"
    "Microsoft Mark - English (United States) (en-US)"
    "Microsoft Zira - English (United States) (en-US)"
    "Microsoft David - English (United States) (en-US)"
    "Microsoft Pavel - Russian (Russia) (ru-RU)"
    "Google US English (en-US)"
    "Google русский (ru-RU)"
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log("Доступные голоса:", voices.map(v => `${v.name} (${v.lang})`));

            // Ищем строго по имени или по частичному совпадению
            const russian = voices.find(v => v.name.includes("Pavel") || v.name.includes("Google русский"));
            const english = voices.find(v => v.name.includes("David") || v.name.includes("Google US English"));

            setRuVoice(russian || null);
            setEnVoice(english || null);
        };

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Иногда голоса уже загружены
        loadVoices();
    }, []);

    const speak = (text: string, voice: SpeechSynthesisVoice | null, fallbackLang: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            utterance.lang = fallbackLang;
        }
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => speak("Привет! Это тест русского голоса.", ruVoice, "ru-RU")}>
                Тест русского
            </button>
            <button onClick={() => speak("Hello! This is a test of the English voice.", enVoice, "en-US")}>
                Test English
            </button>
        </div>
    );
};
