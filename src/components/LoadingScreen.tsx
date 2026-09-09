import LiquidHeroBackground from "./LiquidHeroBackground";

export default function LoadingScreen() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f0f1f1]">
      <div aria-hidden="true">
        <LiquidHeroBackground />
      </div>
      <p role="status" className="sr-only">
        Loading portfolio
      </p>
    </div>
  );
}
