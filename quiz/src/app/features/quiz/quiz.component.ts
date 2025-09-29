import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { QuestionPresenterComponent } from './components/question-presenter/question-presenter.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ProgressComponent } from '../../components/progress/progress.component';
import { DoneComponent } from './components/done/done.component';
import { FlagComponent } from '../../components/flag/flag.component';
import { QuizStore } from './store/quiz.store';
import { AppStore } from '../../store/app.store';
import { BusyComponent } from "../../components/busy/busy.component";

@Component({
  selector: 'app-quiz-page',
  imports: [SharedModule, QuestionPresenterComponent, ToolbarComponent, ProgressComponent, DoneComponent, FlagComponent, BusyComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss', 
})
export default class QuizPageComponent {
  readonly appStore = inject(AppStore);
  readonly store = inject(QuizStore);

}
