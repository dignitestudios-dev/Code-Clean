import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  db,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "../../firebase/firebase";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  chats: [],
  messages: {},
  status: "idle",
};

// ✅ Listen to all chats where user is a member
export const listenUserChats = createAsyncThunk(
  "chat/listenUserChats",
  async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "chats"),
        where("members", "array-contains", userId),
        orderBy("updatedAt", "desc")
      );

      return new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const chats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setChats(chats));
        });
        resolve(unsubscribe);
      });
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Send message (create chat if not exists)
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { chatId, senderId, receiverId, senderInfo, receiverInfo, text },
    { rejectWithValue }
  ) => {
    try {
      let finalChatId = chatId || [senderId, receiverId].sort().join("_");


      const chatRef = doc(db, "chats", finalChatId);
      const chatSnap = await getDoc(chatRef);


      if (!chatSnap.exists()) {
        try {
          await setDoc(chatRef, {
            members: [senderId, receiverId],
            memberInfo: {
              [senderId]: senderInfo,
              [receiverId]: receiverInfo,
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (e) {
          console.error("setDoc failed ❌", e);
        }
      }

      const messagesRef = collection(db, "chats", finalChatId, "messages");

      console.log("Before addDoc");
      await addDoc(messagesRef, {
        senderId,
        text,
        createdAt: serverTimestamp(),
      });
      console.log("After addDoc");

      try {
        await updateDoc(chatRef, { updatedAt: serverTimestamp() });
      } catch (e) {
        console.warn("updateDoc failed", e);
      }

      console.log("✅ Message send complete");
      return true;
    } catch (error) {
      console.error("❌ sendMessage error", error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Listen to messages in a chat
export const listenMessages = createAsyncThunk(
  "chat/listenMessages",
  async ({ chatId }, { dispatch, rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      );

      return new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(setMessages({ chatId, messages }));
        });
        resolve(unsubscribe);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetProviderState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },
    resetError(state) {
      state.error = null;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      console.log(chatId);
      state.messages = {
        ...state.messages,
        [chatId]: messages,
      };
    },
    clearChat: (state, action) => {
      const chatId = action.payload;
      if (state.messages && state.messages[chatId]) {
        const newMessages = { ...state.messages };
        delete newMessages[chatId];
        state.messages = newMessages;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  resetError,
  resetProviderState,
  setChats,
  setMessages,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
