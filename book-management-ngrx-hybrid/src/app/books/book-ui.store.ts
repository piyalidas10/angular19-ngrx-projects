import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Injectable } from '@angular/core';

interface BookUIState {
  filter: string;
  sortBy: 'title' | 'date';
  selectedBookId: number | null;
  showAddDialog: boolean;
}

const initialUIState: BookUIState = {
  filter: '',
  sortBy: 'title',
  selectedBookId: null,
  showAddDialog: false
};

@Injectable({ providedIn: 'root' })
export class BookUIStore extends signalStore(
  { providedIn: 'root' },
  withState(initialUIState),
  withMethods((store) => ({
    setFilter(filter: string) {
      patchState(store, { filter });
    },
    setSort(sortBy: 'title' | 'date') {
      patchState(store, { sortBy });
    },
    selectBook(id: number | null) {
      patchState(store, { selectedBookId: id });
    },
    toggleAddDialog() {
      patchState(store, { showAddDialog: !store.showAddDialog() });
    }
  }))
) {}
