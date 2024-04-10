import CheckUserExist from "@/components/common/CheckUserExist";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

const page = () => {
  return (
    <>
      <CheckUserExist />
      <Navbar />

      <div className="pt-20 min-h-screen">
        <div className="text-center pb-5">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p>Pulvinar auctor nisl, volutpat turpis enim id.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pt-5">
          <div className="p-10 border-b-4 md:border-r-4 ">
            <h1 className="text-4xl font-semibold w-3/4">
              You guessed it. We're changing the game.
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

      <Footer />
    </>
  );
};

export default page;
