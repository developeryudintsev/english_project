import {useState} from 'react';
import {Header} from './Header/Header';
import {PresentSimple} from './Present/PresentSimple';
import {PastSimple} from './Present/PasteSimple';
import {FutureSimple} from './Present/FutureSimple';
import {Body} from "./body/Body";

export type timeType='Present'|"Past"|"Future";
export const App = () => {
    const [time, setTime] = useState<timeType>('Present');
    const [thorium, setThorium] = useState(false);
    console.log(time)
    const handleChange = (eValue: timeType) => {
        setTime(eValue);
        setThorium(false)
    };
    const toggleTheory = () => {
        setThorium(prev => !prev);
    };
    const getTheoryComponent = () => {
        switch (time) {
            case 'Present':
                return <PresentSimple />;
            case 'Past':
                return <PastSimple />;
            case 'Future':
                return <FutureSimple />;
            default:
                return null;
        }
    };
    function testSpeech() {
        const utterance = new SpeechSynthesisUtterance("Hello, this is a test.");
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
    }
    return (
        <>
            <Header time={time} setTime={setTime} handleChange={handleChange} />
            <Body
                getTheoryComponent={getTheoryComponent}
                thorium={thorium}
                toggleTheory={toggleTheory}
                time={time}
            />
            <button onClick={()=>testSpeech()}>ccc</button>
        </>
    );
};
