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
                        py: { xs: 1.5, sm: 1 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'space-between', sm: 'flex-start' },
                            width: '100%',
                            maxWidth: { sm: 'fit-content' },
                            order: { xs: 2, sm: 1 },
                            gap: 2,
                            px: { xs: 2, sm: 1 }, // общий отступ слева/справа
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: '#FFF44F', fontWeight: 500, flexShrink: 0,
                                ml: { xs: '5%', sm: 0 },     // можно регулировать сдвиг
                                mr: { xs: '5%', sm: 1 },
                            }}
                        >
                            Simple
                        </Typography>

                        <FormControl
                            sx={{
                                minWidth: 160,
                                flexGrow: { xs: 1, sm: 0 }, // растягиваем на мобилках
                                mr: { xs:'5%', sm: 0 },       // отступ справа для мобилок
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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'space-between', sm: 'flex-end' },
                            width: '100%',
                            maxWidth: { sm: 'fit-content' },
                            order: {xs: 1, sm: 2},
                            gap: 1,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#FFF44F',
                                fontWeight: 500,
                                flexGrow: { xs: 1, sm: 0 },
                            }}
                        >
                            English Practice cat v0.7
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
