'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type { SxProps } from '@mui/material/styles';
import dayjs from 'dayjs';

// ✅ FIXED ICON IMPORTS (FINAL)
import { MagnifyingGlassIcon, ArrowRightIcon } from '@phosphor-icons/react';

import type { Transaction } from '@/app/dashboard/data';

interface TransactionsTableProps {
  transactions: Transaction[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: 'all' | 'income' | 'expense';
  onTypeFilterChange: (filter: 'all' | 'income' | 'expense') => void;
  sx?: SxProps;
}

export function TransactionsTable({
  transactions,
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  sx,
}: TransactionsTableProps): React.JSX.Element {

  const filteredTransactions = React.useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = typeFilter === 'all' || t.type === typeFilter;

      const matchesSearch =
        searchQuery === '' ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [transactions, searchQuery, typeFilter]);

  return (
    <Card sx={sx}>
      <CardHeader title="Recent Transactions" />

      <CardContent>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}
          >
            <TextField
              fullWidth
              label="Search category or type"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="e.g. food, salary"
              size="small"
              sx={{ flex: 1, minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon fontSize="var(--icon-fontSize-sm)" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={typeFilter}
                onChange={(e) =>
                  onTypeFilterChange(e.target.value as 'all' | 'income' | 'expense')
                }
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Customer</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow hover key={transaction.id}>
                  <TableCell>
                    <Typography variant="body2">
                      TXN-{transaction.id.toString().padStart(3, '0')}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body2"
                      color={
                        transaction.type === 'income'
                          ? 'success.main'
                          : 'error.main'
                      }
                    >
                      {transaction.type.toUpperCase()}
                    </Typography>
                  </TableCell>

                  <TableCell>{transaction.category}</TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      ₹{transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {dayjs(transaction.createdAt).format('MMM D, YYYY')}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={transaction.status.toUpperCase()}
                      color={
                        transaction.status === 'delivered'
                          ? 'success'
                          : transaction.status === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>{transaction.customer.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredTransactions.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" variant="body2">
              No transactions found
            </Typography>
          </Box>
        )}
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}