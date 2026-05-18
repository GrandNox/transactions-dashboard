import { TransactionStatus } from "../types/transaction";

type Props = {
  status: TransactionStatus;
};

const styles = {
  success: "bg-green-100 text-green-700 border border-green-200",
  failed: "bg-red-100 text-red-700 border border-red-200",
  retrying: "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
