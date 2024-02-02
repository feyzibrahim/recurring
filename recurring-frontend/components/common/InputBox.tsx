const InputBox = ({ data }: { data: any }) => {
  return (
    <div className="px-2 bg-backgroundAccent w-full h-10 rounded-md border border-border flex items-center text-sm capitalize">
      <p>{data ?? "-"}</p>
    </div>
  );
};

export default InputBox;
