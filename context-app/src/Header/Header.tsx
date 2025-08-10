import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {ArrowForwardIos} from '@mui/icons-material';
import Select from '@mui/material/Select';
import type {timeType} from '../App';
import cat from '../picture/cat.JPG';

type HeaderType={
    time:timeType,
    setTime:(time:timeType)=>void
    handleChange:(event: timeType)=>void
}
export const Header = (props:HeaderType) => {
    return (
        <AppBar position="static" sx={{backgroundColor:'#444447'}}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexWrap: 'wrap',

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            mt: { xs: 1, md: 0 },
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ color: '#FFF44F', fontWeight: 500 }}
                        >
                            Simple
                        </Typography>
                        <FormControl sx={{ minWidth: 160 }} size="small">
                            <Select
                                value={props.time}
                                onChange={(e)=>props.handleChange(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select tense' }}
                                sx={{ backgroundColor: 'white', borderRadius: 1 }}
                            >
                                <MenuItem value="Present">Present</MenuItem>
                                <MenuItem value="Past">Past</MenuItem>
                                <MenuItem value="Future">Future</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ color:'#FFF44F', fontWeight: 500,minWidth: 100, fontFamily: 'Roboto, sans-serif' ,margin:'10px' }}
                        >
                            English Practice cat v0.3
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="Ссылка на наш сайт">
                            <a href="https://www.kiber-rus.ru/" target="_blank" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, color: 'inherit' }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#FFF44F',
                                        fontWeight: 500,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    Переходите на наш сайт
                                    <ArrowForwardIos sx={{ fontSize: 16 }} />
                                </Typography>
                                <Avatar
                                    alt="User Avatar"
                                    src={cat}
                                    sx={{
                                        border: '2px solid white',
                                        width: 40,
                                        height: 40,
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
