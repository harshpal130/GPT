import React from 'react';

const ChatInput = ({ userInput, onChange, onSend, onKeyPress }) => {
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
        onClick={onSend}
        disabled={!userInput.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;