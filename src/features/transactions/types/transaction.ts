export type TransactionStatus = "success" | "failed" | "retrying";

export type Transaction = {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
  status: TransactionStatus;
  isDownloading?: boolean;
};
