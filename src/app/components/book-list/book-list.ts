/** s3 */


import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book';
import { Observable } from 'rxjs';
import { Book } from '../../book';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BookForm } from '../book-form/book-form';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule,AsyncPipe, MatCardModule, MatButtonModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  books$: Observable<Book[]> = this.bookService.getBooks();
  showOnlyAvailableControl = new FormControl(false);

  ngOnInit(): void {
    // Initialize if needed
  }

  get displayedBooks(): Book[] {
    return this.showOnlyAvailableControl.value
      ? this.bookService.getAvailableBooks
      : this.bookService.booksValue;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
    this.snackBar.open('Livre supprimé !', 'Fermer', { duration: 3000 });
  }

  updateBook(book: Book): void {
    this.dialog.open(BookForm, {
      width: '520px',
      data: book
    }).afterClosed().subscribe((updatedBook?: Partial<Book>) => {
      if (!updatedBook) {
        return;
      }

      this.bookService.updateBook({
        ...book,
        ...updatedBook
      } as Book);
      this.snackBar.open('Livre modifié !', 'Fermer', { duration: 3000 });
    });
  }
}