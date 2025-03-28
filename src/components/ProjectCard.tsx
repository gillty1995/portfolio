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
  backgroundImage,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative text-white p-6 rounded-xl shadow-xl cursor-pointer transition-transform duration-300 ease-in-out overflow-hidden w-72 h-96"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0"></div>
    </div>
  );
};

export default ProjectCard;
