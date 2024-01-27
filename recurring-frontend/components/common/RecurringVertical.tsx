import Image from "next/image";
import React from "react";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";

interface SizeProps {
  size: number;
  fontSize: string;
  styling?: string;
}
const RecurringVertical: React.FC<SizeProps> = ({
  size,
  fontSize,
  styling,
}) => {
  return (
    <div className={`flex items-center gap-4 ${styling}`}>
      <Image alt="recurring" src={Logo} width={size} height={size} />
      <h1 className={`font-bold ${fontSize}`}>
        <Recurring />
      </h1>
    </div>
  );
};

export default RecurringVertical;
