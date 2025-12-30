
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { Customer } from "../../types/CustomersTypes";

export interface DeleteDialogProps {
  open: boolean;
  customer?: Customer | null;
  onCancel: () => void;
  onConfirm: () => void;
  deleting?: boolean;
}

export function DeleteDialog({ open, customer, onCancel, onConfirm, deleting }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>Delete Customer</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{customer?.customer}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={deleting}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={deleting}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
