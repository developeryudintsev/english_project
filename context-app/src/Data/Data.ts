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
                    question: "Ты работаешь.",
                    answers: [
                        {text: "You work", isCorrect: true},
                        {text: "Do you works", isCorrect: false},
                        {text: "You does work", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Она не работает",
                    answers: [
                        {text: "She not works", isCorrect: false},
                        {text: "She don't work", isCorrect: false},
                        {text: "She does not work", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Он работает?",
                    answers: [
                        {text: "Do he works?", isCorrect: false},
                        {text: "Does he work?", isCorrect: true},
                        {text: "He does works?", isCorrect: false},
                    ],
                },
                {
                    id: v1(),
                    question: "Они не работают.",
                    answers: [
                        {text: "They does not work", isCorrect: false},
                        {text: "They working not", isCorrect: false},
                        {text: "They do not work", isCorrect: true},
                    ],
                },
                {
                    id: v1(),
                    question: "Работает ли учитель?",
                    answers: [
                        {text: "Does the teacher work?", isCorrect: true},
                        {text: "The teacher does works?", isCorrect: false},
                        {text: "Do the teacher work?", isCorrect: false},
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
