import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {Observable} from 'rxjs';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.actions';
import { AppState } from '../app.state';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class BookListComponent implements OnInit{
  addbookForm: FormGroup = new FormGroup({});
  books$: Observable<Book[]>;
  
  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.books$ = store.pipe(select('book'));
  }

   ngOnInit(): void {
    this.addbookForm = this.formBuilder.group({
      bookId: ['', Validators.required],
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required]
    })
  }

  addBook(){
    if(this.addbookForm.valid){
      this.store.dispatch(AddBook({
        id: this.addbookForm.value['bookId'],
        title: this.addbookForm.value['bookTitle'],
        author: this.addbookForm.value['bookAuthor']}));
      // this.store.dispatch(AddBook({id,title,author}));
    }
  }

  removeBook(bookId: string){
    this.store.dispatch(RemoveBook({bookId}));
  }

}
