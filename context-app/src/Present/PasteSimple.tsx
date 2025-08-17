import { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

type PropsType = {
    toggleTheory: () => void;
};

export const PastSimple = ({ toggleTheory }: PropsType) => {
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
                2. Past Simple – прошедшее простое время
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
                                <TableCell sx={{ px: 1 }}>Английский (утверждение)</TableCell>
                                <TableCell sx={{ px: '5%' }}>Отрицание</TableCell>
                                <TableCell>Вопрос</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Я любил</TableCell>
                                <TableCell sx={{ px: '10%' }}>I loved</TableCell>
                                <TableCell sx={{ px: 1 }}>I did not (didn't) love</TableCell>
                                <TableCell>Did I love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>He любил</TableCell>
                                <TableCell sx={{ px: '10%' }}>He loved</TableCell>
                                <TableCell sx={{ px: 1 }}>He did not (didn't) love</TableCell>
                                <TableCell>Did he love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>She любила</TableCell>
                                <TableCell sx={{ px: '10%' }}>She loved</TableCell>
                                <TableCell sx={{ px: 1 }}>She did not (didn't) love</TableCell>
                                <TableCell>Did she love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>It любило</TableCell>
                                <TableCell sx={{ px: '10%' }}>It loved</TableCell>
                                <TableCell sx={{ px: 1 }}>It did not (didn't) love</TableCell>
                                <TableCell>Did it love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Мы любили</TableCell>
                                <TableCell sx={{ px: '10%' }}>We loved</TableCell>
                                <TableCell sx={{ px: 1 }}>We did not love</TableCell>
                                <TableCell>Did we love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ты любил</TableCell>
                                <TableCell sx={{ px: '10%' }}>You loved</TableCell>
                                <TableCell sx={{ px: 1 }}>You did not love</TableCell>
                                <TableCell>Did you love?</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Они любили</TableCell>
                                <TableCell sx={{ px: '10%' }}>They loved</TableCell>
                                <TableCell sx={{ px: 1 }}>They did not love</TableCell>
                                <TableCell>Did they love?</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
