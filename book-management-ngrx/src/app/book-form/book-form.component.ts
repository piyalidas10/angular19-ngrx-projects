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
  addbookForm: FormGroup = new FormGroup({});
  successMessage = signal<string | null>(null);
  bookFacade = inject(BookFacade);

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.addbookForm = this.formBuilder.group({
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      checkInDate: ['', Validators.required]
    })
  }

  addBook() {
    if (this.addbookForm.valid) {
      this.bookFacade.add({
        title: this.addbookForm.value['bookTitle'],
        author: this.addbookForm.value['bookAuthor'],
        checkInDate: this.addbookForm.value['checkInDate']
      });
    }
    this.addbookForm.reset();
    // Show success message
    this.successMessage.set(`'${this.addbookForm.value['bookTitle']}' checked in successfully!`);
    setTimeout(() => this.successMessage.set(null), 3000);
  }
}
