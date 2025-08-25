import React from "react";
import {Paper} from "@mui/material";

type ModalProps = {
    children: React.ReactNode
};
export const Modal: React.FC<ModalProps> = ({children }) => {

    return (
        <Paper
            elevation={6}
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "95%",
                maxWidth: "530px",
                backgroundColor: "#FFF44F",
                color: "#222",
                borderRadius: 2,
                fontFamily: "Roboto, sans-serif",
                zIndex: 1000,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
                overflow: "hidden",
            }}
        >
            {children}
        </Paper>
    );
};


// import React from "react";
// import {Box, Button, Paper, Typography} from "@mui/material";
// import {addQuestions, data} from "../Data/Data";
//
// type ModalProps = {
//     setToggelModal:(toggelModal:0|1|2)=>void
// };
// export const Modal: React.FC<ModalProps> = ({setToggelModal }) => {
//     const newData = () => {
//         const init = async () => {
//             await addQuestions(data, 'reload');
//         }
//         init()
//         setToggelModal(0)
//     }
//     return (
//         <Paper
//             elevation={6}
//             sx={{
//                 position: "fixed",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "95%",
//                 maxWidth: "530px",
//                 backgroundColor: "#FFF44F",
//                 color: "#222",
//                 borderRadius: 2,
//                 fontFamily: "Roboto, sans-serif",
//                 zIndex: 1000,
//                 boxShadow: "0px 6px 20px rgba(0,0,0,0.4)",
//                 overflow: "hidden",
//             }}
//         >
//             <Box
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#444447",
//                     color: "#fff",
//                     padding: "12px",
//                     position: "relative",
//                 }}
//             >
//                 <Typography
//                     variant="h6"
//                     sx={{
//                         fontWeight: "bold",
//                         textAlign: "center",
//                         color: '#FFF44F',
//                         width: "100%",
//                         px: 6,
//                     }}
//                 >
//                     Вы действительно хотите обнулить результат?
//                 </Typography>
//             </Box>
//             <Box sx={{
//                 padding: 2,
//                 display: "flex",
//                 flexDirection: "row",   // 👉 в строку
//                 justifyContent: "center", // 👉 по центру
//                 alignItems: "center",
//                 gap: 2, // 👉 отступ между кнопками
//                 width: "100%",
//             }}>
//                 <Button sx={{backgroundColor: "#444447",}}  onClick={() => setToggelModal(0)}>нет</Button>
//                 <Button sx={{backgroundColor: "#444447",}} onClick={()=>newData()}>да</Button>
//             </Box>
//
//         </Paper>
//     );
// };
