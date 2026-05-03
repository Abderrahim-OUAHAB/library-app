import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './book-form.html',
})
export class BookForm implements OnInit {
  private dialogRef = inject(MatDialogRef<BookForm>);
  private data = inject<Partial<Book> | null>(MAT_DIALOG_DATA, { optional: true });
  private fb = inject(FormBuilder);

  bookForm!: FormGroup;

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['Roman', Validators.required],
      cover: [''],
      year: [new Date().getFullYear(), Validators.required],
      available: [true],
      rating: [0]
    });

    if (this.data) {
      this.bookForm.patchValue(this.data);
    }
  }

  get isEditMode(): boolean {
    return !!this.data?.id;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }
}