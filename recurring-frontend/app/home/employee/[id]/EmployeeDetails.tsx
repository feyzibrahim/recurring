"use client";

import { Label } from "@/components/ui/label";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { format } from "date-fns";
import InputBox from "@/components/common/InputBox";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { getEmployee } from "@/app/lib/features/employee/employeeActions";

const EmployeeDetails = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div>
            <div className="rounded-md bg-backgroundAccent py-10">
              <div className="w-36 h-36 rounded-full overflow-clip mx-auto">
                <Image
                  src={(employee && employee.profileImageURL) || UserAvatar}
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
              <InputBox data={employee && employee.email} noCapitalize={true} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
