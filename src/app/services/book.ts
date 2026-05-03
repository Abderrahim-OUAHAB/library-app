import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly storageKey = 'library-app-books';

  private books$ = new BehaviorSubject<Book[]>([]);

  constructor() {
    this.books$.next(this.loadFromStorage());
  }

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
    this.saveToStorage(updated);
  }

  deleteBook(id: number): void {
    const updated = this.books$.value.filter(b => b.id !== id);
    this.books$.next(updated);
    this.saveToStorage(updated);
  }

  updateBook(updated: Book): void {
    const books = this.books$.value.map(b => b.id === updated.id ? updated : b);
    this.books$.next(books);
    this.saveToStorage(books);
  }

  getBookById(id: number): Book | undefined {
    return this.books$.value.find(b => b.id === id);
  }
  get booksValue(): Book[] {
    return this.books$.value;
  }

  private saveToStorage(books: Book[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }

  private loadFromStorage(): Book[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      return [];
    }

    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}