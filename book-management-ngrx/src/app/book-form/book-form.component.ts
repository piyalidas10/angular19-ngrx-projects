import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AddBook } from '../books/book.actions';

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

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
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
      this.store.dispatch(AddBook({
        id: Date.now(),
        title: this.addbookForm.value['bookTitle'],
        author: this.addbookForm.value['bookAuthor'],
        checkInDate: this.addbookForm.value['checkInDate']
      }));
    }
    // Show success message
    this.successMessage.set(`'${this.addbookForm.value['bookTitle']}' checked in successfully!`);
    setTimeout(() => this.successMessage.set(null), 3000);
  }
}
