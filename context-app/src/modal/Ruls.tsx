import React from "react";
import { Paper, IconButton, Typography } from "@mui/material";
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
                padding: 3,
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // центр по вертикали и горизонтали
                width: "95%",
                maxWidth: "520px",
                textAlign: "left",
                backgroundColor: "#7bee43",
                color: "#222",
                borderRadius: 2,
                fontFamily: "Roboto, sans-serif",
                zIndex: 1000,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
            }}
        >
            {/* Красный крестик слева сверху */}
            <IconButton
                onClick={() => setAnswerStatus("none")}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color: "red",
                }}
            >
                <CloseIcon />
            </IconButton>

            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: "#005500",
                }}
            >
                {typeSentence} предложение в {time} Simple строиться так:
            </Typography>

            {/* Секция правил */}
            <div>
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
            </div>
        </Paper>
    );
};
