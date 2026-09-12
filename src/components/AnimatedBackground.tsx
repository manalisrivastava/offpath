const SHOOTING_STARS = [
  { top: "8%", left: "15%", delay: "0s", duration: "7s" },
  { top: "22%", left: "70%", delay: "1.6s", duration: "9s" },
  { top: "55%", left: "5%", delay: "3.2s", duration: "8s" },
  { top: "70%", left: "55%", delay: "5s", duration: "10s" },
  { top: "12%", left: "88%", delay: "2.4s", duration: "7.5s" },
  { top: "45%", left: "35%", delay: "6.2s", duration: "8.5s" },
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
          className="shooting-star absolute h-px w-24 -rotate-45 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
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
