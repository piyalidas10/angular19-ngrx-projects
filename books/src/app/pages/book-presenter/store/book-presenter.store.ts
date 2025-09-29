import { patchState, signalMethod, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { initialBookPresenterSlice } from './book-presenter.slice';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { entityConfig, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Book } from '../../../models/book.model';

const bookConfig = entityConfig({
    entity: type<Book>(),
    collection: '_books', 
    selectId: book => book.id
})


export const BookPresenterStore = signalStore(
    withState(initialBookPresenterSlice), 
    withEntities(bookConfig),
    withComputed(store => ({
        book: computed(() => store._booksEntityMap()[store.id()])
    })), 
    withMethods(store => ({
        setBookId: signalMethod<number>(id => 
            patchState(store, { id })), 
        renameCurrentBook: (name: string) => {
            patchState(store, updateEntity({
                id: store.id(), 
                changes: { title: name}
            }, bookConfig))
        }
    })), 
    withDevtools('book-presenter'), 
    withHooks(store => ({
        onInit: () => {
            patchState(store, setAllEntities(BOOKS_COLLECTION, bookConfig))
        }
    }))
)