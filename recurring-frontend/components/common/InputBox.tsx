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
    <p
      className={`p-3 w-full max-h-24 line-clamp-4 rounded-md border border-border text-sm ${
        !noCapitalize && "capitalize"
      } ${bg === "black" ? "bg-background" : "bg-backgroundAccent"}`}
    >
      {data ?? "-"}
    </p>
  );
};

export default InputBox;
