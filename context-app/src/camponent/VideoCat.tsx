import React, { useEffect, useRef, useState } from "react";
type VideoCatProps = {
    src: string;
    toggelVideoCat: 0 | 1 | 2 | 3;
    setToggelVideoCatFoo: () => void;
    showCondition: boolean;
    size?: "small" | "medium" | "normal";
};

export const VideoCat: React.FC<VideoCatProps> = ({
                                                      src,
                                                      setToggelVideoCatFoo,
                                                      toggelVideoCat,
                                                      showCondition,
                                                      size = "normal",
                                                  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [responsiveSize, setResponsiveSize] = useState<"small" | "medium" | "normal">(size);

    // Следим за шириной экрана
    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth < 600) {
                setResponsiveSize("small");
            } else if (window.innerWidth < 900) {
                setResponsiveSize("medium");
            } else {
                setResponsiveSize("normal");
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    const sizePx = responsiveSize === "small" ? 60 : responsiveSize === "medium" ? 90 : 120;

    const handleCanPlay = () => {
        setLoaded(true);
    };

    // Загружаем видео сразу при монтировании
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [src]);

    // Запускаем только если showCondition === true
    useEffect(() => {
        if (videoRef.current) {
            if (showCondition && toggelVideoCat !== 0) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    }, [showCondition, toggelVideoCat]);

    return (
        <div style={{ position: "relative", width: sizePx, height: sizePx }}>
            {!loaded && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#222",
                        borderRadius: "50%",
                        color: "#FFF44F",
                        fontSize: "14px",
                        zIndex: 2,
                    }}
                >
                    Loading...
                </div>
            )}

            <video
                ref={videoRef}
                src={src}
                playsInline
                onCanPlay={handleCanPlay}
                onEnded={() => setToggelVideoCatFoo()}
                style={{
                    width: `${sizePx}px`,
                    height: `${sizePx}px`,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    cursor: "pointer",
                    visibility: showCondition && toggelVideoCat !== 0 ? "visible" : "hidden",
                    transition: "visibility 0.3s ease",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            />
        </div>
    );
};
