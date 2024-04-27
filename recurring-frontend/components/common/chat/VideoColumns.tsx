import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsPlay } from "react-icons/bs";

interface Props {
  videos: string[];
  currentVideoNumber: number;
}

const VideoColumns = ({ videos, currentVideoNumber }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] =
    useState(currentVideoNumber);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentVideoIndex,
    afterChange: (index: number) => setCurrentVideoIndex(index),
  };

  return (
    <>
      <div
        className="w-36 md:w-44 h-fit md:h-fit cursor-pointer hover:opacity-90 relative"
        onClick={() => setIsModalOpen(true)}
      >
        <video src={videos[currentVideoNumber]} />
        <div className="absolute inset-0 flex items-center justify-center ">
          <span className="text-white text-4xl">
            <BsPlay />
          </span>
        </div>
        {videos.length > 4 && currentVideoNumber === 3 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-4xl">{videos.length - 4}+</span>
          </div>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] pb-10">
          <DialogHeader>
            <DialogTitle>Video</DialogTitle>
          </DialogHeader>
          <div className="w-[750px] h-[500px] px-5">
            <Slider {...settings}>
              {videos &&
                videos.map((video, index) => (
                  <div key={index} className="w-[750px] h-[500px] ">
                    <video
                      src={video}
                      autoPlay
                      loop
                      controls
                      className="w-full h-full"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoColumns;
