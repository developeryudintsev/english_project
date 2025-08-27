import {ThoriumComponent} from "./ThoriumComponent";
import {Box} from '@mui/material';
import React from "react";

type PropsType={
    time:"Present" | "Future"|"Past",
    thorium:boolean,
    toggleTheory:(theory:boolean) => void;
    getTheoryComponent: (toggleTheory:(theory:boolean) => void) => React.ReactNode;
}

export const Body = (props:PropsType) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                {/*<AdvertisingComponent />*/}
                <ThoriumComponent
                    getTheoryComponent={props.getTheoryComponent}
                    thorium={props.thorium}
                    toggleTheory={props.toggleTheory}
                    time={props.time}
                />
            </Box>
        </>
    );
};
