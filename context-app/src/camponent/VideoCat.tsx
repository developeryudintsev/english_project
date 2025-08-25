import React, {useEffect, useRef} from "react";

type VideoCatProps = {
    src:string
};

export const VideoCat: React.FC<VideoCatProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
                <video
                    ref={videoRef}
                    src={src}
                    autoPlay
                    loop
                    muted
                    style={{
                        marginTop: "0px",
                        marginBottom:'10px',
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "top center",
                    }}
                />
    );
};
