// import { ModeToggle } from "@/components/themeToggle";
import Recurring from "@/components/common/Recurring";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24">
      <h1>We're here to Enhance your Work & Company</h1>
      <p>
        Let's make your work more organize and easily using the <Recurring />
        Dashboard with many of the latest features in managing work every day.
      </p>
      <Button>Try for free</Button>
      <h1 className="font-bold text-xl lg:text-4xl">
        More than 25,000 teams use <Recurring />
      </h1>
    </main>
  );
}
