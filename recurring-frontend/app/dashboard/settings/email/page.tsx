import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmailChangeForm from "./EmailChangeForm";
import EmailComponent from "@/components/common/EmailComponent";

const page = async () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <EmailComponent />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Change Email</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Change Email</DialogTitle>
              <DialogDescription>
                We will sent you a link to the below email to confirm your
                identity. Click send when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <EmailChangeForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default page;
