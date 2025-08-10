import {Grid, Paper} from "@mui/material";

export const AdvertisingComponent = () => {
    return (
        <>
            <Grid container justifyContent="center">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 2,
                        margin: '30px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor:'#00e1ff'
                    }}
                >
                    <div>
                    ЦЕНТР ИНТЕЛЛЕКТУАЛЬНОГО РАЗВИТИЯ ДЕТЕЙ И ПОДРОСТКОВ KIBER-RUS:
                    </div>
                    <ul>
                        <li>Создаём чат-ботов 🤖🐱</li>
                        <li>Разрабатываем игры 🎮🐱</li>
                        <li>Создаём сайты 💻🐾</li>
                        <li>Разрабатываем приложения 📱🐱</li>
                        <li>Работаем с искусственным интеллектом 🧠🐈‍⬛</li>
                        <li>Учим английский язык 🐾📚</li>
                        <li>Центр интеллектуального развития детей и подростков KIBER-RUS 🐱🎓</li>
                        <p>+ Развиваем творческие способности 🎨🐱</p>
                    </ul>
                    <p>преходи по ссылке наш сайт:
                        <a
                        href="https://www.kiber-rus.ru/"
                        target="_blank"
                    >
                            🐾🐱
                    </a>
                    </p>
                    <p>или кликай по авторке🐱🐱🐱</p>
                </Paper>
            </Grid>
        </>
    );
};
