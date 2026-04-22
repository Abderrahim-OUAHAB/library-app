import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Book } from '../../book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, FormsModule
  ],
  templateUrl: './book-form.html',
})
export class BookForm {
  private dialogRef = inject(MatDialogRef<BookForm>);

  book: Partial<Book> = {
    title: '',
    author: '',
    category: 'Roman',
    year: new Date().getFullYear(),
    available: true,
  };

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.book);
  }
}