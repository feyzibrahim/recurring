import Recurring from "@/components/common/Recurring";
import Head from "next/head";
import RecurringVertical from "@/components/common/RecurringVertical";
import PasswordResetForm from "./PasswordResetForm";
import Footer from "@/components/common/Footer";

const PasswordResetChangePage = ({ params }: { params: { token: string } }) => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Password Reset</title>
          <meta
            name="description"
            content="Complete the password reset process."
          />
        </Head>

        <div className="p-8 rounded-lg shadow-md max-w-md w-full bg-backgroundAccent">
          <RecurringVertical size={25} fontSize="text-2xl" styling="mb-6" />
          <h1 className="text-2xl font-semibold mb-4">Reset Your Password</h1>

          <PasswordResetForm token={params.token} />

          <div className="text-foregroundAccent text-sm mt-4 text-right">
            <Recurring /> App &copy; 2024
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordResetChangePage;
