import T1 from "@/public/about/Ellipse 56.png";
import T2 from "@/public/about/Ellipse 57.png";
import T3 from "@/public/about/Ellipse 58.png";
import T4 from "@/public/about/Ellipse 59.png";
import T5 from "@/public/about/Ellipse 60.png";
import T6 from "@/public/about/Ellipse 61.png";
import Image from "next/image";
const Team = () => {
  const data = [
    { img: T1, name: "Jenny Wilson", role: "Viverra ut potenti " },
    { img: T2, name: "Floyd Miles", role: "Viverra ut potenti " },
    { img: T3, name: "Cameron Williamson", role: "Viverra ut potenti " },
    { img: T4, name: "Dianne Russell", role: "Viverra ut potenti " },
    { img: T5, name: "Leslie Alexander", role: "Viverra ut potenti " },
    { img: T6, name: "Esther Howard", role: "Viverra ut potenti " },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
      {data.map((team, index) => (
        <div key={index}>
          <Image alt={team.name} src={team.img} className="mx-auto py-5" />
          <h1 className="font-bold">{team.name}</h1>
          <p className="text-sm">{team.role}</p>
        </div>
      ))}
    </div>
  );
};

export default Team;
