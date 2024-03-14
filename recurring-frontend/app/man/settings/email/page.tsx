import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import EmailChangeForm from "./EmailChangeForm";
import EmailComponent from "@/components/common/EmailComponent";

const page = () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <div className="md:w-1/2 mb-5">
          <Label>
            <p className="pt-5 pb-2">Email</p>
          </Label>
          <EmailComponent />
        </div>
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
