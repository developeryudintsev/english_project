import  {useEffect, useRef, useState} from "react";
import {Box, Button, Skeleton} from "@mui/material";

export const clipsReverse = [
    "https://vk.com/video_ext.php?oid=885405802&id=456239214&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239210&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239209&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239208&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239205&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239204&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239202&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239187&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239185&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239184&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239183&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239180&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239179&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239178&hd=2&autoplay=0",
    "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2&autoplay=0",
];
export const clips = clipsReverse.reverse();

type ClipsSliderType = {
    show: boolean;
    setShowPractice: (toggle: boolean) => void;
    toggle:boolean
};

export const ClipsSlider = ({ show, setShowPractice,toggle }: ClipsSliderType) => {

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
    const maxPage = Math.max(0, clips.length - visibleCount);

    const [loaded, setLoaded] = useState<boolean[]>(() => Array(clips.length).fill(false));

    const [clipSources, setClipSources] = useState<string[]>(clips);

    // ресайз
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

    // следим за вкладкой
    useEffect(() => {
        const handleVisibility = () => {
            setClipSources((prev) =>
                prev.map((src) => {
                    const url = new URL(src);
                    url.searchParams.set("autoplay", document.hidden ? "0" : "1");
                    return url.toString();
                })
            );
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () =>
            document.removeEventListener("visibilitychange", handleVisibility);
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

    const visibleClips = clipSources.slice(page, page + visibleCount);

    let gobackFoo = () => {
        if (show === true) {
            setShowPractice(false);
        } else {
            console.log("no");
        }
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
                onClick={() => setPage((p) => Math.max(0, p - 1))}
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
                                        src={toggle==true?clip:''}
                                        width={ORIGINAL_W}
                                        height={ORIGINAL_H}
                                        frameBorder={0}
                                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                        allowFullScreen
                                        title={`${clip}-${absIndex}`}
                                        onLoad={() => handleLoad(absIndex)}
                                        onPlay={() => console.log("Видео запущено")}
                                        onPause={() => console.log("Видео на паузе")}
                                        style={{
                                            display: "block",
                                            border: 0,
                                            pointerEvents: isLoaded ? "auto" : "none",
                                        }}
                                    />
                                </div>
                            </Box>

                            {/* Кнопка */}
                            {show && (
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
                            )}
                        </Box>
                    );
                })}
            </Box>

            <button
                aria-label="next"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
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