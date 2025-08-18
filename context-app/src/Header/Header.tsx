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

type HeaderType = {
    time: timeType;
    setTime: (time: timeType) => void;
    handleChange: (event: timeType) => void;
};

export const Header = (props: HeaderType) => {
    return (
        <AppBar position="static" sx={{backgroundColor: '#444447'}}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: {xs: 2, sm: 0},
                        py: {xs: 1.5, sm: 1},
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: {xs: 'space-between', sm: 'flex-start'},
                            width: '100%',
                            maxWidth: {sm: 'fit-content'},
                            order: {xs: 2, sm: 1},
                            gap: 2,
                            px: {xs: 2, sm: 1},
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#FFF44F',
                                fontWeight: 500,
                                flexShrink: 0,
                                ml: {xs: '0%', sm: 0},
                                mr: {xs: '5%', sm: 1},
                            }}
                        >
                            Simple
                        </Typography>

                        <FormControl
                            sx={{
                                maxWidth: '450px',
                                minWidth: {xs: 160, sm: 240},
                                flexGrow: {xs: 1, sm: 0},
                                mr: {xs: '0%', sm: 0},
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

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: {xs: 'space-between', sm: 'flex-end'},
                            width: '100%',
                            maxWidth: {sm: 'fit-content'},
                            order: {xs: 1, sm: 2},
                            gap: 1,
                        }}
                    >
                        <Typography variant="body1" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: '#FFF44F',
                                    fontWeight: 700,
                                    fontFamily: '"Comic Sans MS", "Comic Neue", cursive',
                                    fontSize: { xs: '1rem', sm: '1.3rem' },
                                    textShadow: '2px 2px 0px #000, -1px -1px 0px #000',
                                }}
                            >
                                English cat
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    color: '#FFF44F',
                                    fontWeight: 700,
                                    fontSize: { xs: '1rem', sm: '1.3rem' },
                                    marginLeft: 1,
                                }}
                            >
                                (v0.7)
                            </Typography>
                        </Typography>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
};
