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
        className="block text-sm font-semibold text-slate-800"
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
        className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-[15px] leading-6 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none"
      />
    </div>
  );
}
