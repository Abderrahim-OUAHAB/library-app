import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookDetail } from './pages/book-detail/book-detail';
import { StatsPage } from './pages/stats-page/stats-page';
import { NotFound} from './pages/not-found/not-found';
import { ShelfPage } from './pages/shelf-page/shelf-page';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList },
  { path: 'books/:id', component: BookDetail },
  { path: 'stats', component: StatsPage },
  { path: 'shelves', component: ShelfPage },
  { path: '**', component: NotFound }
];