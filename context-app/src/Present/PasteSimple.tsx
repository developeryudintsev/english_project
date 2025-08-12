import {Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

export const PastSimple = () => {
    return (
        <Box>
            <Typography variant="body1"
                        sx={{color: '#FFF44F',
                            fontWeight: 500,minWidth: 100 ,margin:'10px', fontFamily: 'Roboto, sans-serif',
                            fontSize: { xs: '0.75rem', sm: '1rem' },
                        }}>🔵 2. Past Simple – прошедшее простое время</Typography>

            <Typography mt={2} sx={{color: '#FFF44F'}}fontWeight="bold">Когда используется:</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginY: 2 }}>
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

            <Typography sx={{color: '#FFF44F'}} fontWeight="bold">Формула:</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginY: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Тип</TableCell>
                            <TableCell>Формула</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Утвердительное (+)</TableCell>
                            <TableCell>Subject + V₂ / -ed</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное (-)</TableCell>
                            <TableCell>Subject + did not + V₁</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное (?)</TableCell>
                            <TableCell>Did + Subject + V₁?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography sx={{color: '#FFF44F'}} fontWeight="bold">Примеры:</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginY: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Утвердительное</TableCell>
                            <TableCell>I loved</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное</TableCell>
                            <TableCell>I did not (didn't) love</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное</TableCell>
                            <TableCell>Did I love?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
