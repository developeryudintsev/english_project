import React from "react";
import { Paper, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type changeType = "." | "?" | "!";
type TimeKey = "Present" | "Future" | "Past";

type RulsProps = {
    type: changeType;
    time: TimeKey;
    setAnswerStatus: (answerStatus: "none" | "correct" | "wrong") => void;
};

export const Ruls: React.FC<RulsProps> = ({ type, time, setAnswerStatus }) => {
    let typeSentence =
        type === "."
            ? "утвердительное"
            : type === "?"
                ? "вопросительное"
                : "отрицательное";

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
            {/* 🔹 Шапка */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#444447",
                    color: "#fff",
                    padding: "12px",
                    position: "relative",
                }}
            >
                {/* Крестик всегда сверху слева */}
                <IconButton
                    onClick={() => setAnswerStatus("none")}
                    sx={{
                        position: "absolute",
                        left: "8px",
                        top: "8px",
                        color: "red",
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Заголовок */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#00ff88",
                        width: "100%",
                        pl: 4, // чтобы текст не налезал на крестик
                        pr: 4,
                    }}
                >
                    {typeSentence} предложение в {time} Simple строиться так:
                </Typography>
            </Box>

            {/* 🔹 Контент */}
            <Box sx={{ padding: 3 }}>
                {time === "Present" && (
                    <div>
                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                            утвердительное (любить):
                        </Typography>
                        <Typography>I / You / We / They → глагол без изменений.</Typography>
                        <Typography>I love.</Typography>
                        <Typography>They love.</Typography>
                        <Typography>
                            He / She / It → глагол с <b>-s</b> на конце.
                        </Typography>
                        <Typography>He loves.</Typography>
                        <Typography>She loves.</Typography>

                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                            Отрицания (любить):
                        </Typography>
                        <Typography>I do not (don’t) love.</Typography>
                        <Typography>She does not (doesn’t) love.</Typography>

                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                            Вопросы (любить):
                        </Typography>
                        <Typography>Do you love?</Typography>
                        <Typography>Does she love?</Typography>
                    </div>
                )}
            </Box>
        </Paper>
    );
};
