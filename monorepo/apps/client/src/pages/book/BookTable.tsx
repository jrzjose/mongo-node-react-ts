
import * as React from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Toolbar, Typography, Button, Stack
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Book } from "../../types/BookTypes";

export interface BookTableProps {
  books: Book[];
  onCreate: () => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  loading?: boolean;
}

export function BookTable({ books, onCreate, onEdit, onDelete, loading }: BookTableProps) {
  return (
    <Paper elevation={1}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
          <Typography variant="h6">Books</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            New Book
          </Button>
        </Stack>
      </Toolbar>

      <TableContainer component={Box}>
        <Table size="small" aria-label="books table">
          <TableHead>
            <TableRow>
              <TableCell width="20%">Description</TableCell>
              <TableCell width="15%">author</TableCell>
              <TableCell width="25%">Summary</TableCell>
              <TableCell width="20%">ID</TableCell>
              <TableCell width="10%" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading…</TableCell>
              </TableRow>
            ) : books.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No books found.</TableCell>
              </TableRow>
            ) : (
              books.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.description}</TableCell>
                  <TableCell>{c.author}</TableCell>
                  <TableCell>{c.summary}</TableCell>
                  <TableCell>{c.id}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" size="small" onClick={() => onEdit(c)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" color="error" onClick={() => onDelete(c)}>
                      <DeleteIcon />
                    </IconButton>
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

