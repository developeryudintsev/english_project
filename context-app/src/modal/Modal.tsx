import React from "react";
import {Paper} from "@mui/material";

type ModalProps = {
    children: React.ReactNode
};
export const Modal: React.FC<ModalProps> = ({children }) => {

    return (
        <Paper
            elevation={6}
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "95%",
                maxWidth: "530px",
                backgroundColor: "#FFF44F",
                color: "#222",
                borderRadius: 2,
                fontFamily: "Roboto, sans-serif",
                zIndex: 1000,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
                overflow: "hidden",
            }}
        >
            {children}
        </Paper>
    );
};
