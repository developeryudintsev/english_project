import {Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

export const PresentSimple = () => {
    return (
        <Box>
            <Typography variant="body1"
                        sx={{color: '#FFF44F',
                            fontWeight: 500,minWidth: 100 ,margin:'10px', fontFamily: 'Roboto, sans-serif',
                            fontSize: { xs: '0.75rem', sm: '1rem' },
                        }}>✅ 1. Present Simple – настоящее простое время</Typography>

            <Typography mt={2} sx={{color: '#FFF44F'}} fontWeight="bold">Когда используется:</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginY: 2 }}>
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

            <Typography fontWeight="bold" sx={{color: '#FFF44F'}}>Формула:</Typography>
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
                            <TableCell>Subject + V₁ / V(s)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное (-)</TableCell>
                            <TableCell>Subject + do/does + not + V₁</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное (?)</TableCell>
                            <TableCell>Do/Does + Subject + V₁?</TableCell>
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
                            <TableCell>He loves</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное</TableCell>
                            <TableCell>He does not (doesn't) love</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное</TableCell>
                            <TableCell>Does he love?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
