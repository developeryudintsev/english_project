import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type {timeType} from '../App';
import cat from '../picture/cat.JPG';
import {useEffect, useState} from "react";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type {DataType, QuestionType} from "../Data/Data";
import {getQuestions} from "../Data/Data";

type HeaderType = {
    time: timeType;
    setTime: (time: timeType) => void;
    handleChange: (event: timeType) => void;
    star: number
};

export const Header = (props: HeaderType) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSuperSmall, setIsSuperSmall] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);
    const [questions, setQuestions] = useState<DataType | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 684);
            setIsSuperSmall(window.innerWidth < 330);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (modalToggle) {
            getQuestions().then((data) => {
                setQuestions(data);
            });
        }
    }, [modalToggle]);

    const checkDone = (tense: keyof DataType["simple"], lessonKey: string) => {
        const lesson = questions?.simple[tense]?.[lessonKey];
        if (!lesson) return false;
        return lesson.every((q: QuestionType) => q.isDone);
    };
    return (
        <AppBar position="static" sx={{backgroundColor: '#444447'}}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        py: 1,
                        gap: isMobile ? 3 : 0,
                    }}
                >
                    {isMobile ? (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    px: 1,
                                    gap: 20,
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'baseline', gap: 0.5}}>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 700,
                                            fontFamily: '"South Park Ext", sans-serif',
                                            fontSize: isSuperSmall ? '0.8rem' : '1.7rem',
                                            textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        English cat
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 400,
                                            fontSize: '1rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        (v0.7)
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 400,
                                            fontSize: '1rem',
                                            whiteSpace: 'nowrap',
                                            left: '2px'
                                        }}
                                    >
                                        <Box sx={{position: "relative", display: "inline-flex", alignItems: "center"}}
                                             onClick={() => setModalToggle(true)}
                                        >
                                            {/* ⭐ звезда */}
                                            <Rating
                                                name="progress-star"
                                                value={props.star > 0 ? 1 : 0}
                                                max={1}
                                                readOnly
                                                sx={{fontSize: "60px", color: "#FFF44F", top: '10px'}}
                                            />
                                            {props.star > 0 && (
                                                <Typography
                                                    sx={{
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "60%",
                                                        transform: "translate(-50%, calc(-50% + 5px))",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        fontSize: "1.2rem",
                                                        pointerEvents: "none",
                                                    }}
                                                >
                                                    {props.star}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Modal
                                            open={modalToggle}
                                            onClose={() => setModalToggle(false)}
                                        >
                                            <Box
                                                sx={{
                                                    width: 400,
                                                    bgcolor: "#2c2c2c",
                                                    borderRadius: 2,
                                                    boxShadow: 24,
                                                    mx: "auto",
                                                    mt: "10%",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        backgroundColor: "#444447",
                                                        color: "#fff",
                                                        py: 1,
                                                        position: "relative",
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => setModalToggle(false)}
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
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#FFF44F",
                                                            width: "100%",
                                                            px: 6,
                                                        }}
                                                    >
                                                        Выполненные времена:
                                                    </Typography>
                                                </Box>

                                                {/* список времен */}
                                                <Box sx={{ p: 2 }}>
                                                    {["Present", "Past", "Future"].map((tense) => (
                                                        <Box key={tense} sx={{ mb: 2 }}>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: "bold",
                                                                    color: "#FFF44F",
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                {tense}
                                                            </Typography>
                                                            {questions &&
                                                                Object.keys(
                                                                    questions.simple[
                                                                        tense as keyof DataType["simple"]
                                                                        ]
                                                                ).map((lessonKey) => {
                                                                    const done = checkDone(
                                                                        tense as keyof DataType["simple"],
                                                                        lessonKey
                                                                    );
                                                                    return (
                                                                        <Box
                                                                            key={lessonKey}
                                                                            sx={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "space-between",
                                                                                py: 0.5,
                                                                            }}
                                                                        >
                                                                            <Typography sx={{ color: "white" }}>
                                                                                {lessonKey}
                                                                            </Typography>
                                                                            <Rating
                                                                                name={`${tense}-${lessonKey}`}
                                                                                value={done ? 1 : 0}
                                                                                max={1}
                                                                                readOnly
                                                                                sx={{
                                                                                    fontSize: "30px",
                                                                                    color: "#FFF44F",
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    );
                                                                })}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Modal>
                                    </Typography>
                                </Box>

                                <Tooltip title="Ссылка на наш сайт">
                                    <a
                                        href="https://www.kiber-rus.ru/"
                                        target="_blank"
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            alt="User Avatar"
                                            src={cat}
                                            sx={{
                                                border: '2px solid white',
                                                width: isSuperSmall ? 40 : 50,
                                                height: isSuperSmall ? 40 : 50,
                                            }}
                                        />
                                    </a>
                                </Tooltip>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    px: 1,
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 500,
                                        flexShrink: 0,
                                    }}
                                >
                                    Simple
                                </Typography>

                                <FormControl
                                    sx={{
                                        flexGrow: 1,
                                        minWidth: isSuperSmall ? 120 : 160,
                                        marginLeft: '20px',
                                    }}
                                    size="small"
                                >
                                    <Select
                                        value={props.time}
                                        onChange={(e) =>
                                            props.handleChange(e.target.value as timeType)
                                        }
                                        displayEmpty
                                        inputProps={{'aria-label': 'Select tense'}}
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Past">Past</MenuItem>
                                        <MenuItem value="Future">Future</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </>
                    ) : (
                        <>
                            {/* Desktop версия */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    flexGrow: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 500,
                                        flexShrink: 0,
                                    }}
                                >
                                    Simple
                                </Typography>
                                <FormControl
                                    size="small"
                                    sx={{
                                        flexGrow: 1,
                                        minWidth: 160,
                                        maxWidth: 250,
                                    }}
                                >
                                    <Select
                                        value={props.time}
                                        onChange={(e) =>
                                            props.handleChange(e.target.value as timeType)
                                        }
                                        displayEmpty
                                        inputProps={{'aria-label': 'Select tense'}}
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Past">Past</MenuItem>
                                        <MenuItem value="Future">Future</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{display: 'flex', alignItems: 'baseline', gap: 0.5}}>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 700,
                                            fontFamily: '"South Park Ext", sans-serif',
                                            fontSize: '2.3rem',
                                            textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        English cat
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 400,
                                            fontSize: '1rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        (v0.7)
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 400,
                                            fontSize: '1rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >

                                        <Box sx={{position: "relative", display: "inline-flex", alignItems: "center"}}
                                             onClick={() => setModalToggle(true)}
                                        >
                                            {/* ⭐ звезда */}
                                            <Rating
                                                name="progress-star"
                                                value={props.star > 0 ? 1 : 0}
                                                max={1}
                                                readOnly
                                                sx={{fontSize: "60px", color: "#FFF44F", top: '10px'}}
                                            />
                                            {props.star > 0 && (
                                                <Typography
                                                    sx={{
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "60%",
                                                        transform: "translate(-50%, calc(-50% + 5px))",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        fontSize: "1.2rem",
                                                        pointerEvents: "none",
                                                    }}
                                                >
                                                    {props.star}
                                                </Typography>
                                            )}
                                        </Box>

                                        <Modal
                                            open={modalToggle}
                                            onClose={() => setModalToggle(false)}
                                        >
                                            <Box
                                                sx={{
                                                    width: 400,
                                                    bgcolor: "#2c2c2c",
                                                    borderRadius: 2,
                                                    boxShadow: 24,
                                                    mx: "auto",
                                                    mt: "10%",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        backgroundColor: "#444447",
                                                        color: "#fff",
                                                        py: 1,
                                                        position: "relative",
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => setModalToggle(false)}
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
                                                        <CloseIcon />
                                                    </IconButton>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#FFF44F",
                                                            width: "100%",
                                                            px: 6,
                                                        }}
                                                    >
                                                        Выполненные времена:
                                                    </Typography>
                                                </Box>

                                                {/* список времен */}
                                                <Box sx={{ p: 2 }}>
                                                    {["Present", "Past", "Future"].map((tense) => (
                                                        <Box key={tense} sx={{ mb: 2 }}>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    fontWeight: "bold",
                                                                    color: "#FFF44F",
                                                                    mb: 1,
                                                                }}
                                                            >
                                                                {tense}
                                                            </Typography>
                                                            {questions &&
                                                                Object.keys(
                                                                    questions.simple[
                                                                        tense as keyof DataType["simple"]
                                                                        ]
                                                                ).map((lessonKey) => {
                                                                    const done = checkDone(
                                                                        tense as keyof DataType["simple"],
                                                                        lessonKey
                                                                    );
                                                                    return (
                                                                        <Box
                                                                            key={lessonKey}
                                                                            sx={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "space-between",
                                                                                py: 0.5,
                                                                            }}
                                                                        >
                                                                            <Typography sx={{ color: "white" }}>
                                                                                {lessonKey}
                                                                            </Typography>
                                                                            <Rating
                                                                                name={`${tense}-${lessonKey}`}
                                                                                value={done ? 1 : 0}
                                                                                max={1}
                                                                                readOnly
                                                                                sx={{
                                                                                    fontSize: "30px",
                                                                                    color: "#FFF44F",
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    );
                                                                })}
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </Modal>
                                    </Typography>
                                </Box>

                                <Tooltip title="Ссылка на наш сайт">
                                    <a
                                        href="https://www.kiber-rus.ru/"
                                        target="_blank"
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            alt="User Avatar"
                                            src={cat}
                                            sx={{
                                                border: '2px solid white',
                                                width: 60,
                                                height: 60,
                                            }}
                                        />
                                    </a>
                                </Tooltip>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
