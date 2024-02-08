"use client";
import {
  deleteProject,
  getProject,
} from "@/app/lib/features/project/projectActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import InputBox from "@/components/common/InputBox";
import { Button } from "@/components/ui/button";

const ProjectDetails = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProject(slug));
  }, [dispatch, slug]);

  const handleDelete = () => {
    dispatch(deleteProject(slug));
  };

  return (
    <div className="bg-secondary p-5 shadow-md">
      {project && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
          <Label>
            <p className="py-2">Project Status</p>
          </Label>
          <InputBox data={project.status} />
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
          <InputBox data={project.manager} />
          <Label>
            <p className="py-2">Members</p>
          </Label>
          <div className="mb-4">
            {project.members.map((member, index) => (
              <p key={index}>{member}</p>
            ))}
          </div>
          {/* <Button
            variant="destructive"
            className="w-full"
            onClick={handleDelete}
          >
            Delete Project
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
