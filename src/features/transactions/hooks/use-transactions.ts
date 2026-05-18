"use client";

import { useEffect, useMemo, useState } from "react";
import { mockTransactions } from "../data/mock-transactions";
import {
  generateInvoice,
  retryPayment,
} from "../services/transactions.service";
import { Transaction } from "../types/transaction";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [downloadingIds, setDownloadingIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const updateTransactionStatus = (
    id: string,
    status: Transaction["status"],
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction,
      ),
    );
  };

  const setNotificationMessage = (message: string) => {
    setNotification(message);
    window.setTimeout(() => setNotification(null), 4000);
  };

  const retrySelected = async () => {
    const retryIds = [...selectedIds];

    if (!retryIds.length) {
      return;
    }

    setSelectedIds([]);

    const results = await Promise.all(
      retryIds.map(async (id) => {
        updateTransactionStatus(id, "retrying");

        try {
          await retryPayment(id);
          updateTransactionStatus(id, "success");
          return { id, success: true };
        } catch {
          updateTransactionStatus(id, "failed");
          return { id, success: false };
        }
      }),
    );

    const successCount = results.filter((item) => item.success).length;
    const failureCount = results.length - successCount;

    setNotificationMessage(
      `Retry completed: ${successCount} succeeded${
        failureCount ? `, ${failureCount} failed` : ""
      }.`,
    );
  };

  const downloadInvoice = async (id: string) => {
    if (downloadingIds.includes(id)) {
      return;
    }

    try {
      setDownloadingIds((prev) => [...prev, id]);
      await generateInvoice(id);
      setNotificationMessage(`Invoice downloaded for transaction ${id}.`);
    } catch {
      setNotificationMessage(
        `Unable to download invoice for transaction ${id}.`,
      );
    } finally {
      setDownloadingIds((prev) => prev.filter((item) => item !== id));
    }
  };

  return {
    transactions,
    selectedIds,
    downloadingIds,
    notification,
    isLoading,
    toggleSelection,
    retrySelected,
    downloadInvoice,
  };
}
