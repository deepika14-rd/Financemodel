import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadIcon } from '@phosphor-icons/react/Download';
import { PlusIcon } from '@phosphor-icons/react/Plus';
import { UploadIcon } from '@phosphor-icons/react/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = {
  title: `Transactions | Finance Dashboard | ${config.site.name}`,
} satisfies Metadata;

const customers = [
  {
    id: 'TXN-010',
    name: 'Rahul Sharma',
    avatar: '/assets/avatar-9.png',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    address: { city: 'Delhi', country: 'India', state: 'Delhi', street: 'Connaught Place' },
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'TXN-009',
    name: 'Ananya Verma',
    avatar: '/assets/avatar-3.png',
    email: 'ananya.verma@example.com',
    phone: '9123456780',
    address: { city: 'Mumbai', country: 'India', state: 'Maharashtra', street: 'Bandra West' },
    createdAt: dayjs().subtract(5, 'hour').toDate(),
  },
  {
    id: 'TXN-008',
    name: 'Aarav Mehta',
    avatar: '/assets/avatar-2.png',
    email: 'aarav.mehta@example.com',
    phone: '9988776655',
    address: { city: 'Pune', country: 'India', state: 'Maharashtra', street: 'Hinjewadi' },
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'TXN-007',
    name: 'Simran Kaur',
    avatar: '/assets/avatar-1.png',
    email: 'simran.kaur@example.com',
    phone: '9090909090',
    address: { city: 'Chandigarh', country: 'India', state: 'Punjab', street: 'Sector 17' },
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'TXN-006',
    name: 'Vikram Singh',
    avatar: '/assets/avatar-6.png',
    email: 'vikram.singh@example.com',
    phone: '9012345678',
    address: { city: 'Jaipur', country: 'India', state: 'Rajasthan', street: 'MI Road' },
    createdAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 'TXN-005',
    name: 'Neha Kapoor',
    avatar: '/assets/avatar-5.png',
    email: 'neha.kapoor@example.com',
    phone: '9345678901',
    address: { city: 'Hyderabad', country: 'India', state: 'Telangana', street: 'Hitech City' },
    createdAt: dayjs().subtract(3, 'day').toDate(),
  },
  {
    id: 'TXN-004',
    name: 'Rohit Yadav',
    avatar: '/assets/avatar-4.png',
    email: 'rohit.yadav@example.com',
    phone: '9234567890',
    address: { city: 'Lucknow', country: 'India', state: 'Uttar Pradesh', street: 'Hazratganj' },
    createdAt: dayjs().subtract(4, 'day').toDate(),
  },
  {
    id: 'TXN-003',
    name: 'Priya Nair',
    avatar: '/assets/avatar-7.png',
    email: 'priya.nair@example.com',
    phone: '9871234560',
    address: { city: 'Kochi', country: 'India', state: 'Kerala', street: 'MG Road' },
    createdAt: dayjs().subtract(5, 'day').toDate(),
  },
  {
    id: 'TXN-002',
    name: 'Karan Malhotra',
    avatar: '/assets/avatar-8.png',
    email: 'karan.malhotra@example.com',
    phone: '9765432109',
    address: { city: 'Bangalore', country: 'India', state: 'Karnataka', street: 'Whitefield' },
    createdAt: dayjs().subtract(6, 'day').toDate(),
  },
  {
    id: 'TXN-001',
    name: 'Ishita Roy',
    avatar: '/assets/avatar-9.png',
    email: 'ishita.roy@example.com',
    phone: '9654321098',
    address: { city: 'Kolkata', country: 'India', state: 'West Bengal', street: 'Park Street' },
    createdAt: dayjs().subtract(7, 'day').toDate(),
  },
] satisfies Customer[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Transactions</Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>

        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>

      <CustomersFilters />

      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}