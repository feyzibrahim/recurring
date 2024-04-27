import CheckUserExist from "@/components/common/CheckUserExist";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Team from "./Team";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BgImage from "@/public/about/girl_look_up.png";
import FromTheBlog from "./FromTheBlog";

const page = () => {
  return (
    <>
      <CheckUserExist />
      <Navbar />

      <div className="pt-20">
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p>Pulvinar auctor nisl, volutpat turpis enim id.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-5 bg-secondary">
          <div className="p-10 border-background border-b-4 md:border-b-0 md:border-r-4 ">
            <h1 className="text-4xl font-semibold w-3/4">
              You guessed it. We&apos;re changing the game.
            </h1>
          </div>

          <div className="p-10 text-sm text-foregroundAccent">
            <p>
              Semper bibendum nisl, fermentum mi convallis. Sed vitae tincidunt
              nunc, aliquam orci. Porttitor faucibus morbi sed senectus justo,
              adipiscing augue. Est, in in pretium at libero morbi. Euismod
              viverra arcu nisi eu sit. Praesent diam non imperdiet imperdiet
              potenti tristique et. Amet nec.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-20 text-center py-20">
        <h1 className="text-2xl font-bold pb-3">Our Leadership Team</h1>
        <p className="w-2/3 mx-auto">
          Interdum ac tincidunt molestie facilisis. Nulla at erat odio bibendum
          diam quam. Scelerisque mus vel egestas justo, purus consequat nibh
          eget. Non risus feugiat porta integer.
        </p>
        <Team />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-5 md:p-20 space-y-5">
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

      <FromTheBlog />

      <Footer />
    </>
  );
};

export default page;
