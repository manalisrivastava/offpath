const SHOOTING_STARS = [
  { top: "8%", left: "10%", delay: "0s", duration: "8s" },
  { top: "35%", left: "55%", delay: "3s", duration: "9s" },
  { top: "15%", left: "75%", delay: "6s", duration: "10s" },
];

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="bg-orb absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-3xl"
        style={{ animation: "drift-a 22s ease-in-out infinite" }}
      />
      <div
        className="bg-orb absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-3xl"
        style={{ animation: "drift-b 26s ease-in-out infinite" }}
      />

      {SHOOTING_STARS.map((star, index) => (
        <span
          key={index}
          className="shooting-star absolute h-px w-56 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: star.top,
            left: star.left,
            animation: `shoot ${star.duration} ease-in infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
