import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRating {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  setRating(value: number): void {
    this.rating = value;
    this.ratingChange.emit(value);
  }
}