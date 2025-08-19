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
    const handleChange = (eValue: timeType) => {
        setTime(eValue);
        setThorium(false)
    };
    const toggleTheory = () => {
        setThorium(prev => !prev);
    };
    const getTheoryComponent = (toggleTheory: () => void) => {
        switch (time) {
            case 'Present':
                return <PresentSimple toggleTheory={toggleTheory} />;
            case 'Past':
                return <PastSimple toggleTheory={toggleTheory}/>;
            case 'Future':
                return <FutureSimple toggleTheory={toggleTheory}/>;
            default:
                return null;
        }
    };
    return (
        <>
            <Header time={time} setTime={setTime} handleChange={handleChange} />
            <Body
                getTheoryComponent={getTheoryComponent}
                thorium={thorium}
                toggleTheory={toggleTheory}
                time={time}
            />
        </>
    );
};
