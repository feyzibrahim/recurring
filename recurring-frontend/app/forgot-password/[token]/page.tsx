// PasswordResetChangePage.js
import Recurring from "@/components/common/Recurring";
import Head from "next/head";
import RecurringVertical from "@/components/common/RecurringVertical";
import BackToHome from "@/components/common/BackToHome";

const PasswordResetChangePage = () => {
  return (
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
        <p className="text-foregroundAccent mb-6">
          We've sent you an email with instructions to reset your password.
          Please check your inbox and follow the steps to create a new password.
        </p>

        {/* Add your password reset form here */}
        {/* Example: */}
        {/* <PasswordResetForm /> */}

        <div className="flex items-center justify-between">
          <BackToHome />
          <div className="text-foregroundAccent text-sm">
            <Recurring /> App &copy; 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetChangePage;
