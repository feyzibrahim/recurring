import Image from "next/image";
import deal_banner from "@/public/deal_banner.png";
import DealDetails from "@/components/common/deals/slug/DealDetails";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <div className="m-5 h-60 bg-backgroundAccent rounded-b-xl">
        <Image
          src={deal_banner}
          alt="deal_banner"
          className="h-48"
          width={1500}
          height={200}
        />
        <DealDetails slug={params.slug} />
      </div>
    </div>
  );
};

export default page;
