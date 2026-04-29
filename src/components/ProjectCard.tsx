"use client";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  frontendFramework: string;
  backendFramework: string;
  links: { [key: string]: string | undefined };
  challengesFaced: string;
  futureImprovements: string;
  finalThoughts: string;
  videoUrl: string;
  backgroundImage: string;
  onClick: () => void;
  active?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  backgroundImage,
  onClick,
}) => {
  const hasBackgroundImage = Boolean(backgroundImage?.trim());

  return (
    <div
      onClick={onClick}
      className="relative text-white p-6 rounded-xl shadow-xl cursor-pointer transition-transform duration-300 ease-in-out overflow-hidden w-72 h-96"
      style={{
        backgroundImage: hasBackgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #1f2937 0%, #374151 45%, #111827 100%)",
        backgroundSize: hasBackgroundImage ? "cover" : "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!hasBackgroundImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/20">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-300 mb-3">
            Current Work
          </span>
          <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-gray-200 max-w-[12rem]">
            Full-stack product work across AI, UX, and platform improvements.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
