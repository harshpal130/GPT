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
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('ai-response', (data) => {
      if (currentChatId) {
        dispatch(addMessage({
          chatId: currentChatId,
          message: { role: 'ai', content: data.content },
        }));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [currentChatId, dispatch]);

  const sendMessage = () => {
    if (!userInput.trim() || !currentChatId) return;

    const message = userInput.trim();
    dispatch(addMessage({
      chatId: currentChatId,
      message: { role: 'user', content: message },
    }));
    setUserInput('');

    // Emit to socket
    socketRef.current.emit('ai-message', {
      chat: currentChatId,
      content: message,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const selectChat = (chatId) => {
    dispatch(setCurrentChat(chatId));
    dispatch(clearMessages(chatId));
    setSidebarOpen(false);
  };

  const createNewChat = () => {
    const title = window.prompt('Enter a name for this chat');
    if (!title || !title.trim()) return;
    dispatch(addChat(title.trim()));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        {currentChatId === null || messages.length === 0 ? (
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
