import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AiOutlineMail } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import EmailChangeForm from "./EmailChangeForm";

const page = async () => {
  const user = await checkUserWithoutRedirect();

  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <div className="md:w-1/2 mb-5">
          <Label>
            <p className="pt-5 pb-2">Email</p>
          </Label>
          <InputWithIcon
            icon={<AiOutlineMail />}
            placeholder="You email"
            field={{ defaultValue: user && user.email }}
          />
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
                identity. Click send when you're done.
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
