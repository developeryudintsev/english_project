import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

type PropsType = {
    thorium:boolean;
    toggleTheory:(theory:boolean) => void;
};

export const PresentSimple = ({ toggleTheory,thorium }: PropsType) => {
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
                    fontWeight="bold"
                    sx={{
                        color: "#FFF44F",
                        fontWeight: 500,
                        width: "100%",
                        maxWidth: '900px',
                        fontFamily: "Roboto, sans-serif",
                        fontSize: { xs: "1.1rem", sm: "1.3rem" },
                        textAlign: "center",
                        my: 0,
                        cursor: "pointer",
                        pr: { xs: 4, sm: 2.2 },
                        boxSizing: "border-box",
                    }}
                    onClick={()=>toggleTheory(!thorium)}
                >
                    1.PRESENT SIMPLE – НАСТОЯЩЕЕ ПРОСТОЕ ВРЕМЯ
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
                                    <TableCell sx={{ px: 1 }}>Отрицание</TableCell>
                                    <TableCell>Вопрос</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Я люблю</TableCell>
                                    <TableCell sx={{ px: '10%' }}>I love</TableCell>
                                    <TableCell sx={{ px: 1 }}>I do not (don't) love</TableCell>
                                    <TableCell>Do I love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Он любит</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: '10%' }}>He loves</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: 1 }}>
                                        He does not (doesn't) love
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Does he love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Она любит</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: '10%' }}>She loves</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: 1 }}>She doesn't love</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Does she love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Оно любит</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: '10%' }}>It loves</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000", px: 1 }}>It doesn't love</TableCell>
                                    <TableCell sx={{ backgroundColor: "#FFF44F", color: "#000" }}>Does it love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Мы любим</TableCell>
                                    <TableCell sx={{ px: '10%' }}>We love</TableCell>
                                    <TableCell sx={{ px: 1 }}>We don't love</TableCell>
                                    <TableCell>Do we love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Ты любишь</TableCell>
                                    <TableCell sx={{ px: '10%' }}>You love</TableCell>
                                    <TableCell sx={{ px: 1 }}>You don't love</TableCell>
                                    <TableCell>Do you love?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Они любят</TableCell>
                                    <TableCell sx={{ px: '10%' }}>They love</TableCell>
                                    <TableCell sx={{ px: 1 }}>They don't love</TableCell>
                                    <TableCell>Do they love?</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
    );
};
