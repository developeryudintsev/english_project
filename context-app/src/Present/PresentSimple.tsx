import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

type PropsType = {
    toggleTheory: () => void;
};

export const PresentSimple = (props:PropsType) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <Typography
                variant="body1"
                sx={{
                    color: '#FFF44F',
                    fontWeight: 500,
                    width: '100%',
                    maxWidth: 800,
                    fontFamily: 'Roboto, sans-serif',
                    fontSize: { xs: '0.75rem', sm: '1rem' },
                    textAlign: 'center',
                    my: 1,
                    cursor: 'pointer',
                }}
                onClick={()=>props.toggleTheory()}
            >
                ✅ 1. Present Simple – настоящее простое время
            </Typography>

            <Typography fontWeight="bold" sx={{ color: '#FFF44F', width: '100%', maxWidth: 800, textAlign: 'center', my: 1 }}>
                Когда используется:
            </Typography>

            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, my: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Регулярные действия</TableCell>
                            <TableCell>I go to school every day.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Факты и законы природы</TableCell>
                            <TableCell>The sun rises in the east.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Состояния и чувства</TableCell>
                            <TableCell>She likes chocolate.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography fontWeight="bold" sx={{ color: '#FFF44F', width: '100%', maxWidth: 800, textAlign: 'center' }}>
                Формула:
            </Typography>

            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, my: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Русский</TableCell>
                            <TableCell>Английский (утверждение)</TableCell>
                            <TableCell>Отрицание</TableCell>
                            <TableCell>Вопрос</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Я люблю</TableCell>
                            <TableCell>I love</TableCell>
                            <TableCell>I do not (don't) love</TableCell>
                            <TableCell>Do I love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>He любит</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>He loves</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>He does not (doesn't) love</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>Does he love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>She любит</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>She loves</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>She doesn't love</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>Does she love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>It любит</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>It loves</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>It doesn't love</TableCell>
                            <TableCell sx={{ backgroundColor: '#FFF44F', color: '#000000' }}>Does it love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Мы любим</TableCell>
                            <TableCell>We love</TableCell>
                            <TableCell>We don't love</TableCell>
                            <TableCell>Do we love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ты любишь</TableCell>
                            <TableCell>You love</TableCell>
                            <TableCell>You don't love</TableCell>
                            <TableCell>Do you love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Они любят</TableCell>
                            <TableCell>They love</TableCell>
                            <TableCell>They don't love</TableCell>
                            <TableCell>Do they love?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
