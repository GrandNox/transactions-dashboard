type Props = {
  disabled: boolean;
  onClick: () => void;
};

export function RetrySelectedButton({ disabled, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Retry Selected
    </button>
  );
}
