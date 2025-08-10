import {Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

export const FutureSimple = () => {
    return (
        <Box>
            <Typography  variant="body1"
                         sx={{color: '#FFF44F',
                             fontWeight: 500,minWidth: 100 ,margin:'10px', fontFamily: 'Roboto, sans-serif',
                             fontSize: { xs: '0.75rem', sm: '1rem' },
                         }}>🟢 3. Future Simple – будущее простое время</Typography>

            <Typography mt={2} sx={{color: '#FFF44F'}} fontWeight="bold">Когда используется:</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginY: 2 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Спонтанные решения</TableCell>
                            <TableCell>I’ll call him now.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Обещания, предсказания, надежды</TableCell>
                            <TableCell>It will rain tomorrow.</TableCell>
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
                            <TableCell>Subject + will + V₁</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное (-)</TableCell>
                            <TableCell>Subject + will not (won’t) + V₁</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное (?)</TableCell>
                            <TableCell>Will + Subject + V₁?</TableCell>
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
                            <TableCell>I will help you with the project.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Отрицательное</TableCell>
                            <TableCell>She won’t be late.</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Вопросительное</TableCell>
                            <TableCell>Will they come to the party?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
