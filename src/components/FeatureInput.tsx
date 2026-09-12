export default function FeatureInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor="feature-description" className="sr-only">
        Describe your feature
      </label>
      <textarea
        id="feature-description"
        name="feature-description"
        rows={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Users can reset their password by entering their email address. They receive an email containing a password reset link. The link expires after 30 minutes."
        className="command-textarea w-full resize-none border-0 bg-transparent p-2 text-[15px] leading-6 text-zinc-100 placeholder:text-zinc-500 focus:ring-0 focus:outline-none"
      />
    </div>
  );
}
