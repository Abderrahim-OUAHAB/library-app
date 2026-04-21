/**   s1
import { Component } from '@angular/core';
import { Book } from '../../book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  showOnlyAvailable = false;

  books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Informatique', year: 2008, available: true },
    { id: 2, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', category: 'Roman', year: 1943, available: false },
    { id: 3, title: 'Dune', author: 'Frank Herbert', category: 'Science-Fiction', year: 1965, available: true },
    { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', category: 'Fantasy', year: 1997, available: true },
    { id: 5, title: 'Le Seigneur des Anneaux', author: 'Tolkien', category: 'Fantasy', year: 1954, available: false },
  ];

  constructor(private snackBar: MatSnackBar) {}

  get filteredBooks(): Book[] {
    return this.showOnlyAvailable ? this.books.filter(b => b.available) : this.books;
  }

  deleteBook(id: number): void {
    this.books = this.books.filter(b => b.id !== id);
    this.snackBar.open('Livre supprimé !', 'Fermer', { duration: 3000 });
  }
}
*/

/** s3 */


import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book';
import { Observable } from 'rxjs';
import { Book } from '../../book';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule,AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule, FormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
  private snackBar = inject(MatSnackBar);

  books$: Observable<Book[]> = this.bookService.getBooks();
  showOnlyAvailable = false;

  get displayedBooks(): Book[] {
    return this.showOnlyAvailable
      ? this.bookService.getAvailableBooks
      : this.bookService['books$'].value;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
    this.snackBar.open('Livre supprimé !', 'Fermer', { duration: 3000 });
  }
}