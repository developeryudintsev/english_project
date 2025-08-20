import {v1} from "uuid";

export type AnswerType = {
    text: string;
    isCorrect: boolean;
};
export type QuestionType = {
    id: string;
    question: string;
    isDone: boolean,
    word: string,
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

export const data:DataType ={
    simple: {
        ['Present']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Я говорю",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "I say", isCorrect: true},
                        {text: "I says", isCorrect: false},
                        {text: "Do i say?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Вы(ты) идете",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "I go", isCorrect: false},
                        {text: "she says", isCorrect: false},
                        {text: "You go", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он получает",
                    isDone: false,
                    word: 'get',
                    answers: [
                        {text: "We get", isCorrect: false},
                        {text: "I got", isCorrect: false},
                        {text: "He gets", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Oна делает(что-то руками)",
                    isDone: false,
                    word: 'make',
                    answers: [
                        {text: "I will make", isCorrect: false},
                        {text: "She makes", isCorrect: true},
                        {text: "I maked", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно знает",
                    isDone: false,
                    word: 'know',
                    answers: [
                        {text: "It know", isCorrect: false},
                        {text: "Did it know?", isCorrect: false},
                        {text: "It knows", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы берём",
                    isDone: false,
                    word: 'take',
                    answers: [
                        {text: "I take", isCorrect: false},
                        {text: "We take", isCorrect: true},
                        {text: "You does take", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они видят",
                    isDone: false,
                    word: 'see',
                    answers: [
                        {text: "They sees", isCorrect: false},
                        {text: "They see", isCorrect: true},
                        {text: "They saw", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я прихожу",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "I cames", isCorrect: false},
                        {text: "I came", isCorrect: true},
                        {text: "I do came", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты думаешь",
                    isDone: false,
                    word: 'think',
                    answers: [
                        {text: "You think", isCorrect: true},
                        {text: "We think", isCorrect: false},
                        {text: "You thinks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она смотрит",
                    isDone: false,
                    word: 'look',
                    answers: [
                        {text: "I looks", isCorrect: false},
                        {text: "He looks", isCorrect: false},
                        {text: "She looks", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно хочет",
                    isDone: false,
                    word: 'want',
                    answers: [
                        {text: "I wants", isCorrect: false},
                        {text: "It wants", isCorrect: true},
                        {text: "I want", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы даём",
                    isDone: false,
                    word: 'give',
                    answers: [
                        {text: "We give", isCorrect: true},
                        {text: "We gives", isCorrect: false},
                        {text: "They gives", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они используют",
                    isDone: false,
                    word: 'use',
                    answers: [
                        {text: "They use", isCorrect: true},
                        {text: "It use", isCorrect: false},
                        {text: "They uses", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я нахожу",
                    isDone: false,
                    word: 'find',
                    answers: [
                        {text: "I find", isCorrect: true},
                        {text: "I finds", isCorrect: false},
                        {text: "We find", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Ты расказываешь",
                    isDone: false,
                    word: 'tell',
                    answers: [
                        {text: "You tell", isCorrect: true},
                        {text: "I tells", isCorrect: false},
                        {text: "We tell", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Он спрашивает",
                    isDone: false,
                    word: 'ask',
                    answers: [
                        {text: "He ask", isCorrect: false},
                        {text: "He asks", isCorrect: true},
                        {text: "I asks", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она работает",
                    isDone: false,
                    word: 'work',
                    answers: [
                        {text: "You works", isCorrect: false},
                        {text: "She works", isCorrect: true},
                        {text: "She work", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Оно чувствует",
                    isDone: false,
                    word: 'fell',
                    answers: [
                        {text: "It feels", isCorrect: true},
                        {text: "I feels", isCorrect: false},
                        {text: "It feel", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы пытаемся",
                    isDone: false,
                    word: 'try',
                    answers: [
                        {text: "It try", isCorrect: false},
                        {text: "I trys", isCorrect: false},
                        {text: "We try", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Они уходят",
                    isDone: false,
                    word: 'leave',
                    answers: [
                        {text: "We leave", isCorrect: false},
                        {text: "They leave", isCorrect: true},
                        {text: "They leaves", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Я звоню",
                    isDone: false,
                    word: 'call',
                    answers: [
                        {text: "I call", isCorrect: true},
                        {text: "I calls", isCorrect: false},
                        {text: "It calls", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Тебе нужно",
                    isDone: false,
                    word: 'need',
                    answers: [
                        {text: "They need", isCorrect: false},
                        {text: "She need", isCorrect: false},
                        {text: "You need", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он хранит",
                    isDone: false,
                    word: 'keep',
                    answers: [
                        {text: "He keep", isCorrect: false},
                        {text: "He keeps", isCorrect: true},
                        {text: "He kept", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она позволяет",
                    isDone: false,
                    word: 'let',
                    answers: [
                        {text: "She lets", isCorrect: true},
                        {text: "She let", isCorrect: false},
                        {text: "She leted", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Мы начинаем",
                    isDone: false,
                    word: 'begin',
                    answers: [
                        {text: "I begin", isCorrect: false},
                        {text: "We begin", isCorrect: true},
                        {text: "We begins", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они несут",
                    isDone: false,
                    word: 'bring',
                    answers: [
                        {text: "They bring", isCorrect: true},
                        {text: "She bring", isCorrect: false},
                        {text: "They brings", isCorrect: false},
                    ],
                },
            ],
            ['?']: [
                {
                    id: v1(),
                    question: "Я говорю?",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "Does I say?", isCorrect: false},
                        {text: "Does I said?", isCorrect: false},
                        {text: "Do i say?", isCorrect: true},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Я не говорю",
                    isDone: false,
                    word: 'say',
                    answers: [
                        {text: "I does not say", isCorrect: false},
                        {text: "I do not said", isCorrect: true},
                        {text: "I did not say", isCorrect: false},
                    ],
                },
            ]
        },
        ['Past']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Он мне позвонил",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "He called me", isCorrect: true},
                        {text: "He call me", isCorrect: false},
                        {text: "He do call me", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "ты это видели?",
                    isDone: false,
                    word: 'saw',
                    answers: [
                        {text: "Do you saw it?", isCorrect: false},
                        {text: "You did saw it?", isCorrect: false},
                        {text: "Did you see it?", isCorrect: true},
                    ],
                },
            ],
            ['?']: [
                {
                    id: v1(),
                    question: "ты это видели?",
                    isDone: false,
                    word: 'saw',
                    answers: [
                        {text: "Do you saw it?", isCorrect: false},
                        {text: "You did saw it?", isCorrect: false},
                        {text: "Did you see it?", isCorrect: true},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Он мне не позвонил.",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "He did not call me", isCorrect: true},
                        {text: "He not called me", isCorrect: false},
                        {text: "He didn’t called me", isCorrect: false},
                    ],
                },
            ],
        },
        ['Future']: {
            ['.']: [
                {
                    id: v1(),
                    question: "Она придет",
                    isDone: false,
                    word: 'will not came',
                    answers: [
                        {text: "She will come", isCorrect: false},
                        {text: "She will not come", isCorrect: true},
                        {text: "She don’t come", isCorrect: false},
                    ],
                },

            ],
            ['?']: [
                {
                    id: v1(),
                    question: "Они идут?",
                    isDone: false,
                    word: 'go',
                    answers: [
                        {text: "They will go?", isCorrect: false},
                        {text: "Do they go?", isCorrect: false},
                        {text: "Will they go?", isCorrect: true},
                    ],
                },
            ],
            ['!']: [
                {
                    id: v1(),
                    question: "Она не придет.",
                    isDone: false,
                    word: 'came',
                    answers: [
                        {text: "She not will come", isCorrect: false},
                        {text: "She will not come", isCorrect: true},
                        {text: "She don’t come", isCorrect: false},
                    ],
                },
            ],
        },
    },
}
