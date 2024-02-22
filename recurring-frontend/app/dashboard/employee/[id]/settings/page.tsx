import EmployeeNav from "../EmployeeNav";
import SettingsPage from "./components/SettingsPage";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-5">
      <EmployeeNav params={params} />
      <SettingsPage id={params.id} />
    </div>
  );
};

export default page;
