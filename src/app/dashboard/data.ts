import dayjs from 'dayjs';

export interface Transaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  customer: { name: string };
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    amount: 5000,
    type: 'income',
    category: 'salary',
    date: '2026-04-01',
    customer: { name: 'John Doe' },
    status: 'delivered',
    createdAt: dayjs().subtract(3, 'day').toDate(),
  },
  {
    id: 2,
    amount: 200,
    type: 'expense',
    category: 'food',
    date: '2026-04-02',
    customer: { name: 'John Doe' },
    status: 'delivered',
    createdAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 3,
    amount: 150,
    type: 'expense',
    category: 'transport',
    date: '2026-04-03',
    customer: { name: 'John Doe' },
    status: 'delivered',
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 4,
    amount: 1200,
    type: 'income',
    category: 'freelance',
    date: '2026-04-04',
    customer: { name: 'Jane Smith' },
    status: 'pending',
    createdAt: dayjs().subtract(12, 'hours').toDate(),
  },
  {
    id: 5,
    amount: 75,
    type: 'expense',
    category: 'utilities',
    date: '2026-04-05',
    customer: { name: 'John Doe' },
    status: 'delivered',
    createdAt: dayjs().subtract(6, 'hours').toDate(),
  },
  {
    id: 6,
    amount: 300,
    type: 'expense',
    category: 'entertainment',
    date: '2026-04-06',
    customer: { name: 'John Doe' },
    status: 'refunded',
    createdAt: dayjs().toDate(),
  },
];

export const getDashboardData = (transactions: Transaction[]) => {
  const incomes = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const netBalance = incomes - expenses;

  // Balance trend
  const sortedTransactions = [...transactions].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const balanceData = sortedTransactions.reduce((acc: number[], t, i) => {
    const isIncome = t.type === 'income';
    const running = (acc[i - 1] ?? 0) + (isIncome ? t.amount : -t.amount);
    acc.push(running);
    return acc;
  }, []);

  // Category pie & insights
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: Record<string, number>, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});
  const categoryLabels = Object.keys(expenseByCategory);
  const categorySeries = categoryLabels.map((cat) => expenseByCategory[cat]);
  const highestSpendingEntry = Object.entries(expenseByCategory).reduce((a, b) => (b[1] > a[1] ? b : a), ['', 0] as [string, number]);
  const monthlyComparison = '+12%';

  return {
    incomes,
    expenses,
    netBalance,
    balanceTrendData: [{ name: 'Balance', data: balanceData }],
    categoryLabels,
    categorySeries,
    highestSpendingCategory: highestSpendingEntry[0],
    highestSpendingAmount: highestSpendingEntry[1],
    monthlyComparison,
  };
};

