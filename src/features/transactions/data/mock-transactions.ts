import { Transaction } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    name: 'HBO Max',
    amount: 49.99,
    createdAt: '2026-05-11T10:00:00Z',
    status: 'success',
  },
  {
    id: 'txn-2',
    name: 'Udemy',
    amount: 19.99,
    createdAt: '2026-05-12T11:30:00Z',
    status: 'failed',
  },
  {
    id: 'txn-3',
    name: 'Netflix',
    amount: 89.99,
    createdAt: '2026-04-15T13:00:00Z',
    status: 'failed',
  },
  {
    id: 'txn-4',
    name: 'YouTube',
    amount: 12.99,
    createdAt: '2026-05-15T15:20:00Z',
    status: 'success',
  },
  {
    id: 'txn-5',
    name: 'YouTube2',
    amount: 12.99,
    createdAt: '2026-05-15T15:30:00Z',
    status: 'failed',
  },
  {
    id: 'txn-6',
    name: 'YouTube3',
    amount: 12.99,
    createdAt: '2026-05-15T15:40:00Z',
    status: 'failed',
  },
  {
    id: 'txn-7',
    name: 'YouTube4',
    amount: 12.99,
    createdAt: '2026-05-15T15:50:00Z',
    status: 'success',
  },
];
