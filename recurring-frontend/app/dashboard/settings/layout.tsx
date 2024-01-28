import SettingsNav from "@/components/common/SettingsNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    firstName: "Feyz",
    lastName: "Ibrahim",
    profileImageURL:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703980800&semt=ais",
    username: "feyzee",
    email: "feyzibrahim@gmail.com",
    phoneNumber: 4892932,
    dateOfBirth: "2002/08/05",
    role: "admin",
  };

  return (
    <section className="min-h-screen p-5 w-full overflow-y-auto">
      <div className="h-48 overflow-clip w-full bg-slate-400">
        <img
          src={
            "https://img.freepik.com/premium-photo/gradient-banner-background-image-jpg-gradient-background-header_873925-53376.jpg"
          }
          alt="Background in settings"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="rounded-lg shadow-md w-full md:px-10 -mt-10">
        <div className="flex items-center mb-4">
          <div className="w-28 h-28 rounded-full mr-4 overflow-clip border-8 border-background">
            <img
              src={user.profileImageURL || "/default-profile-image.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-5">
            <p className="text-3xl font-semibold ">Settings</p>
          </div>
        </div>

        <SettingsNav />
      </div>
      {children}
    </section>
  );
}
