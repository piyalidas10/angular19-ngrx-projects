import { Component, input, output } from '@angular/core';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'app-quantity',
  imports: [SharedModule],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.scss'
})
export class QuantityComponent {
  readonly amount = input.required();

  readonly increment = output();
  readonly decrement = output();
}
