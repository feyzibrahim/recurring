"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { format } from "date-fns";
import InputBox from "@/components/common/InputBox";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import {
  deleteEmployee,
  getEmployee,
} from "@/app/lib/features/employee/employeeActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const EmployeeDetails = ({ id }: { id: string }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { employee, loading } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, []);

  const deleteHandler = () => {
    dispatch(deleteEmployee(id)).then(() => {
      router.back();
    });
  };

  return (
    <div>
      <div className="md:py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div>
            <div className="rounded-md bg-backgroundAccent py-10">
              <div className="w-36 h-36 rounded-full overflow-clip mx-auto">
                <Image
                  src={UserAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Hiring Date</p>
              </Label>
              <InputBox
                data={
                  employee &&
                  employee.hiringDate &&
                  format(new Date(employee?.hiringDate), "MMMM d, yyyy")
                }
              />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Salary</p>
              </Label>
              <InputBox data={employee && employee.salary} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Role</p>
              </Label>
              <InputBox data={employee && employee.role} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Employee Type</p>
              </Label>
              <InputBox data={employee && employee.employeeType} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Gender</p>
              </Label>
              <InputBox data={employee && employee.gender} />
            </div>
          </div>
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>
                  <p className="pt-5 pb-2">First Name</p>
                </Label>
                <InputBox data={employee && employee.firstName} />
              </div>
              <div>
                <Label>
                  <p className="pt-5 pb-2">Last Name</p>
                </Label>
                <InputBox data={employee && employee.lastName} />
              </div>
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Email</p>
              </Label>
              <InputBox data={employee && employee.email} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Username</p>
              </Label>
              <InputBox data={employee && employee.username} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Phone Number</p>
              </Label>
              <InputBox data={employee && employee.phoneNumber} />
            </div>
            <div>
              <Label>
                <p className="pt-5 pb-2">Street</p>
              </Label>
              <InputBox
                data={employee && employee.address && employee.address.street}
              />
            </div>
            <div className="md:flex gap-5">
              <div className="w-full">
                <Label>
                  <p className="pt-5 pb-2">City</p>
                </Label>
                <InputBox
                  data={employee && employee.address && employee.address.city}
                />
              </div>
              <div className="w-full">
                <Label>
                  <p className="pt-5 pb-2">State</p>
                </Label>
                <InputBox
                  data={employee && employee.address && employee.address.state}
                />
              </div>
              <div className="w-full">
                <Label>
                  <p className="pt-5 pb-2">Country</p>
                </Label>
                <InputBox
                  data={
                    employee && employee.address && employee.address.country
                  }
                />
              </div>
            </div>
            <div className="w-full mb-5">
              <Label>
                <p className="pt-5 pb-2">Zip Code</p>
              </Label>
              <InputBox
                data={employee && employee.address && employee.address.zipCode}
              />
            </div>
            <Link href="edit">
              <Button>Edit Employee Details</Button>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="ml-5"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Delete Employee"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Delete Employee?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can't be undone...
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteHandler()}>
                    Yes!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
