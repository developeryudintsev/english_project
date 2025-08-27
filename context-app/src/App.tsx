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
    const toggleTheory = (theory:boolean) => {
        setThorium(theory);
    };
    const getTheoryComponent = (toggleTheory: (theory:boolean) => void) => {
        switch (time) {
            case 'Present':
                return <PresentSimple thorium={thorium} toggleTheory={toggleTheory} />;
            case 'Past':
                return <PastSimple thorium={thorium} toggleTheory={toggleTheory}/>;
            case 'Future':
                return <FutureSimple thorium={thorium} toggleTheory={toggleTheory}/>;
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
// 1.сделать меньше v0.7-сделано
// 2.поудолять лишние видео-сделано
// 3.выровнять надписи по иконке в теории-сделано
// 4.добавть вопросы по словорю с say до bring-сделано