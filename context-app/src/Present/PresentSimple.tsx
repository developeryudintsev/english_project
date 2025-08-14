import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export const PresentSimple = () => {
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
                    my: 1
                }}
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
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>He любит</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>He loves</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>He does not (doesn't) love</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>Does he love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>She любит</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>She loves</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>She doesn't love</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>Does she love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>It любит</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>It loves</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>It doesn't love</TableCell>
                            <TableCell sx={{ backgroundColor: 'red', color: '#fff' }}>Does it love?</TableCell>
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
