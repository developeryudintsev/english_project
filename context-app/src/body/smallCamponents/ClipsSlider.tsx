import { useEffect, useRef, useState, useMemo } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import type { changeType } from "./VideoCamponent";

export const clipsReverse: Record<changeType, string[]> = {
    'утвердительное': [
        "https://vk.com/video_ext.php?oid=885405802&id=456239187&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239185&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239184&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239183&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239180&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239179&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239178&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2&autoplay=0",
    ],
    'вопросительное': [
        "https://vk.com/video_ext.php?oid=885405802&id=456239214&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239210&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239209&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239208&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239205&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239204&hd=2&autoplay=0",
        "https://vk.com/video_ext.php?oid=885405802&id=456239202&hd=2&autoplay=0"
    ],
    'отрицательное': [
        "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2&autoplay=0",
    ]
};

type ClipsSliderType = {
    type: changeType;
    setToggle:(toggle: boolean)=>void,
    setShowPractice:(showPractice: boolean)=>void,
    toggle: boolean;
    setToggleVideo: (theory: boolean) => void;
    openTheory: (theory: boolean) => void;
};

export const ClipsSlider = ({ type,setToggle, setShowPractice, toggle,setToggleVideo,openTheory }: ClipsSliderType) => {
    const sourceList = useMemo(() => clipsReverse[type].slice().reverse(), [type]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const ORIGINAL_W = 240;
    const ORIGINAL_H = 480;
    const GAP = 12;
    const ARROW_SIZE = 64;
    const SCALE = 0.8;
    const MAX_VISIBLE = 4;
    const MIN_VISIBLE = 1;
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [page, setPage] = useState<number>(0);
    const [clipSources, setClipSources] = useState<string[]>(sourceList);
    const [loaded, setLoaded] = useState<boolean[]>(Array(sourceList.length).fill(false));
    useEffect(() => {
        setClipSources(sourceList);
        setLoaded(Array(sourceList.length).fill(false));
        setPage(0);
    }, [sourceList]);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 620) setVisibleCount(MIN_VISIBLE);
            else if (width < 820) setVisibleCount(2);
            else if (width < 1050) setVisibleCount(3);
            else setVisibleCount(MAX_VISIBLE);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const handleVisibility = () => {
            setClipSources(prev =>
                prev.map(src => {
                    const url = new URL(src);
                    url.searchParams.set("autoplay", document.hidden ? "0" : "1");
                    return url.toString();
                })
            );
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);
    const maxPage = Math.max(0, clipSources.length - visibleCount);
    useEffect(() => {
        if (page > maxPage) setPage(maxPage);
    }, [visibleCount, maxPage, page]);
    const handleLoad = (absIndex: number) => {
        setLoaded(prev => {
            if (prev[absIndex]) return prev;
            const copy = [...prev];
            copy[absIndex] = true;
            return copy;
        });
    };
    const visibleClips = clipSources.slice(page, page + visibleCount);
    const gobackFoo = () => {
        openTheory(false)
         setShowPractice(true);
        setToggle(false)
        setToggleVideo(true);
    };

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: `${GAP}px`,
                boxSizing: "border-box",
                px: 1,
                py: 2,
            }}
        >
            <button
                aria-label="prev"
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                    position: "absolute",
                    left: 0,
                    top: "35%",
                    transform: "translateY(-50%)",
                    width: ARROW_SIZE,
                    height: ARROW_SIZE,
                    fontSize: 90,
                    background: "none",
                    border: "none",
                    color: "#FFF44F",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                }}
            >
                ‹
            </button>

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
                    const isLoaded = loaded[absIndex];

                    return (
                        <Box
                            key={`${type}-${clip}-${absIndex}`}
                            sx={{
                                width: ORIGINAL_W * SCALE,
                                height: ORIGINAL_H * SCALE + 56,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                flexShrink: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    width: ORIGINAL_W * SCALE,
                                    height: ORIGINAL_H * SCALE,
                                    position: "relative",
                                    overflow: "hidden",
                                    borderRadius: 1,
                                    background: "#000",
                                    boxShadow: 3,
                                }}
                            >
                                {/* Skeleton + надпись */}
                                {!isLoaded && (
                                    <Box
                                        sx={{
                                            width: ORIGINAL_W,
                                            height: ORIGINAL_H,
                                            transform: `scale(${SCALE})`,
                                            transformOrigin: "top left",
                                            position: "absolute",
                                            inset: 0,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Skeleton
                                            variant="rectangular"
                                            width={ORIGINAL_W}
                                            height={ORIGINAL_H}
                                            animation="wave"
                                            sx={{
                                                backgroundColor: "rgba(255,255,255,0.06)",
                                                borderRadius: 1,
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "1rem",
                                                zIndex: 3,
                                            }}
                                        >
                                            <Typography variant="body1">Загрузка...</Typography>
                                        </Box>
                                    </Box>
                                )}

                                <div
                                    style={{
                                        width: ORIGINAL_W,
                                        height: ORIGINAL_H,
                                        transform: `scale(${SCALE})`,
                                        transformOrigin: "top left",
                                    }}
                                >
                                    <iframe
                                        src={toggle ? clip : ""}
                                        width={ORIGINAL_W}
                                        height={ORIGINAL_H}
                                        frameBorder={0}
                                        allow="autoplay=0;mute=1; encrypted-media; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={`${clip}-${absIndex}`}
                                        onLoad={() => handleLoad(absIndex)}
                                        style={{
                                            display: "block",
                                            border: 0,
                                            pointerEvents: isLoaded ? "auto" : "none",
                                        }}
                                    />
                                </div>
                            </Box>

                            {/*{show && (*/}
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={gobackFoo}
                                    sx={{
                                        mt: 0.5,
                                        backgroundColor: "#FFF44F",
                                        color: "black",
                                        textTransform: "none",
                                        width: "90%",
                                        height:'45px'
                                    }}
                                >
                                    ПРАКТИКА
                                </Button>
                            {/*)}*/}
                        </Box>
                    );
                })}
            </Box>

            {/* Next */}
            <button
                aria-label="next"
                onClick={() => setPage(p => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                style={{
                    position: "absolute",
                    right: 0,
                    top: "35%",
                    transform: "translateY(-50%)",
                    width: ARROW_SIZE,
                    height: ARROW_SIZE,
                    fontSize: 90,
                    background: "none",
                    border: "none",
                    color: "#FFF44F",
                    cursor: page === maxPage ? "not-allowed" : "pointer",
                }}
            >
                ›
            </button>
        </Box>
    );
};
