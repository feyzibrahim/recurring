"use client";
import React, { useEffect } from "react";
import { BiDetail, BiNote } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/app/lib/hook";
import { getDeal } from "@/app/lib/features/deal/dealActions";
import Details from "./Details";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Activity from "./activity/Activity";
import Note from "./note/Note";

const DealDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeal(slug));
  }, [dispatch, slug]);

  return (
    <div className="pb-10">
      <Tabs defaultValue="details" className="pt-1">
        <ScrollArea className="max-w-[250px] sm:max-w-none">
          <TabsList className="mx-2 bg-backgroundAccent">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <BiDetail />
              Details
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <FiActivity />
              Activity
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
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <TabsContent value="details">
          <Details slug={slug} />
        </TabsContent>
        <TabsContent value="activity">
          <Activity slug={slug} />
        </TabsContent>
        <TabsContent value="notes">
          <Note slug={slug} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealDetails;
