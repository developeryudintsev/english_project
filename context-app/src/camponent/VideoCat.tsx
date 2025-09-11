import React, { useEffect, useRef, useState } from "react";

type VideoCatProps = {
    src: string;
    toggelVideoCat: 0 | 1 | 2 | 3;
    setToggelVideoCat: (toggelVideoCat: 0 | 1 | 2 | 3) => void;
    showCondition: boolean;
};

export const VideoCat: React.FC<VideoCatProps> = ({
                                                      src,
                                                      setToggelVideoCat,
                                                      toggelVideoCat,
                                                      showCondition,
                                                  }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loaded, setLoaded] = useState(false);

    const handleCanPlay = () => {
        setLoaded(true);
    };

    useEffect(() => {
        if (!loaded && toggelVideoCat !== 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
        }
    }, [toggelVideoCat]);

    return (
        <div style={{ position: "relative", width: 120, height: 120 }}>
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
                autoPlay
                muted
                playsInline
                onCanPlay={handleCanPlay}
                onEnded={() => setToggelVideoCat(0)} // 👈 котик «засыпает»
                style={{
                    width: "120px",
                    height: "120px",
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
