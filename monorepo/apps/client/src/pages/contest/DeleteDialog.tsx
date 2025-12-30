
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { Contest } from "../../types/ContestTypes";

export interface DeleteDialogProps {
  open: boolean;
  contest?: Contest | null;
  onCancel: () => void;
  onConfirm: () => void;
  deleting?: boolean;
}

export function DeleteDialog({ open, contest, onCancel, onConfirm, deleting }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Delete Contest</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{contest?.contestName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={deleting}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={deleting}>Delete</Button>
      </DialogActions>
    </Dialog>
   );
}