import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    list: [
      // { id: 1, title: 'Chat 1' },
      // { id: 2, title: 'Chat 2' },
    ], // array of {id, title}
    currentChatId: null,
  },
  reducers: {
    addChat: (state, action) => {
    state.list.unshift(action.payload);
    },
    setChat :(state, action)=>{
      state.chats = action.payload
    },
    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },
  },
});

export const { addChat, setCurrentChat ,setChat } = chatSlice.actions;
export default chatSlice.reducer;
