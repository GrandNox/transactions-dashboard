export const retryPayment = async (transactionId: string) => {
  const delay = Math.random() * 3000 + 1000;

  await new Promise((resolve) => setTimeout(resolve, delay));

  const isSuccessful = Math.random() > 0.2;

  if (!isSuccessful) {
    throw new Error(`Payment retry failed for ${transactionId}`);
  }

  return true;
};

export const generateInvoice = async (transactionId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const blob = new Blob([`Invoice for transaction ${transactionId}`], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `invoice-${transactionId}.pdf`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => URL.revokeObjectURL(url), 200);
};
