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
  active = false,
}) => {
  // Use different sizes for mobile vs. larger screens:
  // For mobile, we use smaller fixed sizes.
  // For larger screens, we use bigger sizes.
  return (
    <div
      onClick={onClick}
      className={`relative text-white p-6 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out 
         ${
           active
             ? "w-64 h-80 md:w-80 md:h-[32rem]"
             : "w-56 h-72 md:w-72 md:h-96"
         }`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional: a semi-transparent overlay */}
      <div className="absolute inset-0 rounded-xl"></div>
    </div>
  );
};

export default ProjectCard;
