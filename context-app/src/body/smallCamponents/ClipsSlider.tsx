import  {useEffect, useRef, useState} from "react";
import {Box, Button, Skeleton} from "@mui/material";

export const clipsReverse = [
    "https://vk.com/video_ext.php?oid=885405802&id=456239205&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239204",
    "https://vk.com/video_ext.php?oid=885405802&id=456239202&hd=2&autoplay=1",
    "https://vk.com/video_ext.php?oid=885405802&id=456239185&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239184&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239183&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239180&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239179&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239178&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2",
];
export const clips = clipsReverse.reverse();
type ClipsSliderType={
    show:boolean
    setShowPractice:(toggle:boolean)=>void
}
export const ClipsSlider = ({show,setShowPractice}:ClipsSliderType) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const ORIGINAL_W = 240;
    const ORIGINAL_H = 480;
    const GAP = 12;
    const ARROW_SIZE = 64;
    const SCALE = 0.4;
    const MAX_VISIBLE = 4;
    const MIN_VISIBLE = 1;

    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [page, setPage] = useState<number>(0);

    const maxPage = Math.max(0, clips.length - visibleCount);
    // хранить загрузку по абсолютному индексу (для всех клипов)
    const [loaded, setLoaded] = useState<boolean[]>(() => Array(clips.length).fill(false));

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 470) {
                setVisibleCount(MIN_VISIBLE);
            } else if (width < 570) {
                setVisibleCount(2);
            } else if (width < 630) {
                setVisibleCount(3);
            } else {
                setVisibleCount(MAX_VISIBLE);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (page > maxPage) setPage(maxPage);
    }, [visibleCount, maxPage, page]);

    const handleLoad = (absIndex: number) => {
        setLoaded((prev) => {
            if (prev[absIndex]) return prev;
            const copy = [...prev];
            copy[absIndex] = true;
            return copy;
        });
    };

    const visibleClips = clips.slice(page, page + visibleCount);
    let gobackFoo=()=>{
        if(show===true){
            setShowPractice(false)
        }else{
            console.log('no')
        }

    }
    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: `${GAP}px`,
                boxSizing: "border-box",
                px: 1,
                py: 2,
            }}
        >
            {/* Prev */}
            <button
                aria-label="prev"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                    width: ARROW_SIZE,
                    height: ARROW_SIZE,
                    fontSize: 28,
                    background: "none",
                    border: "none",
                    color: "#FFF44F",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    flexShrink: 0,
                }}
            >
                ‹
            </button>

            {/* Видео + кнопки (каждое видео в колонке: iframe сверху, кнопка снизу) */}
            <Box
                sx={{
                    display: "flex",
                    gap: `${GAP}px`,
                    alignItems: "flex-start",
                    width: visibleCount * (ORIGINAL_W * SCALE + GAP) - GAP,
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    flexShrink: 0,
                    height: ORIGINAL_H * SCALE + 56,
                }}
            >
                {visibleClips.map((clip, idx) => {
                    const absIndex = page + idx;
                    const isLoaded = Boolean(loaded[absIndex]);

                    return (
                        <Box
                            key={clip}
                            sx={{
                                width: ORIGINAL_W * SCALE,
                                height: ORIGINAL_H * SCALE + 56,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                overflow: "visible",
                                position: "relative",
                                flexShrink: 0,
                            }}
                        >
                            {/* video wrapper (scaled content) */}
                            <Box
                                sx={{
                                    width: ORIGINAL_W * SCALE,
                                    height: ORIGINAL_H * SCALE,
                                    overflow: "hidden",
                                    position: "relative",
                                    borderRadius: 1,
                                    background: "#000",
                                    boxShadow: 3,
                                }}
                            >
                                {!isLoaded && (
                                    <Skeleton
                                        variant="rectangular"
                                        width={ORIGINAL_W * SCALE}
                                        height={ORIGINAL_H * SCALE}
                                        animation="wave"
                                        sx={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            zIndex: 2,
                                            backgroundColor: "rgba(255,255,255,0.06)",
                                            borderRadius: 1,
                                        }}
                                    />
                                )}

                                <div
                                    style={{
                                        width: ORIGINAL_W,
                                        height: ORIGINAL_H,
                                        transform: `scale(${SCALE})`,
                                        transformOrigin: "top left",
                                        willChange: "transform",
                                    }}
                                >
                                    <iframe
                                        src={clip}
                                        width={ORIGINAL_W}
                                        height={ORIGINAL_H}
                                        frameBorder={0}
                                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={`clip-${absIndex}`}
                                        onLoad={() => handleLoad(absIndex)}
                                        style={{
                                            display: "block",
                                            border: 0,
                                            pointerEvents: isLoaded ? "auto" : "none",
                                        }}
                                    />
                                </div>
                            </Box>

                            {/* Кнопка Практика под видео */}
                            {show &&
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => gobackFoo()}
                                sx={{
                                    mt: 0.5,
                                    backgroundColor: "#FFF44F",
                                    color: "black",
                                    textTransform: "none",
                                    width: "90%",
                                }}
                            >
                                Практика
                            </Button>
                            }
                        </Box>
                    );
                })}
            </Box>

            {/* Next */}
            <button
                aria-label="next"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                style={{
                    width: ARROW_SIZE,
                    height: ARROW_SIZE,
                    fontSize: 28,
                    background: "none",
                    border: "none",
                    color: "#FFF44F",
                    cursor: page === maxPage ? "not-allowed" : "pointer",
                    flexShrink: 0,
                }}
            >
                ›
            </button>
        </Box>
    );
};
