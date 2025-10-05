import { Pipe, PipeTransform } from '@angular/core';
import { Book } from 'src/app/models/book';

@Pipe({
  name: 'bookFilter',
  pure: true
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[] | null | undefined, filter: string, sortBy: 'title' | 'date'): Book[] {
    if (!Array.isArray(books)) return [];
    let out = books.slice();
    const q = (filter || '').trim().toLowerCase();
    if (q) {
      out = out.filter(b => (b.title || '').toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q));
    }
    if (sortBy === 'title') {
      out.sort((a,b) => (a.title || '').localeCompare(b.title || ''));
    } else {
      out.sort((a,b) => {
        const da = a.checkInDate ? new Date(a.checkInDate).getTime() : 0;
        const db = b.checkInDate ? new Date(b.checkInDate).getTime() : 0;
        return db - da; // newest first
      });
    }
    return out;
  }
}
