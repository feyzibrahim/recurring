import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Label } from "@/components/ui/label";

const page = async () => {
  return (
    <div className="md:px-10 md:py-5 w-full">
      <div>
        <Label>
          <p className="pt-5">Theme</p>
        </Label>
        <p className="text-sm text-foregroundAccent md:w-1/2 py-2">
          Switch between light and dark themes effortlessly to enhance your user
          experience. Whether you prefer a sleek modern design or a cozy dark
          mode, YourTheme has it all.
        </p>
        <div className="flex gap-5 items-center">
          <p>Click on the Icon to switch themes: </p>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default page;
