import { QUESTIONS } from "../../../data/questions";
import { Question } from "../../../models/question.model";

export interface QuizSlice {
    readonly questions: Question[];
    readonly answers: number[];
}

export const initialQuizSlice: QuizSlice = {
    questions: QUESTIONS, 
    answers: [], 
}

