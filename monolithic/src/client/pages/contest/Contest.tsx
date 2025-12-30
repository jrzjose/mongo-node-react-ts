
import * as React from "react";
import { Container, CssBaseline, Snackbar, Alert } from "@mui/material";
import { ContestTable } from "./ContestTable";
import { ContestFormDialog } from "./ContestFormDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { Contest } from "../../types/ContestTypes";
import {
  fetchContests, createContest, updateContest, deleteContest
} from "../../utils/ContestsApi";

export default function Contest() {
  const [contests, setContests] = React.useState<Contest[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selected, setSelected] = React.useState<Contest | null>(null);

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [toast, setToast] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchContests();
      setContests(data);
    } 
    catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to load contests", severity: "error" });
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

  const handleEdit = (contest: Contest) => {
    setSelected(contest);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (contest: Contest) => {
    setSelected(contest);
    setDeleteOpen(true);
  };

  const submitForm = async (values: Omit<Contest, "id">) => {
    try {
      if (formMode === "create") {
        await createContest(values);
        setToast({ open: true, message: "Contest created", severity: "success" });
      } else if (selected) {
        console.log(values);
        await updateContest(selected.id, values);
        setToast({ open: true, message: "Contest updated", severity: "success" });
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
        await deleteContest(selected.id);
        setToast({ open: true, message: "Contest deleted", severity: "success" });
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
        <ContestTable
          contests={contests}
          loading={loading}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ContestFormDialog
          open={formOpen}
          mode={formMode}
          initial={formMode === "edit" ? selected : null}
          onCancel={() => setFormOpen(false)}
          onSubmit={submitForm}
        />

        <DeleteDialog
          open={deleteOpen}
          contest={selected}
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