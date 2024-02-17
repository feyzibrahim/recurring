import EmptyMessage from "@/components/empty/EmptyMessage";

const page = () => {
  return (
    <div className="col-span-3 h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-fit ">
        <EmptyMessage />
        <p className="mt-2">Chat will display here</p>
        <p className="text-sm py-2">Please Select One from the left side</p>
      </div>
    </div>
  );
};

export default page;
