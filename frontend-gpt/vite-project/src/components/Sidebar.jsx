import React from 'react';

const Sidebar = ({ previousChats, currentChatId, onSelectChat, onCreateNewChat, sidebarOpen, onToggleSidebar, getMessage}) => {
  return (
    <>
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3>Chats</h3>
        </div>

        <button className="new-chat-btn" onClick={onCreateNewChat} title="New Chat">
          + New Chat
        </button>

        <div className="sidebar-section-title">Your chats</div>

        <div className="chats-list">
          {previousChats.map(chat => (
            <button
              key={chat._id}
              className={`previous-chat ${currentChatId === chat._id ? 'active' : ''}`}
              onClick={() => onSelectChat(chat._id)}
            >
              {chat.title?.title||chat.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;