import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { HiCheckCircle } from "react-icons/hi";

export default function Plans() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Choose Plan </h1>
      <h1 className="text-3xl font-bold">That's Right For You</h1>
      <p className="text-foregroundAccent py-5">
        Choose plan that works best for you, feel free to contact us
      </p>
      <Tabs defaultValue="monthly">
        <TabsList className="shadow-md">
          <TabsTrigger
            value="monthly"
            className="active:bg-blue-500 active:text-white"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly">yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-8 px-16">
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Free</h4>
              <p className="text-foregroundAccent">
                Have a go and test your superpowers
              </p>
              <h1 className="text-4xl py-3 font-bold">₹0</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5 Employee
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />2
                  Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Public Share & Comments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Chat Support{" "}
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5 Projects
                </p>
              </div>
              <Button variant="outline" className="my-5">
                Sign Up for free
              </Button>
            </div>
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Pro</h4>
              <p className="text-foregroundAccent">
                Experiment the power of infinite possibilities
              </p>
              <h1 className="text-4xl py-3 font-bold">₹49</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  All the features of free plan
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  20 Employees
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5
                  Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  10 Video Meetings/Month
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Salary Payroll
                </p>
              </div>
              <Button className="my-5">Goto pro</Button>
            </div>
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Business</h4>
              <p className="text-foregroundAccent">
                Unveil new superpowers and join the Design League
              </p>
              <h1 className="text-4xl py-3 font-bold">₹499</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  All the features of pro plan
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Employee
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Meetings
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Dedicated Service
                </p>
              </div>
              <Button variant="outline" className="my-5">
                Goto Business
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="yearly">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-8 px-16">
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Free</h4>
              <p className="text-foregroundAccent">
                Have a go and test your superpowers
              </p>
              <h1 className="text-4xl py-3 font-bold">₹0</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5 Employee
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />2
                  Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Public Share & Comments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Chat Support{" "}
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5 Projects
                </p>
              </div>
              <Button variant="outline" className="my-5">
                Sign Up for free
              </Button>
            </div>
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Pro</h4>
              <p className="text-foregroundAccent">
                Experiment the power of infinite possibilities
              </p>
              <h1 className="text-4xl py-3 font-bold">₹499</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  All the features of free plan
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  20 Employees
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />5
                  Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  10 Video Meetings/Month
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Salary Payroll
                </p>
              </div>
              <Button className="my-5">Goto pro</Button>
            </div>
            <div className="bg-backgroundAccent rounded-xl p-5">
              <h4 className="text-xl font-bold">Business</h4>
              <p className="text-foregroundAccent">
                Unveil new superpowers and join the Design League
              </p>
              <h1 className="text-4xl py-3 font-bold">₹4999</h1>
              <div className="flex flex-col gap-3">
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  All the features of pro plan
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Employee
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Departments
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Unlimited Meetings
                </p>
                <p className="flex gap-2 items-center">
                  <HiCheckCircle className="text-primary text-xl" />
                  Dedicated Service
                </p>
              </div>
              <Button variant="outline" className="my-5">
                Goto Business
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
