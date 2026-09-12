export default function LoadingState() {
  return (
    <p
      role="status"
      aria-live="polite"
      className="mt-6 text-sm font-medium text-slate-500"
    >
      Looking for things that could go wrong…
    </p>
  );
}
