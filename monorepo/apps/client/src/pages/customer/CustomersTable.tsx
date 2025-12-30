
import * as React from "react";
import {
  Box, Paper, Toolbar, Typography, Button, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Customer } from "../../types/CustomersTypes";
import dayjs from "dayjs";

export interface CustomersTableProps {
  customers: Customer[];
  loading?: boolean;
  onCreate: () => void;
  onEdit: (c: Customer) => void;
  onDelete: (c: Customer) => void;
}

export function CustomersTable({ customers, loading, onCreate, onEdit, onDelete }: CustomersTableProps) {
  return (
    <Paper elevation={1}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
          <Typography variant="h6">Customers</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            New Customer
          </Button>
        </Stack>
      </Toolbar>

      <TableContainer component={Box}>
        <Table size="small" aria-label="customers table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>ZIP</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7}>Loading…</TableCell></TableRow>
            ) : customers.length === 0 ? (
              <TableRow><TableCell colSpan={7}>No customers found.</TableCell></TableRow>
            ) : (
              customers.map((c) => (
                <TableRow key={c.id ?? c.email} hover>
                  <TableCell>{c.customer}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.address.street}</TableCell>
                  <TableCell>{c.address.city}</TableCell>
                  <TableCell>{c.address.zip}</TableCell>
                  <TableCell>{dayjs(c.joinDate).format("YYYY-MM-DD HH:mm")}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" size="small" onClick={() => onEdit(c)}><EditIcon /></IconButton>
                    <IconButton aria-label="delete" size="small" color="error" onClick={() => onDelete(c)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}