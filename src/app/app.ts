/** import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BookList } from './components/book-list/book-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, BookList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
*/

/** s3 

import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BookService } from './services/book';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BookList } from "./components/book-list/book-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    BookList
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  bookService = inject(BookService);
  private dialog = inject(MatDialog);

  openAddDialog(): void {
    console.log('Ouvrir dialog ajout livre');
  }
}
  */

/** s4 */


import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BookService } from './services/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './app.html',
})
export class App {
  bookService = inject(BookService);
}