import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Typography,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { data } from "../../Data/Data";

type TimeKey = "Present" | "Future" | "Past";
export type changeType = "." | "?" | "!";

type PracticeComponentProps = {
    firstClick: boolean;
    setFirstClick: (firstClick: boolean) => void;
    time: TimeKey;
    toggle: boolean;
    open: boolean;
    toggleTheory: (togglePractice: boolean) => void;
    setShowPractice: () => void;
    show: boolean;
};

export const PracticeComponent: React.FC<PracticeComponentProps> = ({
                                                                        firstClick,
                                                                        setFirstClick,
                                                                        time,
                                                                        open,
                                                                        toggle = false,
                                                                        toggleTheory,
                                                                        setShowPractice,
                                                                        show,
                                                                    }) => {
    const [type, setType] = useState<changeType>(".");
    const [currentIndex, setCurrentIndex] = useState<Record<changeType, number>>({
        ".": 0,
        "?": 0,
        "!": 0,
    });

    const questions = data.simple[time][type];
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);

    const isFinished = currentIndex[type] >= questions.length;

    // --- загрузка голосов
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const ruMale = voices.find((v) => v.lang.startsWith("ru") && /male|man/i.test(v.name));
            const ruAny = voices.find((v) => v.lang.startsWith("ru"));
            const enMale = voices.find((v) => v.lang.startsWith("en") && /male|man/i.test(v.name));
            const enAny = voices.find((v) => v.lang.startsWith("en"));
            setRussianVoice(ruMale || ruAny || null);
            setEnglishVoice(enMale || enAny || null);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    const speakText = (text: string, lang: "ru" | "en") => {
        if (!text) return;
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === "ru" && russianVoice) {
            utterance.voice = russianVoice;
            utterance.lang = russianVoice.lang;
        } else if (lang === "en" && englishVoice) {
            utterance.voice = englishVoice;
            utterance.lang = englishVoice.lang;
        } else {
            utterance.lang = lang === "ru" ? "ru-RU" : "en-US";
        }
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    };

    // --- обработка ответа
    const handleAnswer = (answerText: string, id: string) => {
        if (questions.find((f) => f.id === id)) {
            questions.find((f) => (f.id === id ? (f.isDone = true) : false));
        }
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

    // --- следующий вопрос
    const handleNextQuestion = () => {
        const nextIndex = currentIndex[type] + 1;

        setCurrentIndex((prev) => ({
            ...prev,
            [type]: nextIndex,
        }));

        setAnswerStatus("none");
        setSelectedAnswer(null);

        if (questions[nextIndex]) {
            setCurrentQuestion(questions[nextIndex]);
        }
    };

    // --- эффекты
    useEffect(() => {
        if (firstClick === true && open) {
            toggleTheory(true);
        }
    }, [open, firstClick]);

    useEffect(() => {
        if (!show) {
            toggleTheory(false);
        }
    }, [show]);

    const gobackFoo = () => {
        if (show === true) {
            setShowPractice();
        }
        toggleTheory(false);
    };

    if (!questions || questions.length === 0) {
        return (
            <Typography sx={{ textAlign: "center", mt: 2, color: "white" }}>
                Нет данных для отображения
            </Typography>
        );
    }

    const ButtonFoo = (toggle: boolean) => {
        toggleTheory(!toggle);
        setFirstClick(false);
    };

    const wordFoo = (id: string) => {
        const found = questions.find((f) => f.id === id);
        if (found) {
            setCurrentQuestion(found);
            setCurrentIndex((prev) => ({
                ...prev,
                [type]: questions.indexOf(found),
            }));
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                position: "relative",
                width: "95%",
                maxWidth: "980px",
                textAlign: "center",
                backgroundColor: "#444447",
                transition: "all 1s ease",
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
                        cursor: "pointer",
                    }}
                >
                    {!toggle
                        ? <div onClick={() => ButtonFoo(toggle)}>Практика – {time} Simple</div>
                        : !isFinished
                            ? (
                                <div>
                                    <div onClick={() => ButtonFoo(toggle)}>
                                        Вопрос {currentIndex[type] + 1} из {questions.length}
                                    </div>
                                    <Box>
                                        <FormControl
                                            sx={{
                                                flexGrow: 1,
                                                minWidth: 160,
                                                marginLeft: "0px",
                                            }}
                                            size="small"
                                        >
                                            <Select
                                                value={type}
                                                onChange={(e) => {
                                                    const newType = e.target.value as changeType;
                                                    setType(newType);
                                                    setCurrentQuestion(
                                                        data.simple[time][newType][currentIndex[newType]]
                                                    );
                                                }}
                                                displayEmpty
                                                inputProps={{ "aria-label": "Select tense" }}
                                                sx={{
                                                    backgroundColor: "white",
                                                    borderRadius: 1,
                                                    width: "100%",
                                                    margin: 1,
                                                }}
                                            >
                                                <MenuItem value=".">утвердительное</MenuItem>
                                                <MenuItem value="?">вопросительное</MenuItem>
                                                <MenuItem value="!">отрицательное</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        {data.simple[time][type].map((m) => {
                                            return (
                                                <Button
                                                    key={m.id}
                                                    variant={m.isDone ? "contained" : "outlined"}
                                                    onClick={() => wordFoo(m.id)}
                                                    size="small"
                                                    sx={{
                                                        mt: 0.5,
                                                        backgroundColor: m.isDone ? "#FFF44F" : "none",
                                                        borderColor: "#FFF44F",
                                                        color: "black",
                                                        textTransform: "none",
                                                        width: "10%",
                                                    }}
                                                >
                                                    {m.word}
                                                </Button>
                                            );
                                        })}
                                    </Box>
                                </div>
                            )
                            : "Поздравляем! Вы ответили на все вопросы."}
                </Typography>

                <IconButton
                    onClick={() => ButtonFoo(toggle)}
                    sx={{
                        color: "#FFF44F",
                        position: "absolute",
                        right: -8,
                        top: "12px",
                        transform: "translateY(-50%)",
                    }}
                    size="small"
                    aria-label="Toggle practice info"
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
                            {currentIndex[type] + 1}. {currentQuestion.question}
                        </Typography>
                        <IconButton
                            onClick={() => speakText(currentQuestion.question, "ru")}
                            sx={{ color: "#FFF44F" }}
                            aria-label="Озвучить вопрос"
                        >
                            <VolumeUpIcon />
                        </IconButton>
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
                                } else if (
                                    isSelected &&
                                    !ans.isCorrect &&
                                    answerStatus === "wrong"
                                ) {
                                    bgColor = "#ff6347";
                                }
                            }
                            return (
                                <Box
                                    key={ans.text}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        variant={isSelected ? "contained" : "outlined"}
                                        onClick={() => handleAnswer(ans.text, currentQuestion.id)}
                                        disabled={answerStatus !== "none"}
                                        sx={{
                                            flexGrow: 1,
                                            color: "white",
                                            borderColor: "#FFF44F",
                                            backgroundColor: bgColor,
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor:
                                                    bgColor === "transparent" ? "#555" : bgColor,
                                            },
                                        }}
                                    >
                                        {ans.text}
                                    </Button>
                                    <IconButton
                                        onClick={() => speakText(ans.text, "en")}
                                        sx={{ ml: 1, color: "#FFF44F" }}
                                        aria-label="Озвучить ответ"
                                    >
                                        <VolumeUpIcon />
                                    </IconButton>
                                </Box>
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

                    {show && (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: "#FFF44F", color: "black" }}
                            onClick={() => gobackFoo()}
                        >
                            Вернуться к видео
                        </Button>
                    )}
                </>
            )}
        </Paper>
    );
};
