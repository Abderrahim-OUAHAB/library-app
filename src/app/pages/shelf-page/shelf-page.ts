import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book';
import { Book } from '../../book';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-shelf-page',
  standalone: true,
  imports: [DragDropModule, MatCardModule],
  templateUrl: './shelf-page.html',
  styleUrl: './shelf-page.css'
})
export class ShelfPage {
  private bookService = inject(BookService);

  categories: ('Roman' | 'Informatique' | 'Science' | 'BD')[] = ['Roman', 'Informatique', 'Science', 'BD'];

  getBooksByCategory(category: string): Book[] {
    return this.bookService['books$'].value.filter(b => b.category === category);
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
}