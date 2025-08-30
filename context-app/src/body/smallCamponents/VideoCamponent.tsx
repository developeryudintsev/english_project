import {useState} from "react";
import {Box, Collapse, IconButton, Paper, Typography} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {ClipsSlider} from "./ClipsSlider";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type VideoComponentType = {
    toggle: boolean,
    setToggle: (toggleVC: boolean) => void
    openTheory: (theory: boolean) => void;
    setShowPractice: (showPractice: boolean) => void
    setToggleVideo: (theory: boolean) => void;
}
export type changeType='утвердительное'|'вопросительное'|'отрицательное'
export const VideoComponent = ({toggle,setToggle,openTheory, setShowPractice,setToggleVideo}: VideoComponentType) => {
    const [type, setType] = useState<changeType>('утвердительное');
    const toggleVideo = (toggle: boolean) => {
        setToggle(toggle)
    }

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
                <Typography sx={{color: '#FFF44F', pr: {xs: 4, sm: 0}, cursor: "pointer",}}  onClick={() => toggleVideo(!toggle)}>Выбери тип предложения:</Typography>
                <FormControl
                    sx={{
                        flexGrow: 1,
                        minWidth: 160,
                        marginLeft: '0px',
                    }}
                    size="small"
                >
                    <Select
                        value={type}
                        onChange={(e) =>
                            setType(e.target.value as changeType)
                        }
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select tense' }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            width: '100%',
                            margin:1
                        }}
                    >
                        <MenuItem value="утвердительное">утвердительное</MenuItem>
                        <MenuItem value="вопросительное">вопросительное</MenuItem>
                        <MenuItem value="отрицательное">отрицательное</MenuItem>
                    </Select>
                </FormControl>
                <Box
                    sx={{
                        mt: 0,
                        overflowX: "auto",
                        width: '100%',
                        maxWidth: '980px',
                    }}
                >
                    <ClipsSlider
                        type={type} setToggle={setToggle}
                        setShowPractice={setShowPractice}
                        toggle={toggle}
                        setToggleVideo={setToggleVideo}
                        openTheory={openTheory}
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
