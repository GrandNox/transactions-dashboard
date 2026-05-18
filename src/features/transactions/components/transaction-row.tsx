import { LoadingSpinner } from "@/shared/components/loading-spinner";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Transaction } from "../types/transaction";
import { StatusBadge } from "./status-badge";

type Props = {
  transaction: Transaction;
  isSelected: boolean;
  isDownloading: boolean;
  onSelect: (id: string) => void;
  onDownload: (id: string) => Promise<void>;
};

export function TransactionRow({
  transaction,
  isSelected,
  isDownloading,
  onSelect,
  onDownload,
}: Props) {
  return (
    <tr className="transition-colors hover:bg-neutral-50">
      <td className="p-4">
        {transaction.status === "retrying" ? (
          <LoadingSpinner />
        ) : transaction.status === "failed" ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(transaction.id)}
            className="h-4 w-4 cursor-pointer"
          />
        ) : null}
      </td>

      <td className="p-4 text-sm font-medium">{transaction.name}</td>
      <td className="p-4 text-sm text-neutral-600">
        {transaction.id}
      </td>

      <td className="p-4 text-sm">{formatCurrency(transaction.amount)}</td>

      <td className="p-4 text-sm text-neutral-600">
        {formatDate(transaction.createdAt)}
      </td>

      <td className="p-4">
        <StatusBadge status={transaction.status} />
      </td>

      <td className="p-4">
        <button
          onClick={() => onDownload(transaction.id)}
          disabled={isDownloading || transaction.status === "retrying"}
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDownloading
            ? "Generating PDF..."
            : transaction.status === "retrying"
              ? "Please wait…"
              : "Download Invoice"}
        </button>
      </td>
    </tr>
  );
}
