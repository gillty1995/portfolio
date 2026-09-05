import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen w-full items-center justify-center bg-white"
    >
      <Image
        src="/images/loading.gif"
        alt=""
        aria-hidden="true"
        width={50}
        height={50}
        unoptimized
        priority
        className="h-24 w-24"
      />
      <span className="sr-only">Loading portfolio</span>
    </div>
  );
}
