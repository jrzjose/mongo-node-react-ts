export interface Book {
    id: string;
    description: string;
    author: string;
    summary: string;
}

export interface BooksResponse {
  books: Book[];
}
