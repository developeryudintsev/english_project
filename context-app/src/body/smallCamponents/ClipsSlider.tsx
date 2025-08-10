import React, { useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";

export const clips = [
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

export const ClipsSlider: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const ORIGINAL_W = 240;
    const ORIGINAL_H = 480;
    const VISIBLE_COUNT = 4;
    const GAP = 12;
    const ARROW_SPACE = 64 * 2;

    const [page, setPage] = useState(0);
    const maxPage = Math.max(0, clips.length - VISIBLE_COUNT);

    const [scale, setScale] = useState(0.5);
    const [loaded, setLoaded] = useState<boolean[]>(
        Array(VISIBLE_COUNT).fill(false)
    );


    useEffect(() => {
        const calc = () => {
            const root = containerRef.current;
            if (!root) return;
            const cw = root.clientWidth;
            const totalGaps = GAP * (VISIBLE_COUNT - 1);
            const availableForVideos = Math.max(
                50,
                cw - ARROW_SPACE - totalGaps
            );
            const widthPerVideo = availableForVideos / VISIBLE_COUNT;
            let newScale = widthPerVideo / ORIGINAL_W;
            newScale = Math.min(newScale, 1);
            newScale = Math.max(newScale, 0.12);
            setScale(newScale);
        };

        calc();
        const ro = new (window as any).ResizeObserver(calc);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener("resize", calc);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", calc);
        };
    }, []);

    useEffect(() => {
        setLoaded(Array(VISIBLE_COUNT).fill(false));
    }, [page]);

    const handleLoad = (index: number) => {
        setLoaded((prev) => {
            const copy = [...prev];
            copy[index] = true;
            return copy;
        });
    };

    const visibleClips = clips.slice(page, page + VISIBLE_COUNT);

    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: `${GAP}px`,
                overflow: "hidden",
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
                    width: 64,
                    height: 64,
                    fontSize: 28,
                    background: "none",
                    border: "none",
                    color: "#FFF44F",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                }}
            >
                ‹
            </button>

            {/* Видео ряд */}
            <Box
                sx={{
                    display: "flex",
                    gap: `${GAP}px`,
                    alignItems: "flex-start",
                    height: ORIGINAL_H * scale,
                }}
            >
                {visibleClips.map((clip, idx) => (
                    <Box
                        key={clip}
                        sx={{
                            width: ORIGINAL_W * scale,
                            height: ORIGINAL_H * scale,
                            overflow: "hidden",
                            position: "relative",
                            borderRadius: 1,
                            background: "#000",
                            boxShadow: 3,
                        }}
                    >
                        {!loaded[idx] && (
                            <Skeleton
                                variant="rectangular"
                                width={ORIGINAL_W * scale}
                                height={ORIGINAL_H * scale}
                                animation="wave"  // анимация волны для видимой загрузки
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    zIndex: 2,
                                    backgroundColor: "rgba(255, 255, 255, 0.1)", // чуть светлее, чтобы отличался от чёрного
                                    borderRadius: 1,
                                }}
                            />
                        )}
                        <div
                            style={{
                                width: ORIGINAL_W,
                                height: ORIGINAL_H,
                                transform: `scale(${scale})`,
                                transformOrigin: "top left",
                                willChange: "transform",
                                pointerEvents: "none",
                            }}
                        >
                            <iframe
                                src={clip}
                                width={ORIGINAL_W}
                                height={ORIGINAL_H}
                                frameBorder={0}
                                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                title={`clip-${page + idx}`}
                                onLoad={() => handleLoad(idx)}
                                style={{
                                    display: "block",
                                    border: 0,
                                    pointerEvents: loaded[idx] ? "auto" : "none",
                                }}
                            />
                        </div>
                    </Box>
                ))}
            </Box>

            {/* Next */}
            <button
                aria-label="next"
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                style={{
                    width: 64,
                    height: 64,
                    fontSize: 28,
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
