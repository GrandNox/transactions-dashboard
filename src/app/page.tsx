import { TransactionsTable } from '@/features/transactions/components/transactions-table';

export default function HomePage() {
  return (
    <main className="h-screen overflow-hidden bg-neutral-100 px-6 py-10">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Transactions Dashboard
          </h1>

          <p className="mt-2 text-neutral-500">
            Manage invoices and retry failed payments.
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
}