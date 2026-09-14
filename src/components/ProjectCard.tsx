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
  description,
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
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
        <span className="text-[0.58rem] uppercase tracking-[0.22em] text-white/70">
          Project
        </span>
        <h3 className="mt-2 text-2xl font-medium leading-tight text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/80">
          {description}
        </p>
        <span className="mt-4 inline-flex text-[0.62rem] uppercase tracking-[0.16em] text-white">
          View case study <span aria-hidden="true" className="ml-2">→</span>
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
