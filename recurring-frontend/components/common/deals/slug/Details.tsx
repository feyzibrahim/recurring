import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { Label } from "@/components/ui/label";
import React from "react";
import InputBox from "../../InputBox";
import LowMediumHigh from "../../LowMediumHigh";
import { format } from "date-fns";
import UserAvatar from "../../UserAvatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editDeal } from "@/app/lib/features/deal/dealActions";
import EditDealButton from "./EditDealButton";

interface Props {
  slug: string;
}

const Details = ({ slug }: Props) => {
  const dispatch = useAppDispatch();
  const { deal } = useAppSelector((state) => state.deal);

  const handleStatusUpdate = async (value: string) => {
    const data = {
      status: `${value}`,
    };

    dispatch(editDeal({ slug, data }));
  };

  return (
    <>
      <div className="flex justify-between pt-2">
        <h1 className="text-2xl font-bold">Deal Details</h1>
        <EditDealButton slug={slug} />
      </div>
      {deal && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="">
            <Label>
              <p className="pt-3 pb-2">Title</p>
            </Label>
            <InputBox data={deal.title} />
            <Label>
              <p className="pt-5 pb-2">Description</p>
            </Label>
            <InputBox data={deal.description} />
            <Label>
              <p className="pt-5 pb-2">Amount</p>
            </Label>
            <InputBox data={deal.amount} />
            <Label>
              <p className="pt-5 pb-2">Expected Close Date</p>
            </Label>
            <InputBox data={format(deal.expectedCloseDate, "MMM d, yyyy")} />
          </div>
          <div className="">
            <Label>
              <p className="pt-5 pb-2">Status</p>
            </Label>

            <Select
              defaultValue={deal.status}
              onValueChange={handleStatusUpdate}
            >
              <SelectTrigger className="bg-backgroundAccent">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            {deal.client && (
              <>
                <Label>
                  <p className="pt-5 pb-2">Client</p>
                </Label>
                <InputBox
                  data={
                    <span className="flex items-center gap-2">
                      <UserAvatar
                        profileImageURL={
                          deal.client.details.profileImageURL ?? ""
                        }
                        size="w-7 h-7"
                      />
                      {deal.client.details.name}
                    </span>
                  }
                />
              </>
            )}
            <Label>
              <p className="pt-5 pb-2">Priority</p>
            </Label>
            <InputBox data={<LowMediumHigh priority={deal.priority} />} />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
