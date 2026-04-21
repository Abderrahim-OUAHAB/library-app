/** s1
 export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  year: number;
  available: boolean;
}
*/


/** s5 */
export interface Book {
  id: number;
  title: string;
  author: string;
  category: 'Roman' | 'Informatique' | 'Science' | 'BD';
  year: number;
  available: boolean;
  cover?: string;
  rating?: number;
}