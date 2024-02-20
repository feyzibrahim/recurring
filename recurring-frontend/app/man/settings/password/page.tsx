import PasswordForm from "./PasswordForm";

const page = async () => {
  return (
    <div className="md:px-10 py-5 w-full">
      <h1>Change Password</h1>
      <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
        Secure your account by updating your password regularly. Use the form
        below to set a new strong password.
      </p>

      <PasswordForm />
    </div>
  );
};

export default page;
