import { createSlice } from "@reduxjs/toolkit";
import { createChat } from "./chatActions";
import { EmployeeTypes } from "@/constants/Types";

interface ChatTypes {
  _id: string;
  participants: [string | EmployeeTypes];
  groupName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatSliceType {
  chatList: ChatTypes[] | null;
  loading: boolean;
  error: any;
  activeChatUser: EmployeeTypes | null;
}

const initialState: ChatSliceType = {
  chatList: [],
  loading: false,
  error: null,
  activeChatUser: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChatUser: (state, { payload }) => {
      return { ...state, activeChatUser: payload.user };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChat.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createChat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        state.chatList = [
          ...(state.chatList || []),
          payload.chat,
        ] as ChatTypes[];
      });
  },
});

export const { setActiveChatUser } = chatSlice.actions;

export default chatSlice.reducer;
