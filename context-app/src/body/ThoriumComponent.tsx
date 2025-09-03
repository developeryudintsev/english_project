import {VideoComponent} from "./smallCamponents/VideoCamponent";
import {TheoryComponent} from "./smallCamponents/TheoryCamponent";
import {PracticeComponent} from "./smallCamponents/PracticeCamponent";
import {Box} from "@mui/material";
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
    toggleVC: boolean,
    setToggleVC: (toggleVC: boolean) => void
    setShowPractice: (showPractice: boolean) => void
    setStar:(star:number)=>void
    star:number
};

export const ThoriumComponent = (props: PropsType) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '94%',
                minHeight: '10vh',
                padding: 0,
                margin: 0,
                gap: "20px",
                boxSizing: 'border-box',
            }}
        >
            <TheoryComponent
                getTheoryComponent={props.getTheoryComponent}
                thorium={props.thorium}
                toggleTheory={props.toggleTheory}
                time={props.time}
            />

            <VideoComponent
                toggle={props.toggleVC}
                setToggle={props.setToggleVC}
                setShowPractice={props.setShowPractice}
                openTheory={props.toggleTheory}
                setToggleVideo={props.setToggleVideo}
            />

            {!props.showPractice && (
                <PracticeComponent
                    time={props.time}
                    toggle={props.toggleVideo}
                    openTheory={props.toggleTheory}
                    toggleTheory={props.setToggleVideo}
                    setToggleVC={props.setToggleVC}
                    setShowPractice={props.setShowPracticeFoo}
                    showPractice={props.showPractice}
                    setStar={props.setStar}
                    star={props.star}
                />
            )}
        </Box>
    );
};
