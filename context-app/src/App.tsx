import {useState} from 'react';
import {Header} from './Header/Header';
import {PresentSimple} from './Present/PresentSimple';
import {PastSimple} from './Present/PasteSimple';
import {FutureSimple} from './Present/FutureSimple';
import {Body} from "./body/Body";
import {PracticeComponent} from "./body/smallCamponents/PracticeCamponent";
import { Box } from '@mui/material';

export type timeType = 'Present' | 'Past' | 'Future';

export const App = () => {
    const [time, setTime] = useState<timeType>('Present');
    const [thorium, setThorium] = useState(false);
    const [toggleVideo, setToggleVideo] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [showPractice, setShowPractice] = useState(false);

    const handleChange = (eValue: timeType) => {
        setTime(eValue);
        setThorium(false);
    };

    const toggleTheory = (theory: boolean) => setThorium(theory);
    const toggleTheoryPV = (toggle: boolean) => setToggleVideo(toggle);

    const getTheoryComponent = (toggleTheory: (theory: boolean) => void) => {
        switch (time) {
            case 'Present':
                return <PresentSimple thorium={thorium} toggleTheory={toggleTheory} />;
            case 'Past':
                return <PastSimple thorium={thorium} toggleTheory={toggleTheory} />;
            case 'Future':
                return <FutureSimple thorium={thorium} toggleTheory={toggleTheory} />;
            default:
                return null;
        }
    };
    console.log(showPractice)
    return (
        <>
            {showPractice==false ? (
                <Header time={time} setTime={setTime} handleChange={handleChange} />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        minHeight: '10vh',
                        padding: 2,
                        gap: "10px",
                        overflowX: 'hidden',
                        boxSizing: 'border-box',
                        maxWidth: '100vw',
                    }}
                >
                <PracticeComponent
                    open={true}
                    show={true}
                    time={time}
                    toggle={toggleVideo}
                    openTheory={toggleTheory}
                    toggleTheory={toggleTheoryPV}
                    setShowPractice={setShowPractice}
                />
                </Box>
            )}

            <Body
                time={time}
                thorium={thorium}
                toggleTheory={toggleTheory}
                getTheoryComponent={getTheoryComponent}
                toggleVideo={toggleVideo}
                setToggleVideo={setToggleVideo}
                firstClick={firstClick}
                setFirstClick={setFirstClick}
                setShowPracticeFoo={() => setShowPractice(!showPractice)}
                showPractice={showPractice}
            />
        </>
    );
};
