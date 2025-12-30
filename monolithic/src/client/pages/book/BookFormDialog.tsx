
import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from "@mui/material";
import type { Book } from "../../types/BookTypes";

export interface BookFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initial?: Book | null;
  onCancel: () => void;
  onSubmit: (values: Omit<Book, "id">) => void;
  submitting?: boolean;
}

export function BookFormDialog({open, mode, initial, onCancel, onSubmit, submitting}: BookFormDialogProps) {
  const [values, setValues] = React.useState<Omit<Book, "id">>({
    description: initial?.description ?? "",
    author: initial?.author ?? "",
    summary: initial?.summary ?? "",
  });

  React.useEffect(() => {
    if (open) {
      setValues({
        description: initial?.description ?? "",
        author: initial?.author ?? "",
        summary: initial?.summary ?? "",
      });
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.description.trim() || !values.summary.trim()) return;
    onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "create" ? "Create Book" : "Edit Book"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Description"
              value={values.description}
              onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
              required
              autoFocus
            />
            <TextField
              label="Author"
              value={values.author}
              onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
              required
              autoFocus
            />
            <TextField
              label="Summary"
              value={values.summary}
              onChange={(e) => setValues((v) => ({ ...v, summary: e.target.value }))}
              required
              multiline
              maxRows={10}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={submitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogActions>
           </form>
    </Dialog>
  );
}