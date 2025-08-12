import {useEffect, useState} from "react";
import { Box, Collapse, IconButton, Paper, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ClipsSlider } from "./ClipsSlider";
type VideoComponentType={
    show:boolean,
    setShowPractice:()=>void,
}
export const VideoComponent = ({show,setShowPractice}:VideoComponentType) => {
    const [toggle, setToggle] = useState(false);
    const toggleVideo = (toggle:boolean) => setToggle(toggle);
    useEffect(()=>{
        if(!show){
            toggleVideo(false)
        }
    },[show])
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
                onClick={()=>toggleVideo(!toggle)}
                sx={{color: '#FFF44F', position: "absolute", top: 8, right: 8 }}
                size="small"
            >
                <InfoOutlinedIcon />
            </IconButton>

            <Collapse in={toggle}>
                <Typography sx={{color:'#FFF44F'}}>Смотри наше видео прямо сейчас:</Typography>

                <Box
                    sx={{
                        mt: 0,
                        overflowX: "auto",
                    }}
                >
                    <ClipsSlider show={show} setShowPractice={setShowPractice} />
                </Box>
            </Collapse>

            {!toggle && (
                <span
                    onClick={()=>toggleVideo(!toggle)}
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



// import React, { useRef, useState, useEffect } from "react";
// import { Box, Skeleton } from "@mui/material";
//
// export const clipsReverse = [
//     "https://vk.com/video_ext.php?oid=885405802&id=456239205&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239204",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239202&hd=2&autoplay=1",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239185&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239184&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239183&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239180&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239179&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239178&hd=2",
//     "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2",
// ];
// export const clips = clipsReverse.reverse();
//
// export const ClipsSlider: React.FC = () => {
//     const containerRef = useRef<HTMLDivElement | null>(null);
//
//     const ORIGINAL_W = 240;
//     const ORIGINAL_H = 480;
//     const GAP = 12;
//     const ARROW_SIZE = 64;
//     const SCALE = 0.4; // фиксированный масштаб
//     const MAX_VISIBLE = 4; // макс видео на широком экране
//     const MIN_VISIBLE = 1; // минимум видео при узком экране
//
//     // Теперь управляем visibleCount динамически
//     const [visibleCount, setVisibleCount] = useState(4);
//     const [page, setPage] = useState(0);
//
//     const maxPage = Math.max(0, clips.length - visibleCount);
//     const [loaded, setLoaded] = useState<boolean[]>(Array(visibleCount).fill(false));
//
//     // При ресайзе меняем visibleCount в зависимости от ширины окна
//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;
//             if (width < 630) {
//                 setVisibleCount(3);
//                 console.log(3)
//             }
//             if(width < 570){
//                 setVisibleCount(2);
//                 console.log(2)
//             }
//             if(width < 470){
//                 setVisibleCount(MIN_VISIBLE);
//                 console.log(MIN_VISIBLE)
//             }
//             if(width >630){
//                 setVisibleCount(MAX_VISIBLE);
//             }
//         };
//
//         handleResize(); // вызовем сразу для начального значения
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);
//
//     // Сбрасываем loaded при смене страницы или visibleCount
//     useEffect(() => {
//         setLoaded(Array(visibleCount).fill(false));
//         // при смене visibleCount стоит сбросить и страницу, чтобы избежать вылезания за пределы
//         setPage(0);
//     }, [visibleCount]);
//
//     const handleLoad = (index: number) => {
//         setLoaded((prev) => {
//             const copy = [...prev];
//             copy[index] = true;
//             return copy;
//         });
//     };
//
//     const visibleClips = clips.slice(page, page + visibleCount);
//
//     return (
//         <Box
//             ref={containerRef}
//             sx={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: `${GAP}px`,
//                 boxSizing: "border-box",
//                 px: 1,
//                 py: 2,
//             }}
//         >
//             <button
//                 aria-label="prev"
//                 onClick={() => setPage((p) => Math.max(0, p - 1))}
//                 disabled={page === 0}
//                 style={{
//                     width: ARROW_SIZE,
//                     height: ARROW_SIZE,
//                     fontSize: 28,
//                     background: "none",
//                     border: "none",
//                     color: "#FFF44F",
//                     cursor: page === 0 ? "not-allowed" : "pointer",
//                     flexShrink: 0,
//                 }}
//             >
//                 ‹
//             </button>
//
//             <Box
//                 sx={{
//                     display: "flex",
//                     gap: `${GAP}px`,
//                     alignItems: "flex-start",
//                     width: visibleCount * (ORIGINAL_W * SCALE + GAP) - GAP,
//                     overflowX: "auto",
//                     scrollbarWidth: "none",
//                     msOverflowStyle: "none",
//                     "&::-webkit-scrollbar": {
//                         display: "none",
//                     },
//                     flexShrink: 0,
//                     height: ORIGINAL_H * SCALE,
//                 }}
//             >
//                 {visibleClips.map((clip, idx) => (
//                     <Box
//                         key={clip}
//                         sx={{
//                             width: ORIGINAL_W * SCALE,
//                             height: ORIGINAL_H * SCALE,
//                             overflow: "hidden",
//                             position: "relative",
//                             borderRadius: 1,
//                             background: "#000",
//                             boxShadow: 3,
//                             flexShrink: 0,
//                         }}
//                     >
//                         {!loaded[idx] && (
//                             <Skeleton
//                                 variant="rectangular"
//                                 width={ORIGINAL_W * SCALE}
//                                 height={ORIGINAL_H * SCALE}
//                                 animation="wave"
//                                 sx={{
//                                     position: "absolute",
//                                     left: 0,
//                                     top: 0,
//                                     zIndex: 0,
//                                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                                     borderRadius: 1,
//                                 }}
//                             />
//                         )}
//                         <div
//                             style={{
//                                 width: ORIGINAL_W,
//                                 height: ORIGINAL_H,
//                                 transform: `scale(${SCALE})`,
//                                 transformOrigin: "top left",
//                                 willChange: "transform",
//                                 pointerEvents: "none",
//                             }}
//                         >
//                             <iframe
//                                 src={clip}
//                                 width={ORIGINAL_W}
//                                 height={ORIGINAL_H}
//                                 frameBorder={0}
//                                 allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
//                                 allowFullScreen
//                                 title={`clip-${page + idx}`}
//                                 onLoad={() => handleLoad(idx)}
//                                 style={{
//                                     display: "block",
//                                     border: 0,
//                                     pointerEvents: loaded[idx] ? "auto" : "none",
//                                     zIndex: 3,
//                                 }}
//                             />
//                         </div>
//                     </Box>
//                 ))}
//             </Box>
//
//             <button
//                 aria-label="next"
//                 onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
//                 disabled={page === maxPage}
//                 style={{
//                     width: ARROW_SIZE,
//                     height: ARROW_SIZE,
//                     fontSize: 28,
//                     background: "none",
//                     border: "none",
//                     color: "#FFF44F",
//                     cursor: page === maxPage ? "not-allowed" : "pointer",
//                     flexShrink: 0,
//                 }}
//             >
//                 ›
//             </button>
//         </Box>
//     );
// };