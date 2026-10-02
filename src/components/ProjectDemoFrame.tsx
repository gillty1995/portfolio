import type { ReactNode } from "react";

interface ProjectDemoFrameProps {
  device: "iphone" | "laptop";
  children: ReactNode;
  className?: string;
}

// Screen contours measured in the original PNG's coordinates. A small overlap
// into the black bezel covers the placeholder's antialiased edge when scaled.
const phoneScreenRows = [
  [460, 1541, 2052], [462, 1517, 2080], [464, 1503, 2094],
  [468, 1487, 2110], [478, 1465, 2132], [488, 1453, 2146],
  [498, 1443, 2156], [508, 1435, 2164], [518, 1429, 2170],
  [528, 1425, 2174], [538, 1421, 2176], [548, 1419, 2180],
  [558, 1417, 2180], [578, 1417, 2182], [600, 1415, 2182],
  [1000, 1415, 2184], [1900, 1415, 2184], [1992, 1417, 2182],
  [2002, 1417, 2182], [2012, 1419, 2180], [2022, 1419, 2178],
  [2032, 1423, 2176], [2042, 1425, 2172], [2052, 1431, 2168],
  [2062, 1437, 2162], [2072, 1445, 2154], [2082, 1455, 2144],
  [2092, 1471, 2128], [2102, 1497, 2102], [2106, 1523, 2076],
  [2108, 1581, 2010], [2109, 1581, 1875],
];

const phoneScreen = { x: 1414, y: 460, width: 771, height: 1649 };
const screenPoint = (x: number, y: number) =>
  `${((x - phoneScreen.x) / phoneScreen.width) * 100}% ${
    ((y - phoneScreen.y) / phoneScreen.height) * 100
  }%`;
const phoneClip = `polygon(${[
  ...phoneScreenRows.map(([y, left]) => screenPoint(left, y)),
  ...[...phoneScreenRows].reverse().map(([y, , right]) => screenPoint(right, y)),
].join(", ")})`;

const frames = {
  iphone: {
    image: "/images/device-mockups/mockuper-iphone.png",
    imageWidth: 3600,
    imageHeight: 2520,
    crop: { x: 1364, y: 421, width: 878, height: 1771 },
    screen: phoneScreen,
    clip: phoneClip,
  },
  laptop: {
    image: "/images/device-mockups/mockuper-laptop.png",
    imageWidth: 3000,
    imageHeight: 2076,
    crop: { x: 388, y: 441, width: 2198, height: 1285 },
    screen: { x: 618, y: 466, width: 1771, height: 1124 },
    // The photographed display has a slight slope along its top and bottom.
    clip: "polygon(0 0, 100% 0.36%, 100% 99.64%, 0 100%)",
  },
};

export default function ProjectDemoFrame({
  device,
  children,
  className = "",
}: ProjectDemoFrameProps) {
  const { image, imageWidth, imageHeight, crop, screen, clip } = frames[device];

  return (
    <div
      className={`relative w-full ${device === "iphone" ? "max-w-[292px]" : "max-w-[820px]"} ${className}`}
      style={{
        ...(device === "iphone" ? { width: "min(86vw, 26.5vh, 292px)" } : {}),
        aspectRatio: `${crop.width} / ${crop.height}`,
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      >
        <image href={image} width={imageWidth} height={imageHeight} />
      </svg>
      <div
        className={`absolute overflow-hidden bg-black ${device === "iphone" ? "[&_video]:scale-[1.006]" : ""}`}
        style={{
          left: `${((screen.x - crop.x) / crop.width) * 100}%`,
          top: `${((screen.y - crop.y) / crop.height) * 100}%`,
          width: `${(screen.width / crop.width) * 100}%`,
          height: `${(screen.height / crop.height) * 100}%`,
          clipPath: clip,
          // Bleed beneath the bezel so fractional scaling cannot reveal a seam.
          transform: "scale(1.004)",
        }}
      >
        {device === "laptop" ? (
          // Keep the entire rectangular recording inside the sloped screen edge.
          <div className="absolute inset-[0.5%]">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
