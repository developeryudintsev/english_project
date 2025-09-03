import React from "react";
import { Paper, Box } from "@mui/material";

type ModalProps = {
    children: React.ReactNode;
    open: boolean; // 👉 чтобы можно было управлять показом
    onClose?: () => void;
};

export const ModalCamponent: React.FC<ModalProps> = ({ children, open, onClose }) => {
    if (!open) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.6)", // 👉 тёмный прозрачный фон
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999, // фон под модалкой
            }}
            onClick={onClose} // закрытие по клику на фон
        >
            <Paper
                elevation={6}
                sx={{
                    position: "relative",
                    width: "95%",
                    maxWidth: "530px",
                    backgroundColor: "#FFF44F",
                    color: "#222",
                    borderRadius: 2,
                    fontFamily: "Roboto, sans-serif",
                    zIndex: 1000, // модалка поверх фона
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                }}
                onClick={(e) => e.stopPropagation()} // 👉 чтобы клик внутри не закрывал модалку
            >
                {children}
            </Paper>
        </Box>
    );
};
