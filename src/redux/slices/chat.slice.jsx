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
  getDocs,
  writeBatch,
} from "../../firebase/firebase";

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  chats: [],
  messages: {},
  status: "idle",
};

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

          // 🔥 For each chat, listen unseen messages count
          chats.forEach((chat) => {
            const messagesRef = collection(db, "chats", chat.id, "messages");
            const unseenQuery = query(
              messagesRef,
              where("receiverId", "==", userId)
            );
            onSnapshot(unseenQuery, (msgSnap) => {
              const unseen = msgSnap.docs.filter(
                (d) => !(d.data().seenBy || []).includes(userId)
              ).length;
              dispatch(setUnseenCount({ chatId: chat.id, count: unseen }));
            });
          });
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
      const finalChatId = chatId || [senderId, receiverId].sort().join("_");
      const chatRef = doc(db, "chats", finalChatId);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, {
          members: [senderId, receiverId],
          memberInfo: {
            [senderId]: senderInfo,
            [receiverId]: receiverInfo,
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastMessage: null,
        });
      }

      const messagesRef = collection(db, "chats", finalChatId, "messages");
      const msgDoc = await addDoc(messagesRef, {
        senderId,
        receiverId,
        text,
        createdAt: serverTimestamp(),
        seenBy: [senderId],
      });

      await updateDoc(chatRef, {
        updatedAt: serverTimestamp(),
        lastMessage: {
          id: msgDoc.id,
          text,
          senderId,
          createdAt: serverTimestamp(),
        },
      });

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Mark messages as seen
export const markMessagesAsSeen = createAsyncThunk(
  "chat/markMessagesAsSeen",
  async ({ chatId, userId }, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "chats", chatId, "messages"),
        where("receiverId", "==", userId)
      );

      const snap = await getDocs(q);
      const batch = writeBatch(db);

      snap.forEach((docSnap) => {
        if (!docSnap.data().seenBy?.includes(userId)) {
          batch.update(docSnap.ref, {
            seenBy: [...(docSnap.data().seenBy || []), userId],
          });
        }
      });

      await batch.commit();
    } catch (err) {
      return rejectWithValue(err.message);
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
    setUnseenCount: (state, action) => {
      const { chatId, count } = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unseenCount: count } : chat
      );
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
  setUnseenCount,
} = chatSlice.actions;

export default chatSlice.reducer;
