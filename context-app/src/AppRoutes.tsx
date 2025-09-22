import { Routes, Route, Link } from "react-router-dom";
import { App } from "./App";

const Placeholder = ({ title }: { title: string }) => (
    <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>{title}</h2>
        <p>Здесь пока что ничего нет</p>
        <Link to="/">
            <button style={{ marginTop: "20px", padding: "10px 20px" }}>Назад</button>
        </Link>
    </div>
);

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Главная страница с кнопками */}
            <Route
                path="/"
                element={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            paddingTop: "40px",
                        }}
                    >
                        <Link to="/app">
                            <div
                                style={{
                                    background: "white",
                                    border: "2px solid black",
                                    padding: "30px 60px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Тренажер по временам
                            </div>
                        </Link>

                        <Link to="/themes">
                            <div
                                style={{
                                    background: "white",
                                    border: "2px solid black",
                                    padding: "30px 60px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                Тренажер по темам английского
                            </div>
                        </Link>

                        <Link to="/about">
                            <div
                                style={{
                                    background: "white",
                                    border: "2px solid black",
                                    padding: "30px 60px",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                О нас и связаться с нами
                            </div>
                        </Link>
                    </div>
                }
            />

            <Route path="/app" element={<App />} />
            <Route path="/themes" element={<Placeholder title="Тренажер по темам английского" />} />
            <Route path="/about" element={<Placeholder title="О нас и связаться с нами" />} />
        </Routes>
    );
};
