import { Component, computed, inject, Input, signal } from '@angular/core';
import { SharedModule } from '../../../../shared.module';
import { QuizStore } from '../../store/quiz.store';

@Component({
    selector: 'app-done',
    imports: [SharedModule],
    templateUrl: './done.component.html',
    styleUrl: './done.component.scss'
})
export class DoneComponent {
  readonly store = inject(QuizStore);
  readonly correct = this.store.correctCount;
  readonly total = this.store.questionsCount;

  readonly score = computed(() => this.correct() / this.total());
}
