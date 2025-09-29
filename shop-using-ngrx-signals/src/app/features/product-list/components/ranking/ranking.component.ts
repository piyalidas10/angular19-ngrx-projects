import { Component, computed, input } from '@angular/core';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-ranking',
  imports: [SharedModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  readonly value = input.required<number>();

  readonly filled = computed(() => [1, 2, 3, 4, 5].map(i => i <= this.value()));

}
