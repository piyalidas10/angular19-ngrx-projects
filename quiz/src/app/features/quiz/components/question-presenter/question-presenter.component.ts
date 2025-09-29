import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
    selector: 'app-question-presenter',
    imports: [SharedModule],
    templateUrl: './question-presenter.component.html',
    styleUrl: './question-presenter.component.scss'
})
export class QuestionPresenterComponent {
  readonly store = inject(QuizStore);
}
