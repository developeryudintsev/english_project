import React, { useEffect, useRef, useState } from "react";
import zvuki2 from "../../assets/zvuki.mp3";

type VideoCatProps = {
    src: string;
    answerStatus: "none" | "correct" | "wrong";
};

export const VideoCat: React.FC<VideoCatProps> = ({ src, answerStatus }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [visible, setVisible] = useState(true);
    const videoCorrectRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (answerStatus === "correct") {
            const audio = new Audio(zvuki2);
            audio.currentTime = 0;
            if (videoCorrectRef.current) {
                videoCorrectRef.current.currentTime = 0;
                videoCorrectRef.current.play();
            }
            // audio.play();
        }
    }, [answerStatus]);

    if (!visible) return null;

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            onClick={() => setVisible(false)}
            style={{
                marginTop: "0px",
                marginBottom: "10px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top center",
                cursor: "pointer", // чтобы понятно было, что можно нажать
            }}
        />
    );
};
