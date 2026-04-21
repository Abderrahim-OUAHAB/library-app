import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-stats-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './stats-page.html',
})
export class StatsPage {
  private bookService = inject(BookService);

  total$ = this.bookService.getBooks().pipe(map(books => books.length));
  available$ = this.bookService.getBooks().pipe(map(books => books.filter(b => b.available).length));
}