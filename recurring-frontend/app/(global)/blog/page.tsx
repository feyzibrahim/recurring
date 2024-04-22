import CheckUserExist from "@/components/common/CheckUserExist";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import Banner from "@/public/blog_banner.jpg";
import NewsArticle from "./NewsArticle";
import LatestNews from "./LatestNews";

const page = () => {
  return (
    <>
      <CheckUserExist />
      <Navbar />

      <div className="px-5 md:px-20 pt-28 w-full">
        <div className="relative">
          <h1 className="text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-foreground font-bold">
            Blog
          </h1>
          <Image alt="blog_banner" src={Banner} className="rounded-3xl" />
        </div>
        <NewsArticle />
        <LatestNews />
      </div>

      <Footer />
    </>
  );
};

export default page;
