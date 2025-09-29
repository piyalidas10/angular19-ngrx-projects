import { Question } from "../models/question.model";

export const QUESTIONS: Question[] =  [
    {
      caption: ['Red', 'Lime', 'Blue'],
      answers: ['Black', 'Gray', 'White', 'Brown'],
      correctIndex: 2,
    },
    {
      caption: ['Red', 'Black'],
      answers: ['DarkRed', 'Red', 'Black', 'Gray'],
      correctIndex: 1,
    },
    {
      caption: ['Blue', 'Red'],
      answers: ['Magenta', 'Cyan', 'Purple', 'White'],
      correctIndex: 0,
    },
    {
      caption: ['Blue', 'Lime'],
      answers: ['Magenta', 'Cyan', 'White', 'Teal'],
      correctIndex: 1,
    },
    {
      caption: ['Lime', 'Red'],
      answers: ['Brown', 'White', 'Orange', 'Yellow'],
      correctIndex: 3,
    },
    {
      caption: ['Cyan', 'Red'],
      answers: ['Magenta', 'Blue', 'White', 'Purple'],
      correctIndex: 2,
    },
    {
      caption: ['Blue', 'Yellow'],
      answers: ['Green', 'Cyan', 'White', 'Lime'],
      correctIndex: 2,
    },
    {
      caption: ['Lime', 'Magenta'],
      answers: ['Brown', 'Yellow', 'White', 'Orange'],
      correctIndex: 2,
    }
  ]