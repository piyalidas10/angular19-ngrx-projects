import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { Book } from '../models/book';
import { addBook, loadBooks, loadBooksSuccess, removeBook, updateBook } from './book.actions';

@Injectable()
export class BookEffects {
  private api = 'http://localhost:3000/books';

  constructor(private actions$: Actions, private http: HttpClient) { }

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      mergeMap(() => this.http.get<Book[]>(this.api).pipe(
        map((books) => loadBooksSuccess({ books }))
      ))
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBook),
      mergeMap(({ book }) => this.http.post<Book>(this.api, book).pipe(
        map(() => loadBooks()) // reload after add
      ))
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBook),
      mergeMap(({ book }) =>
        this.http.put<Book>(`${this.api}/${book.id}`, book).pipe(
          map(() => loadBooks()) // reload after update
        )
      )
    )
  );


  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeBook),
      mergeMap(({ bookId }) => this.http.delete(`${this.api}/${bookId}`).pipe(
        map(() => loadBooks()) // reload after delete
      ))
    )
  );
}
