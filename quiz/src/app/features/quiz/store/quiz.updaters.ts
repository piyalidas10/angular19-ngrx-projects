import { PartialStateUpdater } from "@ngrx/signals";
import { QuizSlice } from "./quiz.slice";
import { Question } from "../../../models/question.model";

export function addAnswer(index: number): PartialStateUpdater<QuizSlice> {
    return state => ({
        answers: [...state.answers, index]
    })
}

export function resetQuiz(): PartialStateUpdater<QuizSlice> {
    return _ => ({
        answers: []
    })
}

export function resetQuestions(questions: Question[]): PartialStateUpdater<QuizSlice> {
    return _ => ({
        questions, 
        answers: []
    })
}
