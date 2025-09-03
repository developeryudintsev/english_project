import React, {useEffect, useRef, useState} from "react";

type VideoCatProps = {
    src: string;
    setToggelVideoCat:(toggelVideoCat:0 | 1 | 2|3)=>void
};

export const VideoCat: React.FC<VideoCatProps> = ({ src,setToggelVideoCat }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [visible, setVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsFadingOut(true);
            setTimeout(()=>{
                setToggelVideoCat(0)
            },500)

        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isFadingOut) {
            // через 500ms (время transition) окончательно убираем
            const hideTimer = setTimeout(() => setVisible(false), 500);
            return () => clearTimeout(hideTimer);
        }
    }, [isFadingOut]);

    if (!visible) return null;

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            onClick={() => setIsFadingOut(true)}
            style={{
                marginTop: "0px",
                marginBottom: "10px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top center",
                cursor: "pointer",
                opacity: isFadingOut ? 0 : 1,
                transition: "opacity 0.5s ease",
            }}
        />
    );
};
