import { Route } from "@angular/router";
import { QuizStore } from "./features/quiz/store/quiz.store";

export const routes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./features/home/home.component')},
    { path: 'quiz', 
        loadComponent: () => import('./features/quiz/quiz.component'), 
        providers: [QuizStore]
    
    }
]