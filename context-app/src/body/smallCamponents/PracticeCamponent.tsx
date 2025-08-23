import React, {useEffect, useState} from "react";
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
import {addQuestions, data,getQuestions, updateQuestion} from "../../Data/Data";
import type {DataType,QuestionType} from "../../Data/Data";

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

    // const questions = data.simple[time][type];
    // const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [fullData, setFullData] = useState<DataType | null>(null);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [congratulation, setCongratulation] = useState(false);

    useEffect(() => {
        const init = async () => {
            const stored = await getQuestions();

            if (!stored || !stored.simple) {
                // если в IndexedDB ничего нет, то добавляем
                await addQuestions(data);

                const fresh = await getQuestions();
                console.log(fresh)
                if (fresh) {
                    const loaded = fresh.simple[time][type];
                    setQuestions(loaded);
                    setFullData(stored)
                    setCurrentQuestion(loaded[0]);
                }
            } else {
                const loaded = stored.simple[time][type];
                setFullData(stored)
                setQuestions(loaded);
                setCurrentQuestion(loaded[0]);
            }
        };

        init();
    }, [time, type]);

    useEffect(() => {
        const allDone = questions.every((q) => q.isDone);
        setCongratulation(allDone);
    }, [questions, type]);

    const isFinished = congratulation;

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
    const handleAnswer = async (answerText: string, id: string) => {
        if (answerStatus !== "none") return;
        setSelectedAnswer(answerText);

        if (currentQuestion) {
            const correctAnswer = currentQuestion.answers.find((ans) => ans.isCorrect);

            if (correctAnswer && correctAnswer.text === answerText) {
                setAnswerStatus("correct");
                const updatedQuestion = { ...currentQuestion, isDone: true };
                setQuestions((prev) =>
                    prev.map((q) => (q.id === id ? updatedQuestion : q))
                );
                setCurrentQuestion(updatedQuestion);
                const updatedData: DataType = {
                    ...fullData,
                    simple: {
                        ...fullData.simple,
                        [time]: {
                            ...fullData.simple[time],
                            [type]: questions.map((q) =>
                                q.id === id ? updatedQuestion : q
                            ),
                        },
                    },
                };
                console.log(updatedData)
                await updateQuestion(updatedData);

            } else {
                setAnswerStatus("wrong");
            }
        }
    };


    const handleNextQuestion = () => {
        const next = questions.find((q) => !q.isDone);
        if (next) {
            setCurrentQuestion(next);
            setCurrentIndex((prev) => ({
                ...prev,
                [type]: questions.indexOf(next),
            }));
        } else {
            setCongratulation(true);
        }
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };
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
setTimeout(() => {
    if (!questions || questions.length === 0) {
        return (
            <Typography sx={{textAlign: "center", mt: 2, color: "white"}}>
                Нет данных для отображения
            </Typography>
        );
    }
},2000)

    const ButtonFoo = (toggle: boolean) => {
        console.log()
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
        setAnswerStatus('none')
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
                        ? <span onClick={() => ButtonFoo(toggle)}>Практика – {time} Simple</span>
                        : !isFinished
                            ? (
                                <div>
                                    <FormControl sx={{minWidth: 160, marginTop: "-15px"}} size="small">
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
                                            inputProps={{"aria-label": "Select tense"}}
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
                                    <div style={{margin: 3}} onClick={() => ButtonFoo(toggle)}>
                                        Выбери глагол или просто иди по порядку
                                    </div>
                                    <Box>
                                        {questions.map((m) => {
                                            return (
                                                <Button
                                                    key={m.id}
                                                    variant={m.isDone ? "contained" : "outlined"}
                                                    onClick={() => wordFoo(m.id)}
                                                    size="small"
                                                    sx={{
                                                        margin: 0.5,
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
                    <InfoOutlinedIcon/>
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
                            sx={{color: "#FFF44F"}}
                            aria-label="Озвучить вопрос"
                        >
                            <VolumeUpIcon/>
                        </IconButton>
                        {answerStatus === "correct" && (
                            <CheckCircleIcon sx={{color: "limegreen", fontSize: 28}}/>
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
                                    bgColor = "limegreen"; // ✅ правильный всегда зелёный
                                }
                                if (isSelected && !ans.isCorrect) {
                                    bgColor = "#ff4c4c"; // ❌ выбранный неправильный красный
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
                                            color: "white !important",
                                            borderColor: "#FFF44F",
                                            backgroundColor: bgColor,
                                            textTransform: "none",
                                            "&:hover": {
                                                backgroundColor:
                                                    bgColor === "transparent" ? "#555" : bgColor,
                                                color: "white !important",
                                            },
                                            "&.Mui-disabled": {
                                                backgroundColor: bgColor, // ⬅️ фикс для отключённого состояния
                                                color: "white !important",
                                                borderColor: "#FFF44F",
                                                opacity: 1, // убираем серый фильтр MUI
                                            },
                                        }}
                                    >
                                        {ans.text}
                                    </Button>
                                    <IconButton
                                        onClick={() => speakText(ans.text, "en")}
                                        sx={{ml: 1, color: "#FFF44F"}}
                                        aria-label="Озвучить ответ"
                                    >
                                        <VolumeUpIcon/>
                                    </IconButton>
                                </Box>
                            );
                        })}
                    </Box>

                    {(answerStatus === "correct") && (
                        <Button
                            variant="contained"
                            sx={{mt: 1.5, backgroundColor: "#FFF44F", color: "black"}}
                            onClick={handleNextQuestion}
                        >
                            Следующий вопрос
                        </Button>
                    )}
                    {(answerStatus === "wrong") && (
                        <Button
                            variant="contained"
                            sx={{mt: 1.5, backgroundColor: "#FFF44F", color: "black"}}
                            onClick={handleNextQuestion}
                        >
                            попробуй сново
                        </Button>
                    )}

                    {show && (
                        <Box>
                            <Button
                                variant="contained"
                                sx={{mt: 2, backgroundColor: "#FFF44F", color: "black"}}
                                onClick={() => gobackFoo()}
                            >
                                Вернуться к видео
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Paper>
    );
};
