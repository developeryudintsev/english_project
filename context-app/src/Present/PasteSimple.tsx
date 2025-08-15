import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
type PropsType = {
    toggleTheory: () => void;
};
export const PastSimple = (props:PropsType) => {
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
                    cursor: 'pointer',
                    my: 1
                }}
                onClick={()=>props.toggleTheory()}
            >
                🔵 2. Past Simple – прошедшее простое время
            </Typography>

            <Typography fontWeight="bold" sx={{ color: '#FFF44F', width: '100%', maxWidth: 800, textAlign: 'center', my: 1 }}>
                Когда используется:
            </Typography>

            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, my: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Завершённые действия в прошлом</TableCell>
                            <TableCell>I visited London last year.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Последовательность событий</TableCell>
                            <TableCell>He entered the room, turned on the light, and sat down.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography fontWeight="bold" sx={{ color: '#FFF44F', width: '100%', maxWidth: 800, textAlign: 'center', my: 1 }}>
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
                            <TableCell>Я любил</TableCell>
                            <TableCell>I loved</TableCell>
                            <TableCell>I did not (didn't) love</TableCell>
                            <TableCell>Did I love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>He любил</TableCell>
                            <TableCell>He loved</TableCell>
                            <TableCell>He did not (didn't) love</TableCell>
                            <TableCell>Did he love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>She любила</TableCell>
                            <TableCell>She loved</TableCell>
                            <TableCell>She did not (didn't) love</TableCell>
                            <TableCell>Did she love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>It любило</TableCell>
                            <TableCell>It loved</TableCell>
                            <TableCell>It did not (didn't) love</TableCell>
                            <TableCell>Did it love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Мы любили</TableCell>
                            <TableCell>We loved</TableCell>
                            <TableCell>We did not love</TableCell>
                            <TableCell>Did we love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ты любил</TableCell>
                            <TableCell>You loved</TableCell>
                            <TableCell>You did not love</TableCell>
                            <TableCell>Did you love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Они любили</TableCell>
                            <TableCell>They loved</TableCell>
                            <TableCell>They did not love</TableCell>
                            <TableCell>Did they love?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};
