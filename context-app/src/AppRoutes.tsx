import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { App } from "./App";

const cardStyle: React.CSSProperties = {
    background: "#555",
    color: "#FFF44F",
    border: "2px solid black",
    padding: "70px 15px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    flex: "0 0 auto",
    textAlign: "center",
    minWidth: "200px",
    maxWidth: "250px",
};
const Placeholder = ({ title }: { title: string }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh", // почти на весь экран
            textAlign: "center",
        }}
    >
        <div
            style={{
                background: "#555",
                color: "#FFF44F",
                border: "2px solid black",
                padding: "40px 30px",
                borderRadius: "12px",
                maxWidth: "400px",
            }}
        >
        <h2>{title}</h2>
        <p>Здесь пока что ничего нет</p>
        <Link to="/" style={{ textDecoration: "none" }}>
            <button style={{ marginTop: "20px", padding: "10px 20px" }}>Назад</button>
        </Link>
    </div>
    </div>
);

export const AppRoutes = () => {
    const [visibleCount, setVisibleCount] = useState<number>(4);
    const [currentIndex, setCurrentIndex] = useState(0);

    const MIN_VISIBLE = 1;
    const MAX_VISIBLE = 4;

    const buttons = [
        { to: "/app", label: "Тренажер по временам" },
        { to: "/themes", label: "Тренажер по темам английского" },
        { to: "/about", label: "О нас и связаться с нами" },
        { to: "/achievements", label: "Мои Достижения" },
    ];
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
    const next = () => {
        if (currentIndex < buttons.length - visibleCount) {
            setCurrentIndex((prev) => prev + 1);
        }
    };
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const arrowStyle: React.CSSProperties = {
        background: "#333",
        color: "#FFF44F",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        fontSize: "20px",
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div
                        style={{
                            position: "relative",
                            padding: "40px 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        {/* Левая стрелка */}
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            style={{
                                ...arrowStyle,
                                opacity: currentIndex === 0 ? 0.5 : 1,
                                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                            }}
                        >
                            {"<"}
                        </button>

                        {/* Видимые карточки */}
                        <div style={{ display: "flex", gap: "20px", overflow: "hidden" }}>
                            {buttons
                                .slice(currentIndex, currentIndex + visibleCount)
                                .map((btn, index) => (
                                    <Link key={index} to={btn.to} style={{ textDecoration: "none" }}>
                                        <div style={cardStyle}>{btn.label}</div>
                                    </Link>
                                ))}
                        </div>

                        {/* Правая стрелка */}
                        <button
                            onClick={next}
                            disabled={currentIndex >= buttons.length - visibleCount}
                            style={{
                                ...arrowStyle,
                                opacity: currentIndex >= buttons.length - visibleCount ? 0.5 : 1,
                                cursor:
                                    currentIndex >= buttons.length - visibleCount
                                        ? "not-allowed"
                                        : "pointer",
                            }}
                        >
                            {">"}
                        </button>
                    </div>
                }
            />

            <Route path="/app" element={<App />} />
            <Route
                path="/themes"
                element={<Placeholder title="Тренажер по темам английского" />}
            />
            <Route path="/about" element={<Placeholder title="О нас и связаться с нами" />} />
            <Route
                path="/achievements"
                element={<Placeholder title="Мои Достижения" />}
            />
        </Routes>
    );
};
