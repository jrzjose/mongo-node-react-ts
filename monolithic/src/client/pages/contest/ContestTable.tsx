
import * as React from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Toolbar, Typography, Button, Stack
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Contest } from "../../types/ContestTypes";

export interface ContestTableProps {
  contests: Contest[];
  onCreate: () => void;
  onEdit: (contest: Contest) => void;
  onDelete: (contest: Contest) => void;
  loading?: boolean;
}

export function ContestTable({ contests, onCreate, onEdit, onDelete, loading }: ContestTableProps) {
  return (
    <Paper elevation={1}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
          <Typography variant="h6">Contests</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
            New Contest
          </Button>
        </Stack>
      </Toolbar>

      <TableContainer component={Box}>
        <Table size="small" aria-label="contests table">
          <TableHead>
            <TableRow>
              <TableCell width="35%">Contest Name</TableCell>
              <TableCell width="35%">Category</TableCell>
              <TableCell width="20%">ID</TableCell>
              <TableCell width="10%" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading…</TableCell>
              </TableRow>
            ) : contests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No contests found.</TableCell>
              </TableRow>
            ) : (
              contests.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.contestName}</TableCell>
                  <TableCell>{c.categoryName}</TableCell>
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

