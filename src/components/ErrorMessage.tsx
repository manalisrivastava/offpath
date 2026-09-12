export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
    >
      {message}
    </div>
  );
}
