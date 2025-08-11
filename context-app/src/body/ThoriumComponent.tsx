import {VideoComponent} from "./smallCamponents/VideoCamponent";
import {TheoryComponent} from "./smallCamponents/TheoryCamponent";
import {Box} from "@mui/material";
import {PracticeComponent} from "./smallCamponents/PracticeCamponent";
import {useState} from "react";

type PropsType = {
    time: "Present" | "Future"|"Past",
    thorium: boolean,
    toggleTheory: () => void,
    getTheoryComponent: () => React.ReactNode
}
export const ThoriumComponent = (props: PropsType) => {
    const [toggleVideo, setToggleVideo] = useState(false);
    const toggleTheory = (toggle:boolean) => setToggleVideo(toggle);
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
            }}
        >
            <TheoryComponent
                getTheoryComponent={props.getTheoryComponent}
                thorium={props.thorium}
                toggleTheory={props.toggleTheory}
                time={props.time}
            />
            <VideoComponent togglePractice={toggleVideo} toggleTheory={toggleTheory}/>
            <PracticeComponent time={props.time} toggle={toggleVideo} toggleTheory={toggleTheory}/>
        </Box>
    );
};
