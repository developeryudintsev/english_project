import {Collapse, IconButton, Paper} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type PropsType = {
    time: 'Present'|"Past"|"Future",
    thorium: boolean,
    toggleTheory: () => void,
    getTheoryComponent: () => React.ReactNode
}

export const TheoryComponent = (props: PropsType) => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                position: 'relative',
                width: '100%',
                maxWidth: '600px',
                marginBottom: 0,
                textAlign: 'center',
                backgroundColor:'#444447',
                transition: 'all 0.3s ease',
            }}
        >
            <IconButton
                onClick={props.toggleTheory}
                sx={{color: '#FFF44F', position: 'absolute', top: 8, right: 8 }}
                size="small"
            >
                <InfoOutlinedIcon />
            </IconButton>

            <Collapse in={props.thorium}>
                {props.getTheoryComponent()}
            </Collapse>

            {!props.thorium && (
                <span
                    onClick={props.toggleTheory}
                    style={{color:'#FFF44F', cursor: 'pointer', fontFamily: 'Roboto, sans-serif' }}
                >
                    Теория – {props.time} Simple
                </span>
            )}
        </Paper>
    );
};
