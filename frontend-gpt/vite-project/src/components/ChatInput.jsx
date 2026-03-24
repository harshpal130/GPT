import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatInput = ({ userInput, onChange, onSend, onKeyPress }) => {
  const user = useSelector((state) => state.auth.user);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!user) {
      navigate('/login'); // ✅ direct redirect, no alert
      return;
    }

    if (!currentChatId) {
      alert("🆕 Create a new chat first");
      return;
    }

    onSend();
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="Ask me anything..."
        value={userInput}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={!userInput.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;