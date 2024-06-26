import { createSlice } from "@reduxjs/toolkit";
import { createChat, getChats } from "./chatActions";
import { ChatTypes } from "@/constants/Types";

interface ChatSliceType {
  chats: ChatTypes[] | null;
  loading: boolean;
  error: any;
  activeChat: ChatTypes | null;
  onlineList: { userId: string; socketId: string }[] | null;
}

const initialState: ChatSliceType = {
  chats: [],
  loading: false,
  error: null,
  activeChat: null,
  onlineList: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, { payload }) => {
      return { ...state, activeChat: payload.chat };
    },
    setActiveChatWithUserName: (state, { payload }) => {
      const { chats } = state;

      if (chats) {
        const newChat = chats.find((chat) =>
          chat.participants.some(
            (participant) => participant.username === payload.username
          )
        );

        if (newChat) {
          return { ...state, activeChat: newChat };
        }

        return state;
      }
    },
    setActiveChatWithSlug: (state, { payload }) => {
      console.log("file: chatSlice.tsx:46 -> payload", payload);
      const { chats } = state;

      if (chats) {
        const newChat = chats.find((chat) => chat.slug === payload.slug);

        if (newChat) {
          return { ...state, activeChat: newChat };
        }

        return state;
      }
    },
    socketNewChatUpdate: (state, { payload }) => {
      let chats = [payload.chat, ...(state.chats || [])] as ChatTypes[];
      return { ...state, chats };
    },
    updateOnlineList: (state, { payload }) => {
      const { onlineList } = payload;

      return {
        ...state,
        onlineList: onlineList,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChats.rejected, (state, { payload }) => {
        state.loading = false;
        state.chats = null;
        state.error = payload;
      })
      .addCase(getChats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.chats = payload.chats;
      })
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
        state.activeChat = payload.chat;
        state.chats = [payload.chat, ...(state.chats || [])] as ChatTypes[];
      });
  },
});

export const {
  setActiveChat,
  socketNewChatUpdate,
  setActiveChatWithUserName,
  setActiveChatWithSlug,
  updateOnlineList,
} = chatSlice.actions;

export default chatSlice.reducer;
