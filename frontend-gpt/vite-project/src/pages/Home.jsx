import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/theme.css';
import '../styles/layout.css';
import '../styles/sidebar.css';
import '../styles/chat.css';
import '../styles/input.css';
import Sidebar from '../components/Sidebar';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import axios from 'axios'

// redux actions
import { addChat, setCurrentChat } from '../store/chatSlice';
import { addMessage, clearMessages } from '../store/messagesSlice';

const Home = () => {
  const dispatch = useDispatch();
  const currentChatId = useSelector(state => state.chat.currentChatId);
  const previousChats = useSelector(state => state.chat.list);
  const messages = useSelector(state => {
    if (!currentChatId) return [];
    return state.messages.byChat[currentChatId] || [];
  });

  const [userInput, setUserInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to socket
    socketRef.current = io('http://localhost:3000',{
      withCredentials: true,
      
    })
    
    socketRef.current.on("connect", ()=>{
      console.log("socket connnected", socketRef.current.id)

    })

    socketRef.current.on("ai-response", (data) => {
    
      console.log("AI response:", data);

      dispatch(addMessage({
      chatId: data.chat,
      message: {
      role: "ai",
      content: data.content
    }
  }));
});

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log("currentChatId:", currentChatId);
    console.log("socket:", socketRef.current);
    console.log("userInput:", userInput);

    if (!userInput.trim() || !currentChatId) return;

    if (!currentChatId) {
      console.log("No chat selected");
      return;
      }

    if (!socketRef.current) {
    console.log("Socket not connected");
    return;
  }

    const message = userInput.trim();
    dispatch(addMessage({
      chatId: currentChatId,
      message: { role: 'user', content: message },
    }));
    

    // Emit to socket
    socketRef.current.emit('ai-message', {
      chat: currentChatId,
      content: message,
    });
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const selectChat = async (chatId) => {
  dispatch(setCurrentChat(chatId));
  dispatch(clearMessages(chatId));
  setSidebarOpen(false);

  await getMessage(chatId);
};

 const createNewChat = async () => {
  const title = window.prompt("Enter a name for this chat");
  if (!title || !title.trim()) return;

  try {
    const response = await axios.post(
      "http://localhost:3000/api/chat",
      { title },
      { withCredentials: true }
    );

    console.log("API response:", response.data);

    const chat = response.data.chat || response.data;

    dispatch(addChat(chat));
    dispatch(setCurrentChat(chat._id));

  } catch (err) {
    console.error(err);
  }
};
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getMessage = async(chatId)=>{
    const response =  await axios.get(`http://localhost:3000/api/chat/messages/${chatId}` , {
      withCredentials:true
    })
    console.log('messages fetched successfully', response.data.messages)

  }

  return (
    <div className="chat-container">
      <Sidebar
        previousChats={previousChats}
        currentChatId={currentChatId}
        onSelectChat={selectChat}
        onCreateNewChat={createNewChat}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div className="chat-main">
        {!currentChatId ?(
          <div className="welcome-container">
            <p className="welcome-label">Early Preview</p>
            <h1 className="welcome-title">ChatGPT Clone</h1>
            <p className="welcome-description">
              Ask anything. Paste text, brainstorm ideas, or get quick explanations. 
              Your chats stay in the sidebar so you can pick up where you left off
            </p>
          </div>
        ) : (
          <ChatMessages messages={messages} />
        )}
        <ChatInput
          userInput={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onSend={sendMessage}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Home;
