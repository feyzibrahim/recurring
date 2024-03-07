import { CountByDay } from "@/constants/Types";
import axios from "axios";

export const handleError = (error: any, rejectWithValue: any) => {
  if (error.response && error.response.data.error) {
    console.log(error.response.data.error);

    return rejectWithValue(error.response.data.error);
  } else {
    return rejectWithValue(error.message);
  }
};

export const countTotal = (data: CountByDay[]) => {
  let total = data.reduce((acc, curr) => acc + curr.count, 0);
  return total;
};

export const photoUpload = async (selectedFile: any) => {
  const formData = new FormData();
  formData.append("file", selectedFile as Blob);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error(error);
  }
};
