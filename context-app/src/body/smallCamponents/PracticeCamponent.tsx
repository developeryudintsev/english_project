import React, { useState } from "react";
import {
    Button,
    IconButton,
    Paper,
    Typography,
    Box,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { data } from "../../Data/Data";

type TimeKey = "past" | "present" | "future";

type PracticeComponentProps = {
    time: TimeKey;
    lessonKey?: string;
};

export const PracticeComponent: React.FC<PracticeComponentProps> = ({
                                                                        time,
                                                                        lessonKey = "lesson1",
                                                                    }) => {
    const [toggle, setToggle] = useState(false);
    const toggleTheory = () => setToggle((prev) => !prev);

    const questions = data.simple[time]?.[lessonKey] || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const currentQuestion = questions[currentIndex];
    const isFinished = currentIndex >= questions.length;

    const handleAnswer = (answerText: string) => {
        if (answerStatus !== "none") return;

        setSelectedAnswer(answerText);

        if (!currentQuestion) return;

        const correctAnswer = currentQuestion.answers.find((ans) => ans.isCorrect);

        if (correctAnswer && correctAnswer.text === answerText) {
            setAnswerStatus("correct");
        } else {
            setAnswerStatus("wrong");
        }
    };

    const handleNextQuestion = () => {
        setCurrentIndex((prev) => prev + 1);
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };

    if (!questions || questions.length === 0) {
        return (
            <Typography sx={{ textAlign: "center", mt: 2, color: "white" }}>
                Нет данных для отображения
            </Typography>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "center",
                backgroundColor: "#444447",
                transition: "all 0.3s ease",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 0,
                    position: "relative",
                }}
            >
                <Typography
                    sx={{
                        color: "#FFF44F",
                        fontFamily: "Roboto, sans-serif",
                        userSelect: "none",
                    }}
                >
                    {!toggle
                        ? `Практика – ${time} Simple (нажмите для просмотра)`
                        : !isFinished
                            ? `Вопрос ${currentIndex + 1} из ${questions.length}`
                            : "Поздравляем! Вы ответили на все вопросы."
                    }
                </Typography>

                <IconButton
                    onClick={toggleTheory}
                    sx={{
                        color: "#FFF44F",
                        position: "absolute",
                        right: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    size="small"
                    aria-label="toggle practice"
                >
                    <InfoOutlinedIcon />
                </IconButton>
            </Box>

            {toggle && !isFinished && currentQuestion && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6">
                            {currentIndex + 1}. {currentQuestion.question}
                        </Typography>
                        {answerStatus === "correct" && (
                            <CheckCircleIcon sx={{ color: "limegreen", fontSize: 28 }} />
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            maxWidth: 400,
                            margin: "0 auto",
                        }}
                    >
                        {currentQuestion.answers.map((ans) => {
                            const isSelected = selectedAnswer === ans.text;

                            let bgColor = "transparent";
                            if (answerStatus !== "none") {
                                if (ans.isCorrect) {
                                    bgColor = "limegreen";
                                } else if (isSelected && !ans.isCorrect && answerStatus === "wrong") {
                                    bgColor = "#ff6347";
                                }
                            }

                            return (
                                <Button
                                    key={ans.text}
                                    variant={isSelected ? "contained" : "outlined"}
                                    onClick={() => handleAnswer(ans.text)}
                                    disabled={answerStatus !== "none"}
                                    sx={{
                                        color: "white",
                                        borderColor: "#FFF44F",
                                        backgroundColor: bgColor,
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: bgColor === "transparent" ? "#555" : bgColor,
                                        },
                                    }}
                                >
                                    {ans.text}
                                </Button>
                            );
                        })}
                    </Box>

                    {(answerStatus === "correct" || answerStatus === "wrong") && (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: "#FFF44F", color: "black" }}
                            onClick={handleNextQuestion}
                        >
                            Следующий вопрос
                        </Button>
                    )}
                </>
            )}
        </Paper>
    );
};
