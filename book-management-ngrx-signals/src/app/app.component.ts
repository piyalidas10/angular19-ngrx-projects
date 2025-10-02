import { Component } from '@angular/core';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [BookListComponent, BookFormComponent],
})
export class AppComponent {
  title = 'book-management';
}
