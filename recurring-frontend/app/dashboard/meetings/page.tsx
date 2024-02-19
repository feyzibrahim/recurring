import NavbarLogged from "@/components/common/NavbarLogged";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MeetingList from "./components/MeetingList";

const page = () => {
  return (
    <div className="w-full">
      <NavbarLogged />
      <div className="flex items-center justify-between pt-16 pb-2 px-5 ">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <Link href="meetings/create">
          <Button>New Meeting</Button>
        </Link>
      </div>
      <MeetingList />
    </div>
  );
};

export default page;
