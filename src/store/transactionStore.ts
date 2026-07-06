import { create } from 'zustand';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number; // negative = expense, positive = income
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

// Seed data so the dashboard isn't empty on first launch.
// Later this gets replaced by data fetched from Supabase.
const SEED: Transaction[] = [
  { id: '1', title: 'Lunch', category: 'food', date: 'Jun 29', amount: -320 },
  { id: '2', title: 'Uber', category: 'travel', date: 'Jun 29', amount: -180 },
  {
    id: '3',
    title: 'Salary',
    category: 'income',
    date: 'Jun 28',
    amount: 40000,
  },
  {
    id: '4',
    title: 'Amazon',
    category: 'shopping',
    date: 'Jun 27',
    amount: -1499,
  },
  {
    id: '5',
    title: 'Netflix',
    category: 'other',
    date: 'Jun 26',
    amount: -649,
  },
];

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: SEED,
  addTransaction: transaction =>
    set(state => ({
      transactions: [
        { ...transaction, id: Date.now().toString() },
        ...state.transactions,
      ],
    })),
  deleteTransaction: id =>
    set(state => ({
      transactions: state.transactions.filter(t => t.id !== id),
    })),
}));
