"use client";
import React, { useEffect } from "react";
import { BiCommentDots, BiDetail, BiNote } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/app/lib/hook";
import { getDeal } from "@/app/lib/features/deal/dealActions";
import Details from "./Details";

const DealDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeal(slug));
  }, [dispatch, slug]);

  return (
    <div>
      <Tabs defaultValue="details" className="pt-1">
        <TabsList className="mx-2 bg-backgroundAccent">
          <TabsTrigger value="details" className="flex items-center gap-1">
            <BiDetail />
            Details
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <FiActivity />
            Activity
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-1">
            <BiCommentDots />
            Comments
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-1">
            <BiNote />
            Notes
          </TabsTrigger>
          <TabsTrigger value="invoice" className="flex items-center gap-1">
            <HiOutlineDocumentDownload />
            Invoice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Details />
        </TabsContent>
        <TabsContent value="activity">
          <div>Hello under world</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealDetails;
