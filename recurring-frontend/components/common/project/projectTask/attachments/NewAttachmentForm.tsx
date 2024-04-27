"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editTask } from "@/app/lib/features/task/taskActions";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FormInputCustom from "@/components/common/FormInputCustom";
import { FiTrash } from "react-icons/fi";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { AttachmentTypes } from "@/constants/Types";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Text must be at least 2 characters.",
    })
    .max(20, { message: "Text should be Less than 20 characters" }),
  description: z
    .string()
    .min(2, {
      message: "Text must be at least 2 characters.",
    })
    .max(500, { message: "Text should be Less than 500 characters" }),
  user: z.string(),
});

export default function NewAttachmentForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const dispatch = useAppDispatch();
  const { user } = useContext(UserContext);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      user: user ? user._id : "",
    },
  });

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...filesArray]);
    }
  };

  // Function to remove a file
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    // Handle dropped files here
  };

  const handleClick = () => {
    // Trigger click on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileUpload = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const formSubmit = async (val: AttachmentTypes) => {
    setFileUploadLoading(true);
    val.attachments = val.attachments ?? [];
    for (let file of uploadedFiles) {
      const dataURL = await fileUpload(file);
      val.attachments = [...val.attachments, dataURL];
    }
    setFileUploadLoading(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val: AttachmentTypes = values;
    await formSubmit(val);
    if (task) {
      const existingAttachments = task.attachments || [];
      let attachments = [...existingAttachments, val];
      const data = await dispatch(
        editTask({ data: { attachments: attachments }, slug: task._id })
      );
      if (editTask.fulfilled.match(data)) {
        setIsModalOpen(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-5 w-full">
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInputCustom
                      placeholder="Enter your title"
                      field={field}
                      showTitle={true}
                      title="Title"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your description"
                      {...field}
                      className="my-2 h-44 bg-backgroundAccent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-xs">
            <p className="text-sm py-2">File</p>
            <div className="flex flex-col">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
                multiple
                ref={fileInputRef}
              />

              <div // Drag and Drop div
                className={`border rounded-md  bg-backgroundAccent cursor-pointer hover:opacity-80 ${
                  isDragOver ? "border-primary" : ""
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <div className="h-32 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <AiOutlineCloudUpload className="text-6xl" />
                    <p>Drag and drop files here or click to browse</p>
                  </div>
                </div>
              </div>
            </div>
            {uploadedFiles && uploadedFiles.length > 0 && (
              <p className="text-sm  mt-1">Uploaded Files</p>
            )}
            <ScrollArea className="h-24 mt-1">
              {uploadedFiles.map((file: File, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-md px-4 py-2 mb-1 bg-backgroundAccent"
                >
                  <span>{file.name}</span>
                  <button type="button" onClick={() => handleRemoveFile(index)}>
                    <FiTrash />
                  </button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading || fileUploadLoading}
        >
          {loading || fileUploadLoading ? "Loading..." : "Save Attachment"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
