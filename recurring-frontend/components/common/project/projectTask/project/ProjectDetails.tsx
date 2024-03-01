"use client";
import {
  editProject,
  getProject,
} from "@/app/lib/features/project/projectActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import InputBox from "@/components/common/InputBox";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditButton from "./EditButton";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);

  const [openArchiveConfirmModal, setOpenArchiveConfirmModal] = useState(false);
  const [archiveData, setArchiveData] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    dispatch(getProject(slug));
  }, [dispatch, slug]);

  const handleStatusUpdate = async (value: string) => {
    const data = {
      status: `${value}`,
    };

    if (value === "archive") {
      setArchiveData(data);
      setOpenArchiveConfirmModal(true);
    } else {
      dispatch(editProject({ slug, data }));
    }
  };

  return (
    <ScrollArea className="h-screen bg-secondary shadow-md">
      {project && (
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
            <EditButton />
          </div>
          <Label>
            <p className="py-2">Project Status</p>
          </Label>
          <Select
            defaultValue={project.status}
            onValueChange={handleStatusUpdate}
          >
            <SelectTrigger className="bg-backgroundAccent">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="archive">Archive</SelectItem>
            </SelectContent>
          </Select>
          <Label>
            <p className="py-2">Start Date:</p>
          </Label>
          <InputBox
            data={format(new Date(project.startDate), "MMMM d, yyyy")}
          />
          <Label>
            <p className="py-2">End Date:</p>
          </Label>
          <InputBox data={format(new Date(project.endDate), "MMMM d, yyyy")} />
          <Label>
            <p className="py-2">Description</p>
          </Label>
          <InputBox data={project.description} />
          <Label>
            <p className="py-2">Manager</p>
          </Label>
          <InputBox
            data={
              typeof project.manager !== "string"
                ? `${project.manager.firstName} ${project.manager.lastName}`
                : "Cannot Read Name"
            }
          />
          <Label>
            <p className="py-2">Members</p>
          </Label>
          <div className="mb-4 flex flex-wrap">
            {project &&
              project.members &&
              typeof project.members !== "string" &&
              project.members.map((member, index) => (
                <div
                  className={`w-10 h-10 rounded-full overflow-clip border-4 ${
                    index > 0 && `-ml-2`
                  }`}
                  key={index}
                >
                  <Image
                    src={
                      (member &&
                        typeof member !== "string" &&
                        (member.profileImageURL as string)) ||
                      UserAvatar
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <AlertDialog
        open={openArchiveConfirmModal}
        onOpenChange={setOpenArchiveConfirmModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are your sure to archive this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please Confirm this action...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => dispatch(editProject({ slug, data: archiveData }))}
            >
              Yes!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollArea>
  );
};

export default ProjectDetails;
