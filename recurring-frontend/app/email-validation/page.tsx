import Recurring from "@/components/common/Recurring";
import Head from "next/head";
import RecurringVertical from "@/components/common/RecurringVertical";
// import BackToHome from "@/components/common/BackToHome";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Email Verification</title>
        <meta
          name="description"
          content="An email has been sent to your email address."
        />
      </Head>

      <div className="p-8 rounded-lg shadow-md max-w-md w-full bg-backgroundAccent">
        <RecurringVertical size={25} fontSize="text-2xl" styling="mb-6" />
        <h1 className="text-2xl font-semibold mb-4">
          Please Verify You Email!
        </h1>
        <p className="text-foregroundAccent mb-6">
          An email has been sent to your email address. Please check your inbox
          and follow the instructions to complete the process.
        </p>

        <div className="flex items-center justify-between">
          {/* <BackToHome /> */}
          <div className="text-foregroundAccent text-sm">
            <Recurring /> App &copy; 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
