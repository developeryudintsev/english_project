import {v1} from "uuid";

export type AnswerType = {
    text: string;
    isCorrect: boolean;
};

export type QuestionType = {
    id: string;
    question: string;
    answers: AnswerType[];
};

export type TimeData = {
    [lessonKey: string]: QuestionType[];
};

export type DataType = {
    simple: {
        Past: TimeData;
        Present: TimeData;
        Future: TimeData;
    };
};

export const data: DataType = {
    simple: {
        ['Present']: {
            ['lesson1']: [
                {
                    id: v1(),
                    question: "Я говорю",
                    answers: [
                        {text: "I say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) идете",
                    answers: [
                        {text: "I go", isCorrect: false},
                        {text: "she says", isCorrect: false},
                        {text: "You go", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он получает",
                    answers: [
                        {text: "We get", isCorrect: false},
                        {text: "I got", isCorrect: false},
                        {text: "He gets", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Oна делает(что-то руками)",
                    answers: [
                        {text: "I will make", isCorrect: false},
                        {text: "She makes", isCorrect: true},
                        {text: "I maked", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знает",
                    answers: [
                        {text: "It know", isCorrect: false},
                        {text: "Did it know?", isCorrect: false},
                        {text: "It knows", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы берём",
                    answers: [
                        {text: "I take", isCorrect: false},
                        {text: "We take", isCorrect: true},
                        {text: "You does take", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они видят",
                    answers: [
                        {text: "They sees", isCorrect: false},
                        {text: "They see", isCorrect: true},
                        {text: "They saw", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я прихожу",
                    answers: [
                        {text: "I cames", isCorrect: false},
                        {text: "I came", isCorrect: true},
                        {text: "I do came", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты думаешь",
                    answers: [
                        {text: "You think", isCorrect: true},
                        {text: "We think", isCorrect: false},
                        {text: "You thinks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрит",
                    answers: [
                        {text: "I looks", isCorrect: false},
                        {text: "He looks", isCorrect: false},
                        {text: "She looks", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно хочет",
                    answers: [
                        {text: "I wants", isCorrect: false},
                        {text: "It wants", isCorrect: true},
                        {text: "I want", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы даём",
                    answers: [
                        {text: "We give", isCorrect: true},
                        {text: "We gives", isCorrect: false},
                        {text: "They gives", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они используют",
                    answers: [
                        {text: "They use", isCorrect: true},
                        {text: "It use", isCorrect: false},
                        {text: "They uses", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу",
                    answers: [
                        {text: "I find", isCorrect: true},
                        {text: "I finds", isCorrect: false},
                        {text: "We find", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты расказываешь",
                    answers: [
                        {text: "You say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "We say", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он спрашивает",
                    answers: [
                        {text: "He ask", isCorrect: false},
                        {text: "He asks", isCorrect: true},
                        {text: "I asks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она работает",
                    answers: [
                        {text: "You works", isCorrect: false},
                        {text: "She works", isCorrect: true},
                        {text: "She work", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно чувствует",
                    answers: [
                        {text: "It feels", isCorrect: true},
                        {text: "I feels", isCorrect: false},
                        {text: "It feel", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы пытаемся",
                    answers: [
                        {text: "It try", isCorrect: false},
                        {text: "I trys", isCorrect: false},
                        {text: "We try", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Они уходят",
                    answers: [
                        {text: "We leave", isCorrect: false},
                        {text: "They leave", isCorrect: true},
                        {text: "They leaves", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я звоню",
                    answers: [
                        {text: "I call", isCorrect: true},
                        {text: "I calls", isCorrect: false},
                        {text: "It calls", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе нужно",
                    answers: [
                        {text: "They need", isCorrect: false},
                        {text: "She need", isCorrect: false},
                        {text: "You need", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он хранит",
                    answers: [
                        {text: "He keep", isCorrect: false},
                        {text: "He keeps", isCorrect: true},
                        {text: "He kept", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она позволяет",
                    answers: [
                        {text: "She lets", isCorrect: true},
                        {text: "She let", isCorrect: false},
                        {text: "She leted", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы начинаем",
                    answers: [
                        {text: "I begin", isCorrect: false},
                        {text: "We begin", isCorrect: true},
                        {text: "We begins", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они несут",
                    answers: [
                        {text: "They bring", isCorrect: true},
                        {text: "She bring", isCorrect: false},
                        {text: "They brings", isCorrect: false},
                    ],
                },
            ],
        },
        ['Past']: {
            ['lesson1']: [
                {
                    id: v1(),
                    question: "Он мне не позвонил.",
                    answers: [
                        {text: "He did not call me", isCorrect: true},
                        {text: "He not called me", isCorrect: false},
                        {text: "He didn’t called me", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "ты это видели?",
                    answers: [
                        {text: "Do you saw it?", isCorrect: false},
                        {text: "You did saw it?", isCorrect: false},
                        {text: "Did you see it?", isCorrect: true},
                    ],
                },
            ],
        },
        ['Future']: {
            ['lesson1']: [
                {
                    id: v1(),
                    question: "Она не придет.",
                    answers: [
                        {text: "She not will come", isCorrect: false},
                        {text: "She will not come", isCorrect: true},
                        {text: "She don’t come", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они придут?",
                    answers: [
                        {text: "They will comes?", isCorrect: false},
                        {text: "Do they come?", isCorrect: false},
                        {text: "Will they come?", isCorrect: true},
                    ],
                },
            ],
        },
    },
};
