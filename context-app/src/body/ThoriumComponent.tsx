import {VideoComponent} from "./smallCamponents/VideoCamponent";
import {TheoryComponent} from "./smallCamponents/TheoryCamponent";
import {Box} from "@mui/material";
import {PracticeComponent} from "./smallCamponents/PracticeCamponent";
import {useState} from "react";

type PropsType = {
    time: "Present" | "Future"|"Past",
    thorium: boolean,
    toggleTheory: () => void,
    getTheoryComponent: (toggleTheory: () => void) => React.ReactNode
}
export const ThoriumComponent = (props: PropsType) => {
    const [toggleVideo, setToggleVideo] = useState(false);
    const toggleTheory = (toggle:boolean) => setToggleVideo(toggle);
    const [firstClick, setFirstClick] = useState<boolean>(false);
    const [showPractice, setShowPractice] = useState(true);
    let setShowPracticeFoo=()=>{
        setShowPractice(!showPractice)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                minHeight: '10vh',
                padding: 2,
                boxSizing: 'border-box',
                gap: "20px",
            }}
        >
            <TheoryComponent
                getTheoryComponent={props.getTheoryComponent}
                thorium={props.thorium}
                toggleTheory={props.toggleTheory}
                time={props.time}
            />
            {showPractice ? (
                <VideoComponent firstClick={firstClick} setFirstClick={setFirstClick} open={true} show={true} setShowPractice={setShowPracticeFoo} />
            ) : (
                <PracticeComponent firstClick={firstClick} setFirstClick={setFirstClick} open={true}  show={true} time={props.time} toggle={toggleVideo} toggleTheory={toggleTheory} setShowPractice={setShowPracticeFoo}/>
            )}
            {!showPractice ? (
                <VideoComponent firstClick={firstClick} setFirstClick={setFirstClick} open={false}  show={false} setShowPractice={setShowPracticeFoo}/>
            ) : (
                <PracticeComponent firstClick={firstClick} setFirstClick={setFirstClick} open={false} show={false} time={props.time} toggle={toggleVideo} toggleTheory={toggleTheory} setShowPractice={setShowPracticeFoo}/>
            )}

        </Box>
    );
};
