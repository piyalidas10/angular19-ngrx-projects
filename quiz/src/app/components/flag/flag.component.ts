import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-flag',
  imports: [],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss'
})
export class FlagComponent {
  readonly of = input.required<string>();

  readonly imageUrl = computed(() => `images/lang/${this.of()}.svg`);

}
