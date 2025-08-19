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
import type { timeType } from '../App';
import cat from '../picture/cat.JPG';
import { useEffect, useState } from "react";

type HeaderType = {
    time: timeType;
    setTime: (time: timeType) => void;
    handleChange: (event: timeType) => void;
};

export const Header = (props: HeaderType) => {
    let [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#444447' }}>
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
                        gap: isMobile ? 2 : 0,
                    }}
                >
                    {isMobile ? (
                        <>
                            {/* Верхняя строка: English cat (v0.7) + ава */}
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
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                                    <Typography
                                        sx={{
                                            color: '#FFF44F',
                                            fontWeight: 700,
                                            fontFamily: '"South Park Ext", sans-serif',
                                            fontSize: '1.7rem',
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
                                                width: 50,
                                                height: 50,
                                            }}
                                        />
                                    </a>
                                </Tooltip>
                            </Box>

                            {/* Нижняя строка: Simple + селектор */}
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
                                        minWidth: 160,
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
                                        inputProps={{ 'aria-label': 'Select tense' }}
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
                                        inputProps={{ 'aria-label': 'Select tense' }}
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
                                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
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
