export default function FeatureInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor="feature-description"
        className="block text-sm font-medium text-slate-700"
      >
        Describe your feature
      </label>
      <textarea
        id="feature-description"
        name="feature-description"
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Users can reset their password by entering their email address. They receive an email containing a password reset link. The link expires after 30 minutes."
        className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white p-3 text-sm leading-6 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none"
      />
    </div>
  );
}
