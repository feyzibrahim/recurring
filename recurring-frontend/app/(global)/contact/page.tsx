import CheckUserExist from "@/components/common/CheckUserExist";
import Navbar from "@/components/common/Navbar";
import { BsPhone } from "react-icons/bs";
import { BiMailSend, BiMap } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";

const page = () => {
  const list = [
    { icon: <BsPhone />, data: "+91 98765 43210" },
    { icon: <BiMailSend />, data: "help@recurring.site" },
    { icon: <BiMap />, data: "7th Avenue, Arstyn Campus, CLT" },
  ];

  return (
    <>
      <CheckUserExist />
      <Navbar />
      <div className="pt-20 min-h-screen">
        <div className="text-center pb-5">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p>Felis nunc, aliquet quam dictum senectus nunc.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 mx-5 md:mx-40 text-sm pt-4 md:space-x-10 md:space-y-0 space-y-5">
          <div className="col-span-2 bg-primary p-7  rounded-2xl relative overflow-clip pb-40">
            <h3 className="text-lg font-bold">Contact Information</h3>
            <p className="w-2/3">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
            {list.map((item, index) => (
              <div key={index} className="flex gap-3 items-center py-3">
                <div className="text-lg bg-white rounded-full p-2 text-primary">
                  {item.icon}
                </div>
                <p>{item.data}</p>
              </div>
            ))}
            <div className="bg-blue-400 w-80 h-80 rounded-full absolute -right-36 -bottom-36 bg-opacity-50"></div>
            <div className="bg-blue-500 w-56 h-56 rounded-full absolute -right-32 -bottom-32"></div>
          </div>
          <div className="col-span-3 space-y-5">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <p>First Name</p>
                  <Input
                    placeholder="..."
                    className="focus-visible:bg-backgroundAccent focus-visible:ring-transparent"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <p>First Name</p>
                  <Input
                    placeholder="..."
                    className="focus-visible:bg-backgroundAccent focus-visible:ring-transparent"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <p>First Name</p>
                  <Input
                    placeholder="..."
                    className="focus-visible:bg-backgroundAccent focus-visible:ring-transparent"
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <p>First Name</p>
                  <Input
                    placeholder="..."
                    className="focus-visible:bg-backgroundAccent focus-visible:ring-transparent"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div>
              <p>What service do you need? </p>
              <RadioGroup
                defaultValue="comfortable"
                className="flex gap-5 flex-wrap pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Web Design</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">App Design</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Graphic Design</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Digital Marketing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-1">
              <p>Message</p>
              <Textarea
                className="focus-visible:bg-backgroundAccent focus-visible:ring-transparent"
                placeholder="..."
              />
            </div>
            <div>
              <Button>Send Message</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
