const InputBox = ({
  data,
  bg,
  noCapitalize,
}: {
  data: any;
  bg?: string;
  noCapitalize?: boolean;
}) => {
  return (
    <div
      className={`px-2 w-full h-10 rounded-md border border-border flex items-center text-sm ${
        !noCapitalize && "capitalize"
      } ${bg === "black" ? "bg-background" : "bg-backgroundAccent"}`}
    >
      <p>{data ?? "-"}</p>
    </div>
  );
};

export default InputBox;
