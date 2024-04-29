import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import BgImage from "@/public/about/girl_look_up.png";
import Navbar from "@/components/common/Navbar";
import img1 from "@/public/testimonials/1.png";
import img2 from "@/public/testimonials/2.png";
import img3 from "@/public/testimonials/3.png";
import img4 from "@/public/testimonials/4.png";
import img5 from "@/public/testimonials/5.png";
import img6 from "@/public/testimonials/6.png";
import img7 from "@/public/testimonials/7.png";
import img8 from "@/public/testimonials/8.png";
import img9 from "@/public/testimonials/9.png";
import Footer from "@/components/common/Footer";

const page = () => {
  const data = [
    {
      company: "Gillette",
      name: "Darrell Steward",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis",
      img: img1,
    },
    {
      company: "eBay",
      name: "Theresa Webb",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan.",
      img: img2,
    },
    {
      company: "Facebook",
      name: "Marvin McKinney",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis velit leo lectus diam velit congue. Sagittis, at id viverra enim euismod. Non leo commodo, maecenas egestas pharetra.",
      img: img3,
    },
    {
      company: "Louis Vuitton",
      name: "Jenny Wilson",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis velit leo lectus diam velit congue. Sagittis, at id viverra enim euismod. Non leo commodo, maecenas egestas pharetra.",
      img: img4,
    },
    {
      company: "Mitsubishi",
      name: "Cameron Williamson",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis velit leo lectus diam velit congue. Sagittis, at id viverra enim euismod. Non leo commodo, maecenas egestas pharetra.",
      img: img5,
    },
    {
      company: "McDonald's",
      name: "Kristin Watson",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan.",
      img: img6,
    },
    {
      company: "Louis Vuitton",
      name: "Dianne Russell",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan.",
      img: img7,
    },
    {
      company: "MasterCard",
      name: "Eleanor Pena",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis velit leo lectus diam velit congue. Sagittis, at id viverra enim euismod. Non leo commodo, maecenas egestas pharetra.",
      img: img8,
    },
    {
      company: "Apple",
      name: "Floyd Miles",
      comment:
        "Sed pretium, in et neque sed. Magna euismod ac, gravida accumsan. Viverra diam non sagittis,",
      img: img9,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="py-20 px-5 md:px-20">
        <h1 className="text-center text-xl md:text-4xl font-bold">
          Testimonials
        </h1>
        <p className="text-center">
          Pharetra velit libero eros volutpat proin bibendum.
        </p>
        <div className="columns-1 md:columns-3 space-y-5 my-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-secondary h-fit p-3 rounded-md border "
            >
              <div className="flex gap-2 items-center pb-2">
                <Image alt={item.name} src={item.img} />
                <div>
                  <h1 className="font-bold">{item.company}</h1>
                  <p className="text-foregroundAccent">{item.name}</p>
                </div>
              </div>
              <p className="text-sm">{item.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-5 md:px-20">
        <div className="pb-5 md:px-20 space-y-5">
          <h1 className="font-bold text-5xl">
            Join a global team of change-makers.
          </h1>
          <p>
            Viverra ut potenti aliquam feugiat dui imperdiet laoreet tempus sed.
            Elit cursus est lorem in est id nec. Quis diam posuere at nisl eget
            turpis sagittis nunc. Aliquet et ultrices purus, id. Sagittis erat
            nunc in parturient.
          </p>
          <Button>View Job Openings</Button>
        </div>
        <Image alt="bg" src={BgImage} />
      </div>
      <Footer />
    </>
  );
};

export default page;
