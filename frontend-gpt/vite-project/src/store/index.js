import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import messagesReducer from './messagesSlice';
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    chat: chatReducer,
    messages: messagesReducer,
    auth: authReducer,
  },
});

export default store;
