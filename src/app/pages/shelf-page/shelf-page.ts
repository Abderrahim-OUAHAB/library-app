import { Component, inject, OnInit } from '@angular/core';
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
export class ShelfPage implements OnInit {
  private bookService = inject(BookService);

  categories: ('Roman' | 'Informatique' | 'Science' | 'BD')[] = ['Roman', 'Informatique', 'Science', 'BD'];

  shelves: { [key: string]: Book[] } = {};

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.categories.forEach(cat => {
        this.shelves[cat] = books.filter(b => b.category === cat);
      });
    });
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