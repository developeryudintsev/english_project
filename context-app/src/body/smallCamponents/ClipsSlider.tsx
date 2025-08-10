import { useState } from "react";
import { Box, Skeleton } from "@mui/material";

export const clips = [
    'https://vk.com/video_ext.php?oid=885405802&id=456239205&hd=2',
    'https://vk.com/video_ext.php?oid=885405802&id=456239204',
    'https://vk.com/video_ext.php?oid=885405802&id=456239202&hd=2&autoplay=1',
    "https://vk.com/video_ext.php?oid=885405802&id=456239185&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239184&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239183&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239180&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239179&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239178&hd=2",
    "https://vk.com/video_ext.php?oid=885405802&id=456239177&hd=2",
];

export const ClipsSlider = () => {
    const [page, setPage] = useState(0);
    const visibleCount = 4;
    const maxPage = clips.length - visibleCount;
    const [loaded, setLoaded] = useState(Array(visibleCount).fill(false));

    const changePage = (newPage: number) => {
        setPage(newPage);
        setLoaded(Array(visibleCount).fill(false));
    };

    const handlePrev = () => {
        if (page > 0) changePage(page - 1);
    };
    const handleNext = () => {
        if (page < maxPage) changePage(page + 1);
    };

    const visibleClips = clips.slice(page, page + visibleCount);

    const handleLoad = (i: number) => {
        setLoaded(prev => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: 600,
                height: 250,              // фиксированная высота контейнера
                margin: "0 auto",
                overflow: "hidden",       // убираем скроллы
            }}
        >
            <button
                onClick={handlePrev}
                disabled={page === 0}
                style={{
                    fontSize: 24,
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    background: "none",
                    border: "none",
                    userSelect: "none",
                    height: 32,
                    width: 32,
                    color: "#000",
                }}
                aria-label="Previous"
            >
                {"<"}
            </button>

            {visibleClips.map((clip, i) => (
                <Box
                    key={clip}
                    sx={{
                        position: "relative",
                        width: 120,
                        height: 240,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',      // видео не выходит за рамки блока
                        margin: '10px 0',
                    }}
                >
                    {!loaded[i] && (
                        <Skeleton
                            variant="rectangular"
                            width={260}
                            height={480}
                            sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                        />
                    )}
                    <iframe
                        src={clip}
                        width={240}
                        height={480}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`clip-${page + i}`}
                        onLoad={() => handleLoad(i)}
                        style={{
                            display: "block",
                            position: "relative",
                            transform: 'scale(0.5)',          // масштаб видео
                            transformOrigin: 'center',
                            zIndex: 0,
                            pointerEvents: loaded[i] ? "auto" : "none" // чтоб скелетон был кликабельным
                        }}
                    />
                </Box>
            ))}

            <button
                onClick={handleNext}
                disabled={page === maxPage}
                style={{
                    fontSize: 24,
                    cursor: page === maxPage ? "not-allowed" : "pointer",
                    background: "none",
                    border: "none",
                    userSelect: "none",
                    height: 32,
                    width: 32,
                    color: "#000",
                }}
                aria-label="Next"
            >
                {">"}
            </button>
        </Box>
    );
};
