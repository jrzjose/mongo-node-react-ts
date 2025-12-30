
import * as React from "react";
import { Container, CssBaseline, Snackbar, Alert } from "@mui/material";
import { CustomersTable } from "./CustomersTable";
import { CustomerFormDialog } from "./CustomerFormDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { Customer } from "../../types/CustomersTypes";
import { listCustomers, createCustomer, updateCustomer, deleteCustomer } from "../../utils/CustomersApi";

export default function Customer() {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [formOpen, setFormOpen] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [selected, setSelected] = React.useState<Customer | null>(null);

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const [toast, setToast] = React.useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success"
  });

  const refresh = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await listCustomers();
      setCustomers(data);
    } 
    catch (err) {
      console.error(err);
      setToast({ open: true, message: "Failed to load customers", severity: "error" });
    } 
    finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { void refresh(); }, [refresh]);

  const handleCreate = () => {
    setSelected(null);
    setFormMode("create");
    setFormOpen(true);
  };

  const handleEdit = (c: Customer) => {
    setSelected(c);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleDelete = (c: Customer) => {
    setSelected(c);
    setDeleteOpen(true);
  };

  const submitForm = async (values: Omit<Customer, "id">) => {
    try {
      if (formMode === "create") {
        await createCustomer(values);
        setToast({ open: true, message: "Customer created", severity: "success" });
      } 
      else if (selected?._id) {
        await updateCustomer(selected._id, values);
        setToast({ open: true, message: "Customer updated", severity: "success" });
      } 
      else {
        // If backend doesn’t return id, you can use email as key:
        // await updateCustomer(selected!.email, values);
        setToast({ open: true, message: "Cannot update: missing id", severity: "error" });
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
      if (selected?._id) {
        await deleteCustomer(selected._id);
        setToast({ open: true, message: "Customer deleted", severity: "success" });
      } 
      else {
        // Alternative if id is not present:
        // await deleteCustomer(selected!.email);
        setToast({ open: true, message: "Cannot delete: missing id", severity: "error" });
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
        <CustomersTable
          customers={customers}
          loading={loading}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <CustomerFormDialog
          open={formOpen}
          mode={formMode}
          initial={formMode === "edit" ? selected : null}
          onCancel={() => setFormOpen(false)}
          onSubmit={submitForm}
        />

        <DeleteDialog
          open={deleteOpen}
          customer={selected}
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