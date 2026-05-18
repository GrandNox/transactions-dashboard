"use client";

import { useTransactions } from "../hooks/use-transactions";
import { RetrySelectedButton } from "./retry-selected-button";
import { TransactionRow } from "./transaction-row";

export function TransactionsTable() {
  const {
    transactions,
    selectedIds,
    downloadingIds,
    retrySelected,
    toggleSelection,
    downloadInvoice,
    notification,
    isLoading,
  } = useTransactions();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Transactions
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Review transaction history, download invoices and retry failed payments.
          </p>
        </div>

        <RetrySelectedButton
          disabled={!selectedIds.length}
          onClick={retrySelected}
        />
      </div>

      {notification ? (
        <div className="border-b border-neutral-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-900">
          {notification}
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="min-w-full h-full overflow-x-auto overflow-y-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-neutral-50">
              <tr className="text-left text-sm font-medium text-neutral-500">
                <th className="p-4 sticky top-0 bg-neutral-50"></th>
                <th className="p-4 sticky top-0 bg-neutral-50">Name</th>
                <th className="p-4 sticky top-0 bg-neutral-50">
                  Transaction ID
                </th>
                <th className="p-4 sticky top-0 bg-neutral-50">Amount</th>
                <th className="p-4 sticky top-0 bg-neutral-50">Date & Time</th>
                <th className="p-4 sticky top-0 bg-neutral-50">Status</th>
                <th className="p-4 sticky top-0 bg-neutral-50">Invoice</th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-sm text-neutral-500"
                  >
                    Loading transactions...
                  </td>
                </tr>
              </tbody>
            ) : transactions.length === 0 ? (
              <tbody>
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-sm text-neutral-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-neutral-200">
                {transactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    isSelected={selectedIds.includes(transaction.id)}
                    isDownloading={downloadingIds.includes(transaction.id)}
                    onSelect={toggleSelection}
                    onDownload={downloadInvoice}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
