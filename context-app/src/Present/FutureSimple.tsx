import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
type PropsType = {
    toggleTheory: () => void;
};
export const FutureSimple = (props:PropsType) => {
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
                🟢 3. Future Simple – будущее простое время
            </Typography>

            <Typography fontWeight="bold" sx={{ color: '#FFF44F', width: '100%', maxWidth: 800, textAlign: 'center', my: 1 }}>
                Когда используется:
            </Typography>

            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: 800, my: 2 }}>
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
                        <TableRow>
                            <TableCell>Состояния и чувства</TableCell>
                            <TableCell>She will love chocolate.</TableCell>
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
                            <TableCell>Я буду любить</TableCell>
                            <TableCell>I will love</TableCell>
                            <TableCell>I will not (won't) love</TableCell>
                            <TableCell>Will I love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Он будет любить</TableCell>
                            <TableCell>He will love</TableCell>
                            <TableCell>He will not (won't) love</TableCell>
                            <TableCell>Will he love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Она будет любить</TableCell>
                            <TableCell>She will love</TableCell>
                            <TableCell>She won't love</TableCell>
                            <TableCell>Will she love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Оно будет любить</TableCell>
                            <TableCell>It will love</TableCell>
                            <TableCell>It won't love</TableCell>
                            <TableCell>Will it love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Мы будем любить</TableCell>
                            <TableCell>We will love</TableCell>
                            <TableCell>We won't love</TableCell>
                            <TableCell>Will we love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ты будешь любить</TableCell>
                            <TableCell>You will love</TableCell>
                            <TableCell>You won't love</TableCell>
                            <TableCell>Will you love?</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Они будут любить</TableCell>
                            <TableCell>They will love</TableCell>
                            <TableCell>They won't love</TableCell>
                            <TableCell>Will they love?</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
