import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image1 from "@/public/img/news-article/Image1.png";
import Image2 from "@/public/img/news-article/Image2.png";
import Image3 from "@/public/img/news-article/Image3.png";
import Image4 from "@/public/img/news-article/Image4.png";
import Image from "next/image";

const NewsArticle = () => {
  const data = [
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
    <>
      <div className="md:flex justify-between text-center w-full py-10">
        <h2 className="pb-5 text-4xl font-bold">
          <span className="text-foregroundAccent">News</span> Articles
        </h2>
        <div className="flex items-center gap-5">
          <Input placeholder="Enter you email" />
          <Button>Search</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Image src={Image1} alt="Some image" />
          <div className="text-center py-5 space-y-5">
            <p className="blog-tag mx-auto">Business</p>
            <h1 className="blog-h1">
              Great productivity apps you can download for free this week on
              iPhone
            </h1>
            <p className="blog-p">May 02, 2024 | Nattasha</p>
          </div>
        </div>
        <div className="space-y-10">
          {data.map((item, index) => (
            <div key={index} className="flex gap-5">
              <div className="w-3/5 md:w-1/4">
                <Image alt="ss" src={item.img} />
              </div>
              <div>
                <p className="blog-tag">{item.tag}</p>
                <h1 className="blog-h1">{item.title}</h1>
                <p className="blog-p">
                  {item.date} | {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsArticle;
