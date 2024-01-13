import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Text() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="bg-background h-screen flex items-center justify-center dark">
      <img
        alt="sfa"
        src={
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        }
        className="h-10 w-10 rounded-md"
      />
      <div className="ml-5">
        <p className="w-36 dark:text-white">Hello World</p>
        <p className="dark:text-white">@helloworld</p>
      </div>
      <Dialog>
        <DialogTrigger className="dark:text-white">Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
