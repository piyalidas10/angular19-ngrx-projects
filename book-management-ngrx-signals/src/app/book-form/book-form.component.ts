import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookStore } from '../stores/book.store';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class BookFormComponent {
  checkInDate = '';
  title = '';
  author = '';

  // Inject the BookStore
  readonly bookStore = inject(BookStore);
  successMessage = signal<string | null>(null);

  addBook(form: any) {
    if (form.valid) {
        if (!this.checkInDate || !this.title || !this.author) return;
        this.bookStore.addBook({
        checkInDate: this.checkInDate,
        title: this.title,
        author: this.author,
        });

        // Show success message
        this.successMessage.set(`'${this.title}' checked in successfully!`);
        setTimeout(() => this.successMessage.set(null), 3000);

        // Reset form fields
        this.checkInDate = '';
        this.title = '';
        this.author = '';
    }
  }
}
