import {ThoriumComponent} from "./ThoriumComponent";
import {Box} from '@mui/material';
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

export const Body = (props: PropsType) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', md: 'row'},
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 2,
                padding: 0,
                boxSizing: 'border-box',
            }}
        >
            <ThoriumComponent {...props} />
        </Box>
    );
};
