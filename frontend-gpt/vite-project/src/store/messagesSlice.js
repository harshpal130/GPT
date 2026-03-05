import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byChat: {}, // key: chatId, value: array of messages
  },
  reducers: {
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.byChat[chatId]) {
        state.byChat[chatId] = [];
      }
      state.byChat[chatId].push(message);
    },
    clearMessages: (state, action) => {
      const chatId = action.payload;
      state.byChat[chatId] = [];
    },
  },
});

export const { addMessage, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
