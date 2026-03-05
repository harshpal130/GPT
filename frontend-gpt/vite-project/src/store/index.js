import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    messages: messagesReducer,
  },
});

export default store;
