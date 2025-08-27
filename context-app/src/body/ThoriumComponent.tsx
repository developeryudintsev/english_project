import { VideoComponent } from "./smallCamponents/VideoCamponent";
import { TheoryComponent } from "./smallCamponents/TheoryCamponent";
import { PracticeComponent } from "./smallCamponents/PracticeCamponent";
import { Box } from "@mui/material";
import React from "react";

type PropsType = {
    time: "Present" | "Future" | "Past";
    thorium: boolean;
    toggleTheory: (theory: boolean) => void;
    getTheoryComponent: (toggleTheory: (theory: boolean) => void) => React.ReactNode;
    toggleVideo: boolean;
    setToggleVideo: (toggleVideo: boolean) => void;
    firstClick: boolean;
    setFirstClick: (firstClick: boolean) => void;
    setShowPracticeFoo: () => void;
    showPractice: boolean;
};

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
                gap: "20px",
            }}
        >
            <TheoryComponent
                getTheoryComponent={props.getTheoryComponent}
                thorium={props.thorium}
                toggleTheory={props.toggleTheory}
                time={props.time}
            />

            <VideoComponent
                firstClick={props.firstClick}
                setFirstClick={props.setFirstClick}
                open={false}
                show={false}
                setShowPractice={props.setShowPracticeFoo}
            />

            {!props.showPractice && (
                <PracticeComponent
                    open={false}
                    show={false}
                    time={props.time}
                    toggle={props.toggleVideo}
                    openTheory={props.toggleTheory}
                    toggleTheory={props.setToggleVideo}
                    setShowPractice={props.setShowPracticeFoo}
                />
            )}
        </Box>
    );
};
