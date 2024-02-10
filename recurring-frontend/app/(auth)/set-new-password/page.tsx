import Recurring from "@/components/common/Recurring";
import RecurringVertical from "@/components/common/RecurringVertical";
import NewPasswordForm from "./NewPasswordForm";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md max-w-md w-full bg-backgroundAccent">
        <RecurringVertical size={25} fontSize="text-2xl" styling="mb-6" />
        <h1 className="text-2xl font-semibold mb-4">Set New Password</h1>

        <NewPasswordForm />

        <div className="text-foregroundAccent text-sm mt-4 text-right">
          <Recurring /> App &copy; 2024
        </div>
      </div>
    </div>
  );
};

export default page;
