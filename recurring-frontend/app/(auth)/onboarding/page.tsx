import { checkUserWithoutRedirect } from "@/server/checkUserWithoutRedirect";
import WelcomePage from "./WelcomePage";

const page = async () => {
  await checkUserWithoutRedirect();

  return <WelcomePage />;
};

export default page;
