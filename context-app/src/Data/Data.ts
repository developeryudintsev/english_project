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
                    question: "я говорю.",
                    answers: [
                        {text: "I say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "вы(ты) идете.",
                    answers: [
                        {text: "I go", isCorrect: false},
                        {text: "she says", isCorrect: false},
                        {text: "You go", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "он получает.",
                    answers: [
                        {text: "We love", isCorrect: false},
                        {text: "I got", isCorrect: false},
                        {text: "He gets", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "она делает(что-то руками)",
                    answers: [
                        {text: "Will I said", isCorrect: false},
                        {text: "She makes", isCorrect: true},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "оно знает.",
                    answers: [
                        {text: "It knews", isCorrect: false},
                        {text: "Did it know?", isCorrect: false},
                        {text: "It knows", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "мы берём.",
                    answers: [
                        {text: "I take", isCorrect: false},
                        {text: "We take", isCorrect: true},
                        {text: "Does you take?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "они видят.",
                    answers: [
                        {text: "They sees", isCorrect: false},
                        {text: "They see", isCorrect: true},
                        {text: "Do They sees?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я пришел.",
                    answers: [
                        {text: "I say", isCorrect: false},
                        {text: "I came", isCorrect: true},
                        {text: "I didn't came", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "ты думаешь.",
                    answers: [
                        {text: "You think", isCorrect: true},
                        {text: "Do you think?", isCorrect: false},
                        {text: "you thinks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "она смотрит.",
                    answers: [
                        {text: "I looks", isCorrect: false},
                        {text: "he looks", isCorrect: false},
                        {text: "she looks", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "оно хочет.",
                    answers: [
                        {text: "I wants", isCorrect: false},
                        {text: "It wants", isCorrect: true},
                        {text: "I don't want", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "мы даём.",
                    answers: [
                        {text: "We give", isCorrect: true},
                        {text: "We gives", isCorrect: false},
                        {text: "Do We gives?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "они используют.",
                    answers: [
                        {text: "They use", isCorrect: true},
                        {text: "It use", isCorrect: false},
                        {text: "Does They uses?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу.",
                    answers: [
                        {text: "I found", isCorrect: false},
                        {text: "I finds", isCorrect: false},
                        {text: "I find?", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "ты расказываешь.",
                    answers: [
                        {text: "I say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "он спрашивает.",
                    answers: [
                        {text: "He ask", isCorrect: false},
                        {text: "He asks", isCorrect: true},
                        {text: "Do i asks?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "она работает.",
                    answers: [
                        {text: "You works", isCorrect: false},
                        {text: "She works", isCorrect: true},
                        {text: "Does they works?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "оно чувствует.",
                    answers: [
                        {text: "It feels", isCorrect: true},
                        {text: "I feels", isCorrect: false},
                        {text: "It feel", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "мы пытаемся.",
                    answers: [
                        {text: "It try", isCorrect: false},
                        {text: "I trys", isCorrect: false},
                        {text: "We try", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "они уходят.",
                    answers: [
                        {text: "We leave", isCorrect: false},
                        {text: "They leave", isCorrect: true},
                        {text: "Do hey leave?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "я званю.",
                    answers: [
                        {text: "I call", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i calls?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "тебе нужно.",
                    answers: [
                        {text: "They need", isCorrect: false},
                        {text: "She need", isCorrect: false},
                        {text: "You need", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "он хранит.",
                    answers: [
                        {text: "He keep", isCorrect: false},
                        {text: "He keeps", isCorrect: true},
                        {text: "Do He keep?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "она позволяет.",
                    answers: [
                        {text: "She lets", isCorrect: true},
                        {text: "Do she lets?", isCorrect: false},
                        {text: "She goes", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "мы начинаем.",
                    answers: [
                        {text: "I begin", isCorrect: false},
                        {text: "we begin", isCorrect: true},
                        {text: "It begins", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "они несут.",
                    answers: [
                        {text: "They bring", isCorrect: true},
                        {text: "She bring", isCorrect: false},
                        {text: "Does they bring?", isCorrect: false},
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
