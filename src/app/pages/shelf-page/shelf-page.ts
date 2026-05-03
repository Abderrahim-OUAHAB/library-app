import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book';
import { Book } from '../../book';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

type BookSortField = 'title' | 'author' | 'year' | 'rating';

@Component({
  selector: 'app-shelf-page',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './shelf-page.html',
  styleUrl: './shelf-page.css'
})
export class ShelfPage {
  private bookService = inject(BookService);

  categories: ('Roman' | 'Informatique' | 'Science' | 'BD')[] = ['Roman', 'Informatique', 'Science', 'BD'];
  sortFields: { value: BookSortField; label: string }[] = [
    { value: 'title', label: 'Titre' },
    { value: 'author', label: 'Auteur' },
    { value: 'year', label: 'Année' },
    { value: 'rating', label: 'Note' }
  ];

  readonly search$ = new BehaviorSubject<string>('');
  readonly sortBy$ = new BehaviorSubject<BookSortField>('title');
  readonly onlyAvailable$ = new BehaviorSubject<boolean>(false);

  readonly vm$ = combineLatest([
    this.bookService.getBooks(),
    this.search$,
    this.sortBy$,
    this.onlyAvailable$
  ]).pipe(
    map(([books, search, sortBy, onlyAvailable]) => {
      const normalizedSearch = search.trim().toLowerCase();
      const filtered = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(normalizedSearch);
        const matchesAvailability = !onlyAvailable || book.available;
        return matchesSearch && matchesAvailability;
      });

      const sorted = [...filtered].sort((a, b) => this.compareBooks(a, b, sortBy));
      const shelves = this.categories.reduce((acc, category) => {
        acc[category] = sorted.filter((book) => book.category === category);
        return acc;
      }, {} as { [key: string]: Book[] });

      return {
        shelves,
        filteredCount: filtered.length,
        totalCount: books.length
      };
    })
  );

  onSearchKeyup(searchValue: string): void {
    this.search$.next(searchValue);
  }

  onSortChange(sortBy: BookSortField): void {
    this.sortBy$.next(sortBy);
  }

  onAvailabilityToggle(onlyAvailable: boolean): void {
    this.onlyAvailable$.next(onlyAvailable);
  }

  resetFilters(): void {
    this.search$.next('');
    this.sortBy$.next('title');
    this.onlyAvailable$.next(false);
  }

  drop(event: CdkDragDrop<Book[]>, newCategory: 'Roman' | 'Informatique' | 'Science' | 'BD'): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const book = event.container.data[event.currentIndex];
      this.bookService.updateBook({ ...book, category: newCategory });
    }
  }

  private compareBooks(a: Book, b: Book, sortBy: BookSortField): number {
    switch (sortBy) {
      case 'year':
        return a.year - b.year;
      case 'rating':
        return (a.rating ?? 0) - (b.rating ?? 0);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  }
}