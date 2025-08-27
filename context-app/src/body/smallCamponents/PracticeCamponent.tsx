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
import zvuki2 from '../../../assets/zvuki.mp3';

type TimeKey = "Present" | "Future" | "Past";
export type changeType = "." | "?" | "!";

type PracticeComponentProps = {
    time: TimeKey;
    toggle: boolean;
    open: boolean;
    openTheory: (theory: boolean) => void;
    toggleTheory: (togglePractice: boolean) => void;
    setShowPractice: (showPractice:boolean) => void;
    show: boolean;
};

export const PracticeComponent: React.FC<PracticeComponentProps> = ({
                                                                        time,
                                                                        open,
                                                                        toggle = false,
                                                                        openTheory,
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
        if ( open) {
            toggleTheory(true);
        }
    }, [open]);
    useEffect(() => {
        if (!show) {
            toggleTheory(false);
        }
    }, [show]);
    const gobackFoo = () => {
        if (show === true) {
            setShowPractice(true);
        }
        toggleTheory(false);
    };
    const ButtonFoo = (toggle: boolean) => {
        toggleTheory(!toggle);
        setShowPractice(!toggle)
        setAnswerStatus('none')
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
        const newQuestion = data.simple[time][type];
        setFullData(data);
        setQuestions(newQuestion);
    }
    const CloseButton = () => {
        setToggelModal(0)
        setAnswerStatus("none")
    }
    const GoToTheorya = () => {
        setToggelModal(0)
        setAnswerStatus("none")
        toggleTheory(!toggle);
        openTheory(true)
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
            {toggelModal === 1 && answerStatus === 'wrong' &&
                <Modal open={toggelModal === 1?true:false} onClose={CloseButton}>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#444447",
                                color: "#fff",
                                padding: "6px",
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
                        <Box sx={{marginTop: "6px"}}>
                            <Button onClick={() => GoToTheorya()}>Подробнее правила в теории</Button>
                        </Box>
                        <Box sx={{
                            padding: 0,
                            marginTop: "-18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
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
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Он/Она/Оно
                                                            любит</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}>He/She/It
                                                            loves</TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}>
                                                            He/She/It does not (doesn't) love
                                                        </TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>Does
                                                            he/she/it love?</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Мы/Ты/Они любим</TableCell>
                                                        <TableCell sx={{px: '10%'}}>We/You/They love</TableCell>
                                                        <TableCell sx={{px: 1}}>We/You/They don't love</TableCell>
                                                        <TableCell>Do we/you/they love?</TableCell>
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
                <Modal open={toggelModal === 2?true:false} onClose={CloseButton}>
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
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        width: "100%",
                    }}>
                        <Button sx={{backgroundColor: "#d20000", color: 'black'}}
                                onClick={() => setToggelModal(0)}>нет</Button>
                        <Button sx={{backgroundColor: "#00d300", color: 'black'}} onClick={() => newData()}>да</Button>
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
                                    pr: 3,
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
                                                width: "20%", // было 10%, теперь в 2 раза шире
                                                paddingY: 2,  // увеличил высоту
                                                fontSize: "1.2rem", // шрифт тоже крупнее
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
                  position: "relative",
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
                            position: "relative", // чтобы слои позиционировались внутри
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Видео сверху кнопки */}
                        {answerStatus === "correct" && ans.isCorrect && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "180%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2, // выше кнопки
                                }}
                            >
                                <VideoCat src={"/Right.mp4"} />
                            </Box>
                        )}
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
                                zIndex: 1, // ниже видео
                                "&:hover": {
                                    backgroundColor: bgColor === "transparent" ? "#555" : bgColor,
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
                            sx={{ ml: 1, color: "#FFF44F", zIndex: 3 }} // иконка всегда выше
                            aria-label="Озвучить ответ"
                        >
                            <VolumeUpIcon />
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
                                mt: 1,
                                gap: 3.5,

                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    flexGrow: 1,
                                    maxWidth: "300px",
                                    width: "100%",
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                    textTransform: "none",
                                    mb: {xs: 1, sm: 0},
                                    mt: 2,
                                }}
                                onClick={handleNextQuestion}
                            >
                                СЛЕДУЮЩИЙ ВОПРОС
                            </Button>

                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        position: "absolute",*/}
                            {/*        transform: "translateY(-50%)",*/}
                            {/*        display: "flex",*/}
                            {/*        justifyContent: {xs: "right", sm: "flex-end"},*/}
                            {/*        alignItems: "right",*/}
                            {/*        flex: {xs: "1 1 100%", sm: "0 0 auto"},*/}
                            {/*        mt: {xs: 1, sm: 0},*/}
                            {/*        // position: 'fixed',*/}
                            {/*        right: videoRight == 1 ? '50%' : videoRight == 2 ? '5%' : 'center',*/}
                            {/*        top: videoRight == 3 ? '20%' : '70%'*/}
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
                                sx={{
                                    flexGrow: 1,
                                    maxWidth: "300px",
                                    width: "100%",
                                    mt: 1.5,
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                }}
                                onClick={tryAgain}
                            >
                                ПОПРОБУЙ СНОВА
                            </Button>
                        </Box>
                    )}

                    {show && (
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    flexGrow: 1,
                                    maxWidth: "300px",
                                    width: "100%",
                                    mt: 2,
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                }}
                                onClick={() => gobackFoo()}
                            >
                                ВЕРНУТЬСЯ К ВИДЕО
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
