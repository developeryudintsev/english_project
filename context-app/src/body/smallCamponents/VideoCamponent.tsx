import { useState } from "react";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ClipsSlider } from "./ClipsSlider";

export const VideoComponent = () => {
    const [toggle, setToggle] = useState(false);
    const toggleTheory = () => setToggle((prev) => !prev);

    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                position: "relative",
                width: "100%",
                maxWidth: '600px',
                margin: "0 auto",
                marginBottom: 2,
                textAlign: "center",
                backgroundColor: "#444447",
                transition: "all 0.3s ease",
            }}
        >
            <IconButton
                onClick={toggleTheory}
                sx={{color: '#FFF44F', position: "absolute", top: 8, right: 8 }}
                size="small"
            >
                <InfoOutlinedIcon />
            </IconButton>

            <Collapse in={toggle}>
                <Typography sx={{color:'#FFF44F'}}>Смотри наше видео прямо сейчас:</Typography>

                <Box
                    sx={{
                        mt: 2,
                        overflowX: "auto",
                    }}
                >
                    <ClipsSlider />
                </Box>
            </Collapse>

            {!toggle && (
                <span
                    onClick={toggleTheory}
                    style={{
                        cursor: "pointer",
                        fontFamily: "Roboto, sans-serif",
                        color:'#FFF44F'
                    }}
                >
          Видео для практики
        </span>
            )}
        </Paper>
    );
};
