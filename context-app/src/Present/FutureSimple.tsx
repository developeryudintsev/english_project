import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

type PropsType = {
    toggleTheory: () => void;
};

export const FutureSimple = ({ toggleTheory }: PropsType) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 600);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography
                variant="body1"
                sx={{
                    color: "#FFF44F",
                    fontWeight: 500,
                    width: "100%",
                    maxWidth: 800,
                    fontFamily: "Roboto, sans-serif",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                    textAlign: "center",
                    my: 1,
                    cursor: "pointer",
                }}
                onClick={toggleTheory}
            >
                3. Future Simple – будущее простое время
            </Typography>

            <Typography
                fontWeight="bold"
                sx={{ color: "#FFF44F", width: "100%", maxWidth: 800, textAlign: "center", my: 1 }}
            >
                Когда используется:
            </Typography>

            <Box sx={{ width: "100%", maxWidth: 800, px: isMobile ? 0 : 2 }}>
                <TableContainer component={Paper} sx={{ my: 2 }}>
                    <Table size="small">
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
            </Box>

            <Typography
                fontWeight="bold"
                sx={{ color: "#FFF44F", width: "100%", maxWidth: 800, textAlign: "center" }}
            >
                Формула:
            </Typography>

            <Box sx={{ width: "100%", maxWidth: 800, px: isMobile ? 0 : 2 }}>
                <TableContainer component={Paper} sx={{ my: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Русский</TableCell>
                                <TableCell sx={{ px: 0 }}>Английский (утверждение)</TableCell>
                                <TableCell sx={{ px: '5%' }}>Отрицание</TableCell>
                                <TableCell>Вопрос</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Я буду любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>I will love</TableCell>
                                <TableCell sx={{ px: 1 }}>I will not (won't) love</TableCell>
                                <TableCell>Will I love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Он будет любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>He will love</TableCell>
                                <TableCell sx={{ px: 1 }}>He will not (won't) love</TableCell>
                                <TableCell>Will he love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Она будет любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>She will love</TableCell>
                                <TableCell sx={{ px: 1 }}>She won't love</TableCell>
                                <TableCell>Will she love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Оно будет любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>It will love</TableCell>
                                <TableCell sx={{ px: 1 }}>It won't love</TableCell>
                                <TableCell>Will it love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Мы будем любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>We will love</TableCell>
                                <TableCell sx={{ px: 1 }}>We won't love</TableCell>
                                <TableCell>Will we love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ты будешь любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>You will love</TableCell>
                                <TableCell sx={{ px: 1 }}>You won't love</TableCell>
                                <TableCell>Will you love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Они будут любить</TableCell>
                                <TableCell sx={{ px: '5%' }}>They will love</TableCell>
                                <TableCell sx={{ px: 1 }}>They won't love</TableCell>
                                <TableCell>Will they love?</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
