
import * as React from "react";
import { Container, CssBaseline, Snackbar, Alert } from "@mui/material";
import { BookTable } from "./BookTable";
import { BookFormDialog } from "./BookFormDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { Book } from "../../types/BookTypes";
import {
  fetchBooks, createBook, updateBook, deleteBook
} from "../../utils/BooksApi";

export default function Book() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selected, setSelected] = React.useState<Book | null>(null);

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [toast, setToast] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } 
    catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to load books", severity: "error" });
    } 
    finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCreate = () => {
    setSelected(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelected(book);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (book: Book) => {
    setSelected(book);
    setDeleteOpen(true);
  };

  const submitForm = async (values: Omit<Book, "id">) => {
    try {
      if (formMode === "create") {
        await createBook(values);
        setToast({ open: true, message: "Book created", severity: "success" });
      } else if (selected) {
        await updateBook(selected.id, values);
        setToast({ open: true, message: "Book updated", severity: "success" });
      }
      setFormOpen(false);
      refresh();
    } 
    catch (err) {
      console.error(err);
      setToast({ open: true, message: "Operation failed", severity: "error" });
    }
  };

  const confirmDelete = async () => {
    try {
      if (selected) {
        await deleteBook(selected.id);
        setToast({ open: true, message: "Book deleted", severity: "success" });
      }
      setDeleteOpen(false);
      refresh();
    } 
    catch (err) {
      console.error(err);
      setToast({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <BookTable
          books={books}
          loading={loading}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <BookFormDialog
          open={formOpen}
          mode={formMode}
          initial={formMode === "edit" ? selected : null}
          onCancel={() => setFormOpen(false)}
          onSubmit={submitForm}
        />

        <DeleteDialog
          open={deleteOpen}
          book={selected}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={confirmDelete}
        />
      </Container>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}