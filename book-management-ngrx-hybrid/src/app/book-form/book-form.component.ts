import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookFacade } from '../books/book.facade';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class BookFormComponent {
  facade = inject(BookFacade);
  bookForm: FormGroup = new FormGroup({});
  successMessage = signal<string | null>(null);

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      checkInDate: ['', Validators.required]
    })
  }

  onSubmitBook() {
    if (this.bookForm.valid && !this.facade.isEditing()) {
      this.facade.add({
        title: this.bookForm.value['bookTitle'],
        author: this.bookForm.value['bookAuthor'],
        checkInDate: this.bookForm.value['checkInDate']
      });
      // Show success message
      this.successMessage.set(`'${this.bookForm.value['bookTitle']}' checked in successfully!`);
      setTimeout(() => this.successMessage.set(null), 3000);
    }
    if (this.bookForm.valid && this.facade.isEditing()) {
      // Update the book
      this.facade.updateById({
        id: this.facade.bookId()?.toString()!,
        title: this.bookForm.value['bookTitle'],
        author: this.bookForm.value['bookAuthor'],
        checkInDate: this.bookForm.value['checkInDate']
      });
      // Show success message
      this.successMessage.set(`'${this.bookForm.value['bookTitle']}' checked in successfully!`);
      setTimeout(() => this.successMessage.set(null), 3000);
    }
    this.facade.isEditing.set(false);
    this.facade.closeDialog();
  }

  onCancel() {
    this.facade.closeDialog();
    this.facade.isEditing.set(false);
  }
}
