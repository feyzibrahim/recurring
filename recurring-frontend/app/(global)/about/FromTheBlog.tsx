import Blog1 from "@/public/about/blog1.png";
import Blog2 from "@/public/about/blog2.png";
import Blog3 from "@/public/about/blog3.png";
import Image from "next/image";

const FromTheBlog = () => {
  const data = [
    {
      img: Blog1,
      title:
        "Porttitor pharetra, consectetur viverra est nisl a, vulputate id. ",
      date: "13 Sept, 2021",
      tag: "Technology",
    },
    {
      img: Blog2,
      title: "Diam amet non placerat risus magna non volutpat.",
      date: "13 Sept, 2021",
      tag: "Technology",
    },
    {
      img: Blog3,
      title: "Volutpat volutpat turpis risus nunc in nisl habitasse leo. Duis.",
      date: "13 Sept, 2021",
      tag: "Technology",
    },
  ];

  return (
    <div className="py-20">
      <h1 className="text-2xl font-bold text-center">From the blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-5 md:px-20 mt-10">
        {data.map((blog, index) => (
          <div key={index}>
            <Image
              alt={blog.tag}
              src={blog.img}
              className="w-full rounded-t-xl"
            />
            <h3 className="font-bold py-2 line-clamp-2">{blog.title}</h3>
            <div className="flex items-center justify-between">
              <p className="text-xs">{blog.date}</p>
              <p className="text-xs">{blog.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FromTheBlog;
