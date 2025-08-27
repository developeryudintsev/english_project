import React, { useEffect, useRef, useState } from "react";

type VideoCatProps = {
    src: string;
};

export const VideoCat: React.FC<VideoCatProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setVisible(false); // спрячем видео
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null; // вообще не рендерим

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            style={{
                marginTop: "0px",
                marginBottom: "10px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top center",
            }}
        />
    );
};
