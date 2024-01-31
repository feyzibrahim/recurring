import NotificationForm from "./NotificationForm";

const page = () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <p className="pt-5">Notifications</p>
      <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
        You can turn of notifications at any time you wan&apos;t just click on
        the below checkbox. If you wan&apos;t to keep getting notifications
        please don&apos;t turn of below.
      </p>
      <NotificationForm />
    </div>
  );
};

export default page;
