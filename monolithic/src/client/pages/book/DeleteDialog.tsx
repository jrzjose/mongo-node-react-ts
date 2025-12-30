
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { Book } from "../../types/BookTypes";

export interface DeleteDialogProps {
  open: boolean;
  book?: Book | null;
  onCancel: () => void;
  onConfirm: () => void;
  deleting?: boolean;
}

export function DeleteDialog({ open, book, onCancel, onConfirm, deleting }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Delete Book</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{book?.description}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={deleting}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={deleting}>Delete</Button>
      </DialogActions>
    </Dialog>
   );
}