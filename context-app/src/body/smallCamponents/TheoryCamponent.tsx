import React from 'react';
import { Collapse, IconButton, Paper, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type PropsType = {
    time: 'Present' | 'Past' | 'Future';
    thorium: boolean;
    toggleTheory:(theory:boolean) => void;
    getTheoryComponent: (toggleTheory:(theory:boolean) => void) => React.ReactNode;
};

export const TheoryComponent = (props: PropsType) => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: '10px 16px', // оставляем padding для толщины блока
                position: 'relative',
                width: '95%',
                maxWidth: '980px', // сохраняем максимальную ширину
                marginBottom: 0,
                textAlign: 'center',
                backgroundColor: '#444447',
                transition: 'all 0.3s ease',
                overflowX: 'auto',
            }}
        >
            <IconButton
                onClick={()=>props.toggleTheory(!props.thorium)}
                sx={{ color: '#FFF44F', position: 'absolute', top: 10, right: 8 }}
                size="small"
            >
                <InfoOutlinedIcon />
            </IconButton>

            <Collapse in={props.thorium}>
                <Box
                    sx={{
                        display: 'block',
                        width: '100%',
                        px: { xs: 0, sm: 0 },
                    }}
                >
                    {props.getTheoryComponent(props.toggleTheory)}
                </Box>
            </Collapse>

            {!props.thorium && (
                <span
                    onClick={()=>props.toggleTheory(!props.thorium)}
                    style={{
                        color: '#FFF44F',
                        cursor: 'pointer',
                        fontFamily: 'Roboto, sans-serif',
                        display: 'block',
                        padding: '8px 0',
                    }}
                >
                    Теория – {props.time} Simple
                </span>
            )}
        </Paper>
    );
};
