import { CountByDay } from "@/constants/Types";

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
