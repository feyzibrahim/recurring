import Recurring from "@/components/common/Recurring";
import Head from "next/head";
import RecurringVertical from "@/components/common/RecurringVertical";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Link Expired</title>
          <meta
            name="description"
            content="Link Expired cannot access anymore"
          />
        </Head>

        <div className="p-8 rounded-lg shadow-md max-w-md w-full bg-backgroundAccent">
          <RecurringVertical size={25} fontSize="text-2xl" styling="mb-6" />
          <h1 className="text-2xl font-semibold mb-4 text-red-500">
            Link Expired
          </h1>

          <div className="flex items-center justify-between">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
            <div className="text-foregroundAccent text-sm mt-4">
              <Recurring /> App &copy; 2024
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
