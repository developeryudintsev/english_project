import {VideoComponent} from "./smallCamponents/VideoCamponent";
import {TheoryComponent} from "./smallCamponents/TheoryCamponent";
import {Box} from "@mui/material";
import {PracticeComponent} from "./smallCamponents/PracticeCamponent";

type PropsType = {
    time: string,
    thorium: boolean,
    toggleTheory: () => void,
    getTheoryComponent: () => React.ReactNode
}

export const ThoriumComponent = (props: PropsType) => {
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
            <VideoComponent />
            <PracticeComponent time={'present'}/>
        </Box>
    );
};
