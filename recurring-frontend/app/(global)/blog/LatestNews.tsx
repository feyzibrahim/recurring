import Image1 from "@/public/img/latest-news/Image1.png";
import Image2 from "@/public/img/latest-news/Image2.png";
import Image3 from "@/public/img/latest-news/Image3.png";
import Image4 from "@/public/img/latest-news/Image4.png";
import Image from "next/image";

const LatestNews = () => {
  const data = [
    {
      title: "App X is now available on your wrist: Download...",
      date: "May 02, 2024",
      author: "Peter",
      tag: "Business",
      img: Image1,
    },
    {
      title: "App X is now available on your wrist: Download...",
      date: "May 02, 2024",
      author: "Peter",
      tag: "Business",
      img: Image2,
    },
    {
      title: "Apps Integrations to Boost Your Productivity",
      date: "May 02, 2024",
      author: "Nattasha",
      tag: "Marketing",
      img: Image3,
    },
    {
      title: "Turn Emails & Attachments Into To-Dos with Apps",
      date: "May 02, 2024",
      author: "Robert	Oliver",
      tag: "Creative",
      img: Image4,
    },
  ];

  return (
    <div className="pb-10">
      <h2 className="text-4xl font-bold text-center my-10">
        <span className="text-foregroundAccent">Latest</span> News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.map((item, index) => (
          <div key={index}>
            <Image alt="images" src={item.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
