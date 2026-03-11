import React, { useEffect, useRef } from 'react';

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-messages">
       {messages.map((msg, index) => (
    
        <div key={index} className={`message-wrapper ${msg.role}`}>
          <div className="message-author">
            {msg.role === "user" ? "You" : "AI"}
          </div>
          <div className={`message ${msg.role}`}>
            {msg.content}
          </div>
    </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;