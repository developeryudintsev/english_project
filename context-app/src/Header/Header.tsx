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
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type {DataType, RatingMap} from "../Data/Data";
import {computeRatingMapFromData, getQuestions, getRatingMap, setRatingMap} from "../Data/Data";

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
    const [rating, setRating] = useState<RatingMap | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 684);
            setIsSuperSmall(window.innerWidth < 430);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (!modalToggle) return;
        (async () => {
            try {
                const map = await getRatingMap();
                if (map) {
                    setRating(map);
                } else {
                    const data = await getQuestions();
                    if (data) {
                        const computed = computeRatingMapFromData(data);
                        await setRatingMap(computed);
                        setRating(computed);
                    } else {
                        // no data and no rating — keep rating null (will show loading)
                        setRating(null);
                    }
                }
            } catch (err) {
                console.error("Error loading rating:", err);
                setRating(null);
            }

            try {
                const q = await getQuestions();
                setQuestions(q);
            } catch (err) {
                console.error("Error loading questions:", err);
                setQuestions(null);
            }
        })();
    }, [modalToggle]);
    const getLessonInfo = (tense: "Past" | "Present" | "Future", lessonKey: string) => {
        const lessons = questions?.simple?.[tense] ?? {};
        const lesson = lessons?.[lessonKey] ?? [];
        const total = Array.isArray(lesson) ? lesson.length : 0;
        const doneCount = Array.isArray(lesson) ? lesson.filter((q) => q.isDone).length : 0;
        return { lesson, total, doneCount };
    };
    const renderModalBody = () => {
        if (!rating || !questions) {
            return (
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ color: "#FFF44F" }}>Загрузка...</Typography>
                </Box>
            );
        }

        return (
            <Box sx={{ p: 2 }}>
                {(["Present", "Past", "Future"] as const).map((tense) => (
                    <Box key={tense} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FFF44F", mb: 1 }}>
                            {tense} Simple
                        </Typography>

                        <TableContainer component={Paper} sx={{ my: 2 }}>
                            <Table size="small">
                                <TableBody>

                                    {Object.keys(questions.simple[tense]).map((lessonKey) => {
                                        const starValue = rating?.simple[tense]?.[lessonKey] ?? 0;

                                        const typeSentence =
                                            lessonKey === "."
                                                ? "утвердительное"
                                                : lessonKey === "?"
                                                    ? "вопросительное"
                                                    : "отрицательное";

                                        const { total, doneCount } = getLessonInfo(tense, lessonKey);

                                        return (
                                            <TableRow key={lessonKey}>
                                                <TableCell>
                                                    <Typography sx={{ color: "black" }}>
                                                        {typeSentence} ({doneCount}/{total})
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Rating
                                                        name={`${tense}-${lessonKey}`}
                                                        value={starValue}
                                                        max={1}
                                                        readOnly
                                                        sx={{ fontSize: "30px", color: "#FFF44F" }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))}
            </Box>
        );
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
                                    gap: 2,
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



                                    <Modal open={modalToggle} onClose={() => setModalToggle(false)}>
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
                                                        "&:hover": { backgroundColor: "#cc0000" },
                                                    }}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#FFF44F", width: "100%", px: 6 }}>
                                                    Выполненные времена:
                                                </Typography>
                                            </Box>

                                            {renderModalBody()}
                                        </Box>
                                    </Modal>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    {/* Звезда слева */}
                                    <Box sx={{position: "relative", display: "inline-flex", alignItems: "center"}}>
                                        <Box onClick={() =>{
                                            setModalToggle(true)
                                        }} sx={{cursor: 'pointer'}}>
                                            <Rating
                                                name="progress-star"
                                                value={props.star > 0 ? 1 : 0}
                                                max={1}
                                                readOnly
                                                sx={{fontSize: "50px", color: "#FFF44F"}}
                                            />
                                            {props.star > 0 && (
                                                <Typography
                                                    sx={{
                                                        position: "absolute",
                                                        left: "50%",
                                                        top: "39%",
                                                        transform: "translate(-50%, calc(-50% + 5px))",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        fontSize: "1.1rem",
                                                        pointerEvents: "none",
                                                    }}
                                                >
                                                    {props.star}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>

                                    {/* Аватар справа */}
                                    <Tooltip title="Ссылка на наш сайт">
                                        <a
                                            href="https://www.kiber-rus.ru/"
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{textDecoration: 'none', alignItems: 'center'}}
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
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 1, gap: 1 }}>
                                <Typography sx={{ color: '#FFF44F', fontWeight: 500, flexShrink: 0 }}>Simple</Typography>

                                <FormControl sx={{ flexGrow: 1, minWidth: isSuperSmall ? 120 : 160, marginLeft: '20px' }} size="small">
                                    <Select
                                        value={props.time}
                                        onChange={(e) => props.handleChange(e.target.value as timeType)}
                                        displayEmpty
                                        inputProps={{'aria-label': 'Select tense'}}
                                        sx={{ backgroundColor: 'white', borderRadius: 1, width: '100%' }}
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1,marginTop:'15px' }}>
                                <Typography sx={{ color: '#FFF44F', fontWeight: 500, flexShrink: 0 }}>Simple</Typography>
                                <FormControl size="small" sx={{ flexGrow: 1, minWidth: 160, maxWidth: 250 }}>
                                    <Select
                                        value={props.time}
                                        onChange={(e) => props.handleChange(e.target.value as timeType)}
                                        displayEmpty
                                        inputProps={{'aria-label': 'Select tense'}}
                                        sx={{ backgroundColor: 'white', borderRadius: 1, width: '100%' }}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Past">Past</MenuItem>
                                        <MenuItem value="Future">Future</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                    <Typography sx={{ color: '#FFF44F', fontWeight: 700, fontFamily: '"South Park Ext", sans-serif', fontSize: '2.3rem', textShadow: '2px 2px 0px #000, -1px -1px 0px #000', whiteSpace: 'nowrap' }}>
                                        English cat
                                    </Typography>
                                    <Typography sx={{ color: '#FFF44F', fontWeight: 400, fontSize: '1rem', whiteSpace: 'nowrap' }}>(v0.7)</Typography>

                                    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", ml: 1 }}>
                                        <Box onClick={() =>{
                                            setModalToggle(true)
                                        }} sx={{ cursor: 'pointer' }}>
                                            <Rating name="progress-star" value={props.star > 0 ? 1 : 0} max={1} readOnly sx={{ fontSize: "60px", color: "#FFF44F", top: '10px' }} />
                                            {props.star > 0 && (
                                                <Typography sx={{ position: "absolute", left: "50%", top: "58%", transform: "translate(-50%, calc(-50% + 5px))", color: "black", fontWeight: "bold", fontSize: "1.2rem", pointerEvents: "none" }}>
                                                    {props.star}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>

                                    <Modal open={modalToggle} onClose={() => setModalToggle(false)}>
                                        <Box sx={{ width: 400, bgcolor: "#2c2c2c", borderRadius: 2, boxShadow: 24, mx: "auto", mt: "2%", overflow: "hidden" }}>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#444447", color: "#fff", py: 1, position: "relative" }}>
                                                <IconButton onClick={() => setModalToggle(false)} sx={{ position: "absolute", right: "10px", top: "6px", color: "#fff", backgroundColor: "red", "&:hover": { backgroundColor: "#cc0000" } }}>
                                                    <CloseIcon/>
                                                </IconButton>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", color: "#FFF44F", width: "100%", px: 6 }}>
                                                    Выполненные времена:
                                                </Typography>
                                            </Box>

                                            {renderModalBody()}
                                        </Box>
                                    </Modal>
                                </Box>

                                <Tooltip title="Ссылка на наш сайт">
                                    <a href="https://www.kiber-rus.ru/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                                        <Avatar alt="User Avatar" src={cat} sx={{ border: '2px solid white', width: 60, height: 60 }} />
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
