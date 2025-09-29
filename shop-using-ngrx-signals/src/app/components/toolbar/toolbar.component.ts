import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ShopStore } from '../../store/shop.store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '(keydown.enter)': 'onEnter()'
  },
  imports: [SharedModule]
})
export class ToolbarComponent {
  readonly store = inject(ShopStore);
}
