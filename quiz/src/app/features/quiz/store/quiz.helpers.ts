import { Question } from "../../../models/question.model";

export function getCorrectCount(answers: number[], questions: Question[]): number {
    let res = 0;

    for(let i = 0; i < answers.length; i++) {
        if ((questions.length > i) && (answers[i] === questions[i].correctIndex)) {
            res++;
        }
    }

    return res;  
}
