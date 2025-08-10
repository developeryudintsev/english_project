import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div
            style={{
                backgroundColor: '#FFF44F',
                minHeight: '100vh',       // Обеспечивает 100% высоты экрана
                width: '100%',            // Полная ширина
                margin: 0,                // Без отступов
                padding: 0,
            }}
        >
            <App />
        </div>
    </StrictMode>
)