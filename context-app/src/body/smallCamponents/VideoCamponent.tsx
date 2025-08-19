import {useEffect, useState} from "react";
import {Box, Collapse, IconButton, Paper, Typography} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {ClipsSlider} from "./ClipsSlider";

type VideoComponentType = {
    firstClick: boolean,
    setFirstClick: (firstClick:boolean) => void,
    open: boolean,
    show: boolean,
    setShowPractice: () => void,
}
export const VideoComponent = ({firstClick,setFirstClick,open, show, setShowPractice}: VideoComponentType) => {
    const [toggle, setToggle] = useState(false);
    const toggleVideo = (toggle: boolean) => {
        setToggle(toggle)
        setFirstClick(true)
    }
    useEffect(() => {
        if(firstClick===true){
        if (open) {
            toggleVideo(true)
        }
        }
    }, [open,firstClick])
    useEffect(() => {
        if (!show) {
            toggleVideo(false)
        }
    }, [show])
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                position: 'relative',
                width: '95%',
                maxWidth: '980px',
                marginBottom: 0,
                textAlign: 'center',
                backgroundColor: '#444447',
                transition: 'all 0.3s ease',
            }}
        >
            <IconButton
                onClick={() => toggleVideo(!toggle)}
                sx={{color: '#FFF44F', position: "absolute", top: 8, right: 8}}
                size="small"
            >
                <InfoOutlinedIcon/>
            </IconButton>

            <Collapse in={toggle}>
                <Typography sx={{color: '#FFF44F', pr: {xs: 4, sm: 0},}}>Смотри наше видео прямо сейчас:</Typography>

                <Box
                    sx={{
                        mt: 0,
                        overflowX: "auto",
                        width: '100%',
                        maxWidth: '980px',
                    }}
                >
                    <ClipsSlider
                        show={show} setShowPractice={setShowPractice} toggle={toggle}
                    />
                </Box>
            </Collapse>

            {!toggle && (
                <span
                    onClick={() => toggleVideo(!toggle)}
                    style={{
                        cursor: "pointer",
                        fontFamily: "Roboto, sans-serif",
                        color: '#FFF44F'
                    }}
                >
          Видео для практики
        </span>
            )}
        </Paper>
    );
};
