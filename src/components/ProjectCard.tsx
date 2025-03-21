// src/components/ProjectCard.tsx

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
  backgroundImage: string; // Ensure backgroundImage is received as a prop
  onClick: () => void;
  active?: boolean; // Optional prop to indicate the active card
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  frontendFramework,
  backendFramework,
  links,
  challengesFaced,
  futureImprovements,
  finalThoughts,
  videoUrl,
  backgroundImage,
  onClick,
  active = false,
}) => {
  return (
    <div
      className={`relative text-white p-6 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${
        active ? "w-80 h-[32rem]" : "w-72 h-96"
      }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Make the image cover the entire card
        backgroundPosition: "center", // Center the image
      }}
      onClick={onClick}
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 rounded-xl"></div>
    </div>
  );
};

export default ProjectCard;
