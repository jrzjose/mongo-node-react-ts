
import * as React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Box
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Customer } from "../../types/CustomersTypes";
import dayjs, { Dayjs } from "dayjs";

export interface CustomerFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initial?: Customer | null;
  onCancel: () => void;
  onSubmit: (values: Omit<Customer, "id">) => void;
  submitting?: boolean;
}

export function CustomerFormDialog({
  open, mode, initial, onCancel, onSubmit, submitting
}: CustomerFormDialogProps) {
  const [customer, setCustomer] = React.useState<string>(initial?.customer ?? "");
  const [email, setEmail] = React.useState<string>(initial?.email ?? "");
  const [street, setStreet] = React.useState<string>(initial?.address.street ?? "");
  const [city, setCity] = React.useState<string>(initial?.address.city ?? "");
  const [zip, setZip] = React.useState<string>(initial?.address.zip ?? "");
  const [joinDate, setJoinDate] = React.useState<Dayjs | null>(initial ? dayjs(initial.joinDate) : dayjs());

  React.useEffect(() => {
    if (open) {
      setCustomer(initial?.customer ?? "");
      setEmail(initial?.email ?? "");
      setStreet(initial?.address.street ?? "");
      setCity(initial?.address.city ?? "");
      setZip(initial?.address.zip ?? "");
      setJoinDate(initial ? dayjs(initial.joinDate) : dayjs());
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.trim() || !email.trim() || !street.trim() || !city.trim() || !zip.trim() || !joinDate) return;

    onSubmit({
      customer,
      email,
      address: { street, city, zip },
      joinDate: joinDate.toISOString()
    });
  };

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "create" ? "Create Customer" : "Edit Customer"}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} required fullWidth autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Street" value={street} onChange={(e) => setStreet(e.target.value)} required fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} required fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} required fullWidth />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Join Date"
                  value={joinDate}
                  onChange={(val) => setJoinDate(val)}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={submitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            {mode === "create" ? "Create" : "Save"}
          </Button>
               </DialogActions>
      </Box>
    </Dialog>
  );
}