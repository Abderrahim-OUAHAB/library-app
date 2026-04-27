import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Informatique', year: 2008, available: true },
    { id: 2, title: 'Atomic habits', author: 'James Clear', category: 'Roman', year: 1943, available: false ,cover:'https://pictures.abebooks.com/isbn/9780735211292-fr.jpg' },
    { id: 3, title: 'Dune', author: 'Frank Herbert', category: 'Science-Fiction' as any, year: 1965, available: true },
    { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fantasy' as any, year: 1997, available: true },
    { id: 5, title: 'Le Seigneur des Anneaux', author: 'Tolkien', category: 'Fantasy' as any, year: 1954, available: false },
  ];

  private books$ = new BehaviorSubject<Book[]>(this.books);

  getBooks() {
    return this.books$.asObservable();
  }

  get getAvailableBooks(): Book[] {
    return this.books$.value.filter(b => b.available);
  }

  get bookCount(): number {
    return this.books$.value.length;
  }

  addBook(book: Book): void {
    const updated = [...this.books$.value, book];
    this.books$.next(updated);
  }

  deleteBook(id: number): void {
    const updated = this.books$.value.filter(b => b.id !== id);
    this.books$.next(updated);
  }

  updateBook(updated: Book): void {
    const books = this.books$.value.map(b => b.id === updated.id ? updated : b);
    this.books$.next(books);
  }

  getBookById(id: number): Book | undefined {
    return this.books$.value.find(b => b.id === id);
  }
  get booksValue(): Book[] {
  return this.books$.value;
}
}