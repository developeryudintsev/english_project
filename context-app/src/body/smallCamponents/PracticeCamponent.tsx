import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import type {DataType, QuestionType} from "../../Data/Data";
import {addQuestions, data, getQuestions, updateQuestion,} from "../../Data/Data";
import {VideoCat} from "../../camponent/VideoCat";
import {Modal} from "../../modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import zvuki2 from '../../../assets/zvuki2.mp3';

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
    const [fullData, setFullData] = useState<DataType | null>(null);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);
    const [answerStatus, setAnswerStatus] = useState<"none" | "correct" | "wrong">("none");
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [russianVoice, setRussianVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [englishVoice, setEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [congratulation, setCongratulation] = useState(false);
    const isFinished = congratulation;
    let [toggelModal, setToggelModal] = useState<0 | 1 | 2>(0)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    let typeSentence =
        type === "."
            ? "утвердительное"
            : type === "?"
                ? "вопросительное"
                : "отрицательное";
    useEffect(() => {
        const init = async () => {
            const stored = await getQuestions();
            if (!stored || !stored.simple) {
                await addQuestions(data, 'none');
                const fresh = await getQuestions();
                if (fresh) {
                    const loaded = fresh.simple[time][type];
                    setFullData(fresh);
                    setQuestions(loaded);

                    const firstUnfinishedIndex = loaded.findIndex((q) => !q.isDone);
                    const idx = firstUnfinishedIndex === -1 ? 0 : firstUnfinishedIndex;
                    setCurrentQuestion(loaded[idx] ?? null);
                    setCurrentIndex((prev) => ({...prev, [type]: idx}));
                    setCongratulation(firstUnfinishedIndex === -1);
                }
            } else {
                const loaded = stored.simple[time][type];
                setFullData(stored);
                setQuestions(loaded);
                const firstUnfinishedIndex = loaded.findIndex((q) => !q.isDone);
                const idx = firstUnfinishedIndex === -1 ? 0 : firstUnfinishedIndex;
                setCurrentQuestion(loaded[idx] ?? null);
                setCurrentIndex((prev) => ({...prev, [type]: idx}));
                setCongratulation(firstUnfinishedIndex === -1);
            }
            setAnswerStatus("none");
            setSelectedAnswer(null);
        };

        init();
    }, [time, type]);
    useEffect(() => {
        const allDone = questions.every((q) => q.isDone);
        setCongratulation(allDone);
    }, [questions, type]);
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const ruMale = voices.find(
                (v) => v.lang.startsWith("ru") && /male|man/i.test(v.name)
            );
            const ruAny = voices.find((v) => v.lang.startsWith("ru"));
            const enMale = voices.find(
                (v) => v.lang.startsWith("en") && /male|man/i.test(v.name)
            );
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
        setToggelModal(1)
        if (currentQuestion && fullData) {
            const correctAnswer = currentQuestion.answers.find(
                (ans) => ans.isCorrect
            );
            if (correctAnswer && correctAnswer.text === answerText) {
                const audio = new Audio(zvuki2);
                audio.play();
                setAnswerStatus("correct");
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
                const updatedQuestion = {...currentQuestion, isDone: true};
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

                setFullData(updatedData);
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
    const tryAgain = () => {
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
        setAnswerStatus("none");
    };
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);
    const newData = () => {
        const init = async () => {
            await addQuestions(data, 'reload');
        }
        init()
        setToggelModal(0)
    }
    const CloseButton = () => {
        setToggelModal(0)
        setAnswerStatus("none")
    }
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
                ...(answerStatus === "correct"
                    ? {
                        border: "4px solid #00ff00",
                        animation: "blinkGreen 1s infinite",
                        ...blinkAnimation,
                    }
                    : answerStatus === "wrong"
                        ? {
                            border: "4px solid red",
                            animation: "blinkRed 1s infinite",
                            ...blinkAnimation,
                        }
                        : {border: "2px solid transparent"}),
            }}
        >
            {/*<audio ref={audioRef} src="/public/zvuki2.mp3" preload="auto" />*/}
            {toggelModal === 1 && answerStatus === 'wrong' &&
                <Modal>
                    <Box>
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
                            <IconButton
                                onClick={() => CloseButton()}
                                sx={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "6px",
                                    color: "#fff",
                                    backgroundColor: "red",
                                    "&:hover": {
                                        backgroundColor: "#cc0000",
                                    },
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: '#FFF44F',
                                    width: "100%",
                                    px: 6,
                                }}
                            >
                                {/*{typeSentence} предложение в {time} Simple строиться так:*/}
                                {typeSentence} предложение в Simple строиться так:
                            </Typography>
                        </Box>

                        <Box sx={{padding: 0, display: "flex", flexDirection: "column", alignItems: "center"}}>
                            {time === "Present" && (
                                <div style={{textAlign: "center", width: "100%"}}>
                                    <Typography fontWeight="bold" sx={{color: "#FFF44F", mb: 1}}>
                                        Формула:
                                    </Typography>
                                    <Box sx={{width: "100%", maxWidth: 800}}>
                                        <TableContainer component={Paper} sx={{my: 1}}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Русский</TableCell>
                                                        <TableCell align="center">Английский (утверждение)</TableCell>
                                                        <TableCell align="center">Отрицание</TableCell>
                                                        <TableCell align="center">Вопрос</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">Я люблю</TableCell>
                                                        <TableCell align="center">I love</TableCell>
                                                        <TableCell align="center">I don’t love</TableCell>
                                                        <TableCell align="center">Do I love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Он
                                                            любит</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}>He
                                                            loves</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}>
                                                            He does not (doesn't) love
                                                        </TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Does
                                                            he love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Она
                                                            любит</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}>She
                                                            loves</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}>She
                                                            doesn't love</TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Does
                                                            she love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Оно
                                                            любит</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}>It
                                                            loves</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}>It
                                                            doesn't love</TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Does
                                                            it love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Мы любим</TableCell>
                                                        <TableCell sx={{px: '10%'}}>We love</TableCell>
                                                        <TableCell sx={{px: 1}}>We don't love</TableCell>
                                                        <TableCell>Do we love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Ты любишь</TableCell>
                                                        <TableCell sx={{px: '10%'}}>You love</TableCell>
                                                        <TableCell sx={{px: 1}}>You don't love</TableCell>
                                                        <TableCell>Do you love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Они любят</TableCell>
                                                        <TableCell sx={{px: '10%'}}>They love</TableCell>
                                                        <TableCell sx={{px: 1}}>They don't love</TableCell>
                                                        <TableCell>Do they love?</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </div>
                            )}

                            <VideoCat src={"/wrong.mp4"}/>
                        </Box>
                    </Box>
                </Modal>
            }
            {toggelModal === 2 && (
                <Modal>
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
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: '#FFF44F',
                                width: "100%",
                                px: 6,
                            }}
                        >
                            Вы действительно хотите обнулить результат?
                        </Typography>
                    </Box>
                    <Box sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "row",   // 👉 в строку
                        justifyContent: "center", // 👉 по центру
                        alignItems: "center",
                        gap: 2, // 👉 отступ между кнопками
                        width: "100%",
                    }}>
                        <Button sx={{backgroundColor: "#444447",}} onClick={() => setToggelModal(0)}>нет</Button>
                        <Button sx={{backgroundColor: "#444447",}} onClick={() => newData()}>да</Button>
                    </Box>
                </Modal>
            )}


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
                    {!toggle ? (
                        <span onClick={() => ButtonFoo(toggle)}>
              Практика – {time} Simple
            </span>
                    ) : !isFinished ? (
                        <div>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    gap: 2,
                                    marginTop: "-5px",
                                }}
                            >
                                <FormControl sx={{minWidth: 160}} size="small">
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
                                        }}
                                    >
                                        <MenuItem value=".">утвердительное</MenuItem>
                                        <MenuItem value="?">вопросительное</MenuItem>
                                        <MenuItem value="!">отрицательное</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button
                                    onClick={() => setToggelModal(2)}
                                    sx={{
                                        backgroundColor: "#ff0202",
                                        color: "black",
                                        textTransform: "none",
                                        height: "40px",
                                    }}
                                >
                                    очистить результаты
                                </Button>
                            </Box>

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
                    ) : (
                        "Поздравляем! Вы ответили на все вопросы."
                    )}
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

            {/* Вопросы */}
            {toggle && !isFinished && currentQuestion && (
                <span>
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
                        bgColor = "limegreen";
                    }
                    if (isSelected && !ans.isCorrect) {
                        bgColor = "#ff4c4c";
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
                                border: "1px solid #FFF44F",
                                backgroundColor: bgColor,
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor:
                                        bgColor === "transparent" ? "#555" : bgColor,
                                    color: "white !important",
                                },
                                "&.Mui-disabled": {
                                    backgroundColor: bgColor,
                                    color: "white !important",
                                    borderColor: "#FFF44F",
                                    opacity: 1,
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
                    {answerStatus === "correct" && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap",
                                mt: 1.5,
                                gap: 1.5,
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                    textTransform: "none",
                                    mb: {xs: 1, sm: 0},
                                }}
                                onClick={handleNextQuestion}
                            >
                                Следующий вопрос
                            </Button>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: {xs: "right", sm: "flex-end"},
                                    alignItems: "right",
                                    flex: {xs: "1 1 100%", sm: "0 0 auto"}, // на мобилке перенос вниз
                                    mt: {xs: 1, sm: 0}, // сверху чуть меньше отступа
                                    // marginRight:'-30%'
                                }}
                            >
                                <VideoCat src={"/Right.mp4"}/>
                            </Box>
                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        flex: "1 1 100%",*/}
                            {/*        display: "flex",*/}
                            {/*        justifyContent: {xs: "center", sm: "flex-end"}, // центр снизу на мобилке, справа на больших*/}
                            {/*        mt: {xs: 1, sm: 0},*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <VideoCat src={"/Right.mp4"}/>*/}
                            {/*</Box>*/}
                        </Box>
                    )}
                    {answerStatus === "wrong" && (
                        <Box>
                            <Button
                                variant="contained"
                                sx={{mt: 1.5, backgroundColor: "#FFF44F", color: "black"}}
                                onClick={tryAgain}
                            >
                                попробуй снова
                            </Button>
                        </Box>
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
        </span>
            )}
        </Paper>
    );
};

const blinkAnimation = {
    "@keyframes blinkGreen": {
        "0%": {boxShadow: "0 0 10px 2px #00ff00"},
        "50%": {boxShadow: "0 0 20px 5px #00ff00"},
        "100%": {boxShadow: "0 0 10px 2px #00ff00"},
    },
    "@keyframes blinkRed": {
        "0%": {boxShadow: "0 0 10px 2px red"},
        "50%": {boxShadow: "0 0 20px 5px red"},
        "100%": {boxShadow: "0 0 10px 2px red"},
    },
};
