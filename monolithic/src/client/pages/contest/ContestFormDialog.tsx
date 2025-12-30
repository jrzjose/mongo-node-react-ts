
import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from "@mui/material";
import type { Contest } from "../../types/ContestTypes";

export interface ContestFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initial?: Contest | null;
  onCancel: () => void;
  onSubmit: (values: Omit<Contest, "id">) => void;
  submitting?: boolean;
}

export function ContestFormDialog({
  open, mode, initial, onCancel, onSubmit, submitting
}: ContestFormDialogProps) {
  const [values, setValues] = React.useState<Omit<Contest, "id">>({
    contestName: initial?.contestName ?? "",
    categoryName: initial?.categoryName ?? "",
  });

  React.useEffect(() => {
    if (open) {
      setValues({
        contestName: initial?.contestName ?? "",
        categoryName: initial?.categoryName ?? "",
      });
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.contestName.trim() || !values.categoryName.trim()) return;
    onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "create" ? "Create Contest" : "Edit Contest"}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Contest Name"
              value={values.contestName}
              onChange={(e) => setValues((v) => ({ ...v, contestName: e.target.value }))}
              required
              autoFocus
            />
            <TextField
              label="Category"
              value={values.categoryName}
              onChange={(e) => setValues((v) => ({ ...v, categoryName: e.target.value }))}
              required
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