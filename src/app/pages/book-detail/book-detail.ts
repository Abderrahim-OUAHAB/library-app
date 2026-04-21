import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StarRating } from '../../components/star-rating/star-rating';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, StarRating],
  templateUrl: './book-detail.html',
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  book: Book | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getBookById(id);
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
  onRatingChange(value: number): void {
  if (this.book) {
    this.bookService.updateBook({ ...this.book, rating: value });
    this.book = { ...this.book, rating: value };
  }}
  
}