import { Component, inject } from '@angular/core';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookUIStore } from './books/book-ui.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [BookListComponent, BookFormComponent],
})
export class AppComponent {
  title = 'book-management';
  uiStore = inject(BookUIStore);
}
