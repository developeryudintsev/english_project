import React, {useEffect, useRef, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    LinearProgress,
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
import {addQuestions, data, getQuestions, getRatingMap, updateQuestion, updateRatingFor,} from "../../Data/Data";
import {VideoCat} from "../../camponent/VideoCat";
import {ModalCamponent} from "../../modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {TypeAnimation} from 'react-type-animation';
import Rating from '@mui/material/Rating';
import Modal from '@mui/material/Modal';
import AutorenewIcon from "@mui/icons-material/Autorenew";

type TimeKey = "Present" | "Future" | "Past";
export type changeType = "." | "?" | "!";

type PracticeComponentProps = {
    time: TimeKey;
    toggle: boolean;
    openTheory: (theory: boolean) => void;
    toggleTheory: (togglePractice: boolean) => void;
    setShowPractice: (showPractice: boolean) => void;
    showPractice: boolean
    setToggleVC: (toggleVC: boolean) => void
    setStar: (star: number) => void
    star: number
};
export const PracticeComponent: React.FC<PracticeComponentProps> = ({
                                                                        time,
                                                                        toggle = false,
                                                                        openTheory,
                                                                        toggleTheory,
                                                                        setShowPractice,
                                                                        setToggleVC,
                                                                        setStar,
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
    const [videoLoading, setVideoLoading] = useState(true);
    const isFinished = congratulation;
    let [toggelModal, setToggelModal] = useState<0 | 1 | 2>(0)
    let [toggelVideoCat, setToggelVideoCat] = useState<0 | 1 | 2 | 3>(0)
    let typeSentence =
        type === "."
            ? "утвердительное"
            : type === "?"
                ? "вопросительное"
                : "отрицательное";
    const [page, setPage] = useState(0);
    const itemsPerPage = 9;
    const startIndex = page * itemsPerPage;
    const visibleQuestions = questions.slice(startIndex, startIndex + itemsPerPage);
    const [progress, setProgress] = useState<{ done: number, total: number }>({done: 0, total: 0});
    console.log(questions.length)
    useEffect(() => {
        const loadProgress = async () => {
            const stored = await getQuestions();
            if (!stored) return;

            const timeData = stored.simple[time];
            let done = 0;
            let total = 0;

            Object.values(timeData).forEach((questionsArr) => {
                total += questionsArr.length;
                done += questionsArr.filter((q) => q.isDone).length;
            });

            setProgress({done, total});
        };

        loadProgress();
    }, [time]);
    useEffect(() => {
        const allDone = questions.every((q) => q.isDone);
        setCongratulation(allDone);
    }, [questions, type]);
    useEffect(() => {
        // Симулируем загрузку видео при монтировании компонента
        const timer = setTimeout(() => {
            setVideoLoading(false);
        }, 2000); // 2 секунды загрузки

        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (toggle) {
            setVideoLoading(false);
        }
    }, [toggle]);
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
    useEffect(() => {
        const init = async () => {
            const stored = await getQuestions();
            if (!stored || !stored.simple) {
                await addQuestions(data, "none");
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

                    // 👇 авто-выбор страницы с первой незакрытой задачей
                    setPage(Math.floor(idx / itemsPerPage));
                }
            } else {
                const loaded = stored.simple[time][type];
                setFullData(stored);
                setQuestions(loaded);

                const firstUnfinishedIndex = loaded.findIndex((q) => !q.isDone);
                const idx = firstUnfinishedIndex === -1 ? 0 : firstUnfinishedIndex;

                setCurrentQuestion(loaded[idx] ?? null);
                setCurrentIndex((prev) => ({...prev, [type]: idx}));
                setCongratulation(false);
                console.log(congratulation)
                // 👇 авто-выбор страницы
                setPage(Math.floor(idx / itemsPerPage));
            }
            setAnswerStatus("none");
            setSelectedAnswer(null);
        };

        init();
    }, [time, type]);
    const handleAnswer = async (answerText: string, id: string) => {

        if (answerStatus !== "none") return;
        setSelectedAnswer(answerText);
        setToggelModal(1);

        if (currentQuestion && fullData) {
            const correctAnswer = currentQuestion.answers.find((ans) => ans.isCorrect);
            if (correctAnswer && correctAnswer.text === answerText) {

                setAnswerStatus("correct");
                setToggelVideoCat(2)
                const updatedQuestion = {...currentQuestion, isDone: true};
                setQuestions((prev) => prev.map((q) => (q.id === id ? updatedQuestion : q)));
                setCurrentQuestion(updatedQuestion);
                const updatedData: DataType = {
                    ...fullData,
                    simple: {
                        ...fullData.simple,
                        [time]: {
                            ...fullData.simple[time],
                            [type]: questions.map((q) => (q.id === id ? updatedQuestion : q)),
                        },
                    },
                };
                const exest = updatedData['simple'][time][type].find((q) => !q.isDone);
                if (!exest) {
                    setToggelVideoCat(3)
                }
                if (!exest) {
                    setToggelVideoCat(3); // 👈 победа
                }
                setFullData(updatedData);
                await updateQuestion(updatedData);
            } else {
                setAnswerStatus("wrong");
                setToggelVideoCat(1)
            }
        }
    };
    useEffect(() => {
        const allDone = questions.every((q) => q.isDone);
        if (allDone) {
            (async () => {
                await updateRatingFor(time, type);
                const map = await getRatingMap();
                if (map) {
                    let completed = 0;
                    Object.values(map.simple).forEach(timeData => {
                        Object.values(timeData).forEach(v => {
                            if (v === 1) completed++;
                        });
                    });
                    setStar(completed);
                }
            })();
        }
    }, [questions, type, time]);
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
    const handleNextQuestion = () => {
        const next = questions.find((q) => !q.isDone);
        if (next) {
            const nextIndex = questions.indexOf(next);
            const nextPage = Math.floor(nextIndex / itemsPerPage);

            // Обновляем страницу на ту, где находится неотвеченный вопрос
            setPage(nextPage);

            setCurrentQuestion(next);
            setCurrentIndex((prev) => ({
                ...prev,
                [type]: nextIndex,
            }));
        } else {
            setCongratulation(false);
        }
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };
    const tryAgain = () => {
        setAnswerStatus("none");
        setSelectedAnswer(null);
    };
    const gobackFoo = () => {
        setShowPractice(false);
        setToggleVC(true)
        openTheory(false);
    };
    const ButtonFoo = (toggle: boolean) => {
        openTheory(false)
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
        setCurrentQuestion(newQuestion[0])
        setPage(0);
        wordFoo(newQuestion[0].id)
        console.log(newQuestion[0])
    }
    const CloseButton = () => {
        setToggelModal(0)
        setAnswerStatus("none")
    }
    const GoToTheorya = () => {
        setToggelModal(0)
        setAnswerStatus("none")
        toggleTheory(true); // открываем теорию
        openTheory(true)
        setShowPractice(false); // закрываем практику
    }
    const LeftSlider = () => {
        setPage((p) => Math.max(p - 1, 0))
        const index = (page - 1) * itemsPerPage;
        const questionsWithOutDelay = questions.slice(index, index + itemsPerPage);
        const findQestion = questionsWithOutDelay.find((f) => f.isDone == false)
        const result = findQestion == undefined ? questionsWithOutDelay[0] : findQestion
        setCurrentQuestion(result)
        wordFoo(result.id)
    }
    const RightSlider = () => {
        setPage((p) => Math.max(p + 1))
        const index = (page + 1) * itemsPerPage;
        const questionsWithOutDelay = questions.slice(index, index + itemsPerPage);
        const findQestion = questionsWithOutDelay.find((f) => f.isDone == false)
        const result = findQestion == undefined ? questionsWithOutDelay[0] : findQestion
        setCurrentQuestion(result)
        wordFoo(result.id)
    }
    const handleRefresh = () => {
        setToggelVideoCat(0);
        setTimeout(() => setToggelVideoCat(3), 0); // 👈 сброс + запуск заново
    };
    return (
        <>
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

                {toggelModal === 1 && answerStatus === 'wrong' && (
                    <ModalCamponent open={toggelModal === 1} onClose={CloseButton}>
                        <Box sx={{height: '350px'}}>
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
                                    onClick={CloseButton}
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
                                    {typeSentence} предложение в Simple строится так:
                                </Typography>
                            </Box>

                            <Box sx={{marginTop: "6px"}}>
                                <Button
                                    onClick={GoToTheorya}
                                    variant="contained"
                                    sx={{color: 'white'}}
                                >
                                    Подробнее правила в теории
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    padding: 0,
                                    marginTop: "-18px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    position: "relative",
                                }}
                            >
                                <div style={{textAlign: "center", marginTop: '22px', width: "100%"}}>
                                    <Box sx={{width: "100%", maxWidth: 800}}>
                                        <TableContainer component={Paper} sx={{my: 1}}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Русский</TableCell>
                                                        <TableCell align="center">Английский (Утверждение)</TableCell>
                                                        <TableCell align="center">Отрицание</TableCell>
                                                        <TableCell align="center">Вопрос</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">Я {time === 'Present' ? 'люблю' :
                                                            time === 'Past' ? 'любил' : 'буду любить'}</TableCell>
                                                        <TableCell align="center">I {time === 'Present' ? 'love' :
                                                            time === 'Past' ? 'loved' : 'will love'}</TableCell>
                                                        <TableCell
                                                            align="center">I {time === 'Present' ? 'don\'t love' :
                                                            time === 'Past' ? 'didn\'t love' : 'won\'t love'}</TableCell>
                                                        <TableCell align="center">{time === 'Present' ? 'Do I love?' :
                                                            time === 'Past' ? 'Did I love?' : 'Will I love?'}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>
                                                            Он/Она/Оно {time === 'Present' ? 'любит' :
                                                            time === 'Past' ? 'любил' : 'будет любить'}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: '10%'}}
                                                        >
                                                            He/She/It {time === 'Present' ? 'loves' :
                                                            time === 'Past' ? 'loved' : 'will love'}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{backgroundColor: "#FFF44F", color: "#000", px: 1}}
                                                        >
                                                            He/She/It {time === 'Present' ? 'does not (doesn\'t) love' :
                                                            time === 'Past' ? 'did not (didn\'t) love' : 'will not (won\'t) love'}
                                                        </TableCell>
                                                        <TableCell sx={{backgroundColor: "#FFF44F", color: "#000"}}>
                                                            {time === 'Present' ? 'Does he/she/it love?' :
                                                                time === 'Past' ? 'Did he/she/it love?' : 'Will he/she/it love?'}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Мы/Ты/Они {time === 'Present' ? 'любим' :
                                                            time === 'Past' ? 'любили' : 'будут любить'}</TableCell>
                                                        <TableCell
                                                            sx={{px: '10%'}}>We/You/They {time === 'Present' ? 'love' :
                                                            time === 'Past' ? 'loved' : 'will love'}</TableCell>
                                                        <TableCell
                                                            sx={{px: 1}}>We/You/They {time === 'Present' ? 'don\'t love' :
                                                            time === 'Past' ? 'didn\'t love' : 'won\'t love'}</TableCell>
                                                        <TableCell>{time === 'Present' ? 'Do we/you/they love?' :
                                                            time === 'Past' ? 'Did we/you/they love?' : 'Will we/you/they love?'}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </div>
                                {toggelVideoCat === 1 && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "70%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            zIndex: 2,
                                            pointerEvents: "none",
                                        }}
                                    >
                                        <VideoCat
                                            src={"/wrong4.mp4"}
                                            setToggelVideoCatFoo={() => setToggelVideoCat(0)}
                                            toggelVideoCat={toggelVideoCat}
                                            showCondition={toggelModal === 1}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </ModalCamponent>
                )}

                {toggelModal === 2 && (
                    <ModalCamponent open={toggelModal === 2 ? true : false} onClose={CloseButton}>
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
                                Вы действительно хотите обнулить результаты?
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
                            <Button sx={{backgroundColor: "#d20000", color: 'white'}}
                                    onClick={() => setToggelModal(0)}>нет</Button>
                            <Button sx={{backgroundColor: "#00d300", color: 'white'}}
                                    onClick={() => newData()}>да</Button>
                        </Box>
                    </ModalCamponent>
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
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: "10px"
                            }}>
                            <span onClick={() => ButtonFoo(toggle)}>
                                Практика – {time} Simple ({progress.done}/{progress.total})
                            </span>
                            </div>
                        ) :  (
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
                                    {isFinished && (
                                        <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                                            <Rating name="done-star" value={1} max={1} readOnly sx={{ fontSize: 56, color: "#FFF44F" }} />
                                        </Box>
                                    )}
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
                                <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 2,
                                            width: "100%",
                                        }}
                                    >
                                        {questions.length > itemsPerPage && (
                                            <Button
                                                variant="outlined"
                                                disabled={page === 0}
                                                onClick={() => LeftSlider()}
                                                sx={{
                                                    fontSize: 40,
                                                    border: "#FFF44F",
                                                    color: "#FFF44F",
                                                    minWidth: "40px",
                                                }}
                                            >
                                                {`<`}
                                            </Button>
                                        )}
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: "repeat(3, 1fr)", // 3 кнопки в ряд
                                                gap: 1,
                                                width: "70%",
                                            }}
                                        >
                                            {visibleQuestions.map((m) => {
                                                const isCurrent = currentQuestion?.id === m.id;
                                                return (
                                                    <Button
                                                        key={m.id}
                                                        variant={m.isDone ? "contained" : "outlined"}
                                                        onClick={() => wordFoo(m.id)}
                                                        size="medium"
                                                        sx={{
                                                            backgroundColor: isCurrent
                                                                ? "#1976d2"
                                                                : m.isDone
                                                                    ? "#FFF44F"
                                                                    : "transparent",
                                                            borderColor: "#FFF44F",
                                                            color: isCurrent ? "white" : "black",
                                                            textTransform: "none",
                                                            paddingY: 2,
                                                            fontSize: "1.1rem",
                                                            "&:hover": {
                                                                backgroundColor: isCurrent
                                                                    ? "#1565c0"
                                                                    : m.isDone
                                                                        ? "#ffea00"
                                                                        : "#555",
                                                                color: "white",
                                                            },
                                                        }}
                                                    >
                                                        {m.word}
                                                    </Button>
                                                );
                                            })}
                                        </Box>
                                        {questions.length > itemsPerPage && (
                                            <Button
                                                variant="outlined"
                                                disabled={startIndex + itemsPerPage >= questions.length}
                                                onClick={() => RightSlider()}
                                                sx={{
                                                    fontSize: 40,
                                                    border: "#FFF44F",
                                                    color: "#FFF44F",
                                                    minWidth: "40px",
                                                }}
                                            >
                                                {'>'}
                                            </Button>
                                        )}
                                    </Box>
                                </Box>

                                {toggelVideoCat === 3 && (
                                    <Modal
                                        open={toggelVideoCat === 3}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                width: "90%",
                                                maxWidth: "600px",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                bgcolor: "#444447",
                                                border: "2px solid #FFF44F",
                                                boxShadow: 24,
                                                p: { xs: 2, sm: 4 },
                                                borderRadius: "12px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    gap: 0,
                                                }}
                                            >
                                                <IconButton
                                                    onClick={handleRefresh}
                                                    sx={{
                                                        position: "absolute",
                                                        top: -16,
                                                        right: 28, // 👈 немного левее крестика
                                                        backgroundColor: "green",
                                                        color: "white",
                                                        "&:hover": { backgroundColor: "darkgreen" },
                                                        width: { xs: 32, sm: 40 },
                                                        height: { xs: 32, sm: 40 },
                                                    }}
                                                >
                                                    <AutorenewIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => setToggelVideoCat(0)}
                                                    sx={{
                                                        position: "absolute",
                                                        top: -16,
                                                        right: -16,
                                                        backgroundColor: "red",
                                                        color: "white",
                                                        "&:hover": { backgroundColor: "darkred" },
                                                        width: { xs: 32, sm: 40 },
                                                        height: { xs: 32, sm: 40 },
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>

                                                <Typography
                                                    sx={{
                                                        color: "#FFF44F",
                                                        mb: 2,
                                                        fontSize: { xs: "0.9rem", sm: "1.2rem" },
                                                        textAlign: "center",
                                                        wordBreak: "break-word",
                                                        marginTop:'40px'
                                                    }}
                                                >
                                                    <TypeAnimation
                                                        sequence={["Поздравляем! Вы ответили на все вопросы.", 1000]}
                                                        wrapper="span"
                                                        speed={50}
                                                        style={{
                                                            fontSize: "inherit",
                                                            display: "inline-block",
                                                        }}
                                                        repeat={Infinity}
                                                    />
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        width: "100%",
                                                        maxWidth: { xs: "280px", sm: "400px" },
                                                        height: { xs: "200px", sm: "280px" },
                                                        mx: "auto",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            pointerEvents: "none",
                                                        }}
                                                    >
                                                        <Rating
                                                            name="customized-10"
                                                            defaultValue={1}
                                                            max={1}
                                                            sx={{
                                                                fontSize: { xs: "180px", sm: "280px", md: "350px" },
                                                                color: "#FFF44F",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                        }}
                                                    >
                                                        <VideoCat
                                                            src={"/win2.mp4"}
                                                            setToggelVideoCatFoo={() => setToggelVideoCat(3)}
                                                            toggelVideoCat={toggelVideoCat}
                                                            showCondition={toggelVideoCat === 3}
                                                            size={window.innerWidth < 480 ? "small" : "normal"}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Modal>
                                )}

                            </div>
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
                {toggle && currentQuestion && (
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
              <Typography variant="h6" sx={{color: 'white', display: 'flex', alignItems: 'center', gap: 1}}>
               <span style={{color: '#FFF44F'}}>{questions.filter(q => q.isDone).length}/{questions.length}</span>
               <span>{currentQuestion.question}</span>
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
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {answerStatus === "correct" && ans.isCorrect && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2,
                                }}
                            >
                                {toggelVideoCat === 2 && (
                                    <VideoCat
                                        src={"/RightS6.mp4"}
                                        setToggelVideoCatFoo={() => setToggelVideoCat(0)}
                                        toggelVideoCat={toggelVideoCat}
                                        showCondition={toggelModal === 1 && answerStatus === "correct"} // 👈 фикс
                                    />
                                )}
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
                                zIndex: 1,
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
                            sx={{ml: 1, color: "#FFF44F", zIndex: 3}} // иконка всегда выше
                            aria-label="Озвучить ответ"
                        >
                            <VolumeUpIcon/>
                        </IconButton>
                    </Box>
                );
            })}
          </Box>
                        {answerStatus === "correct" && (
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
                                        py: 1,
                                    }}
                                    onClick={handleNextQuestion}
                                >
                                    СЛЕДУЮЩИЙ ВОПРОС(ПО ПОРЯДКУ)
                                </Button>
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
                                        mt: 2,
                                        backgroundColor: "#FFF44F",
                                        color: "black",
                                    }}
                                    onClick={tryAgain}
                                >
                                    ПОПРОБУЙ СНОВА
                                </Button>
                            </Box>
                        )}
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
                </span>
                )}
            </Paper>

            {videoLoading && (
                <Box sx={{
                    width: "95%",
                    maxWidth: "980px",
                    margin: "0 auto",
                    marginTop: "-16px", // убираем отступ Paper
                    position: "relative",
                    zIndex: 1
                }}>
                    <LinearProgress
                        sx={{
                            width: "100%",
                            height: 4,
                            backgroundColor: "rgb(0, 183, 255)",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: "#00ff00",
                            },
                        }}
                    />
                </Box>
            )}
        </>
    );
};

const blinkAnimation = {
    "@keyframes blinkGreen":
        {
            "0%":
                {
                    boxShadow: "0 0 10px 2px #00ff00"
                }
            ,
            "50%":
                {
                    boxShadow: "0 0 20px 5px #00ff00"
                }
            ,
            "100%":
                {
                    boxShadow: "0 0 10px 2px #00ff00"
                }
            ,
        }
    ,
    "@keyframes blinkRed":
        {
            "0%":
                {
                    boxShadow: "0 0 10px 2px red"
                }
            ,
            "50%":
                {
                    boxShadow: "0 0 20px 5px red"
                }
            ,
            "100%":
                {
                    boxShadow: "0 0 10px 2px red"
                }
            ,
        }
    ,
};