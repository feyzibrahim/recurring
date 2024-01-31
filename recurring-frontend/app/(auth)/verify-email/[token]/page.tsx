import VerifiedForm from "./VerifiedForm";

const page = ({ params }: { params: { token: string } }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <VerifiedForm token={params.token} />
    </div>
  );
};

export default page;
