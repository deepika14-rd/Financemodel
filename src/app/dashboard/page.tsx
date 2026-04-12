import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';

export const metadata: Metadata = {
  title: `Overview | Dashboard | ${config.site.name}`,
};

interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  customer: { name: string };
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

const transactions: Transaction[] = [
  {
    id: 1,
    amount: 5200,
    type: 'income',
    category: 'salary',
    date: '2026-04-01',
    customer: { name: 'Arjun Mehta' },
    status: 'delivered',
    createdAt: dayjs().subtract(3, 'day').toDate(),
  },
  {
    id: 2,
    amount: 180,
    type: 'expense',
    category: 'food',
    date: '2026-04-02',
    customer: { name: 'Neha Sharma' },
    status: 'delivered',
    createdAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 3,
    amount: 220,
    type: 'expense',
    category: 'transport',
    date: '2026-04-03',
    customer: { name: 'Rohan Verma' },
    status: 'delivered',
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 4,
    amount: 1500,
    type: 'income',
    category: 'freelance',
    date: '2026-04-04',
    customer: { name: 'Ishita Roy' },
    status: 'pending',
    createdAt: dayjs().subtract(12, 'hour').toDate(),
  },
  {
    id: 5,
    amount: 95,
    type: 'expense',
    category: 'utilities',
    date: '2026-04-05',
    customer: { name: 'Karan Malhotra' },
    status: 'delivered',
    createdAt: dayjs().subtract(6, 'hour').toDate(),
  },
  {
    id: 6,
    amount: 350,
    type: 'expense',
    category: 'entertainment',
    date: '2026-04-06',
    customer: { name: 'Simran Kaur' },
    status: 'refunded',
    createdAt: dayjs().toDate(),
  },
];

const incomes = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
const netBalance = incomes - expenses;

const sortedTransactions = [...transactions].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

const balanceTrendData = [
  {
    name: 'Balance',
    data: sortedTransactions.reduce((acc: number[], t, i) => {
      const running = (acc[i - 1] ?? 0) + (t.type === 'income' ? t.amount : -t.amount);
      acc.push(running);
      return acc;
    }, []),
  },
];

const expenseByCategory = transactions
  .filter((t) => t.type === 'expense')
  .reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + t.amount;
    return acc;
  }, {});

const categoryLabels = Object.keys(expenseByCategory);
const categorySeries = categoryLabels.map((cat) => expenseByCategory[cat]);

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Budget diff={8} trend="down" sx={{ height: '100%' }} value={`₹${expenses.toLocaleString()}`} />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalCustomers diff={12} trend="up" sx={{ height: '100%' }} value={`₹${netBalance.toLocaleString()}`} />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TasksProgress sx={{ height: '100%' }} value={87.2} />
      </Grid>

      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalProfit sx={{ height: '100%' }} value={`₹${incomes.toLocaleString()}`} />
      </Grid>

      <Grid size={{ lg: 8, xs: 12 }}>
        <Sales chartSeries={balanceTrendData} sx={{ height: '100%' }} />
      </Grid>

      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <Traffic chartSeries={categorySeries} labels={categoryLabels} sx={{ height: '100%' }} />
      </Grid>

      <Grid size={{ lg: 4, md: 6, xs: 12 }}>
        <LatestProducts
          products={[
            {
              id: 'PRD-005',
              name: 'PayEase Subscription Plan',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(18, 'minute').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'FinTrack Analytics Pro',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(41, 'minute').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Crypto Wallet Dashboard',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(5, 'minute').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Invoice Manager AI',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minute').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Expense Tracker Mobile App',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(10, 'minute').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>

      <Grid size={{ lg: 8, md: 12, xs: 12 }}>
        <LatestOrders
          orders={transactions.map((t) => ({
            id: `TXN-${t.id.toString().padStart(3, '0')}`,
            customer: t.customer,
            amount: t.amount,
            status: t.status as any,
            createdAt: t.createdAt,
          }))}
          sx={{ height: '100%' }}
        />
      </Grid>

    </Grid>
  );
}