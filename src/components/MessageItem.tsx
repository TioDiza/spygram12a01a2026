import React from 'react';
import { Camera, Lock } from 'lucide-react';

interface MessageItemProps {
  avatarUrl: string;
  name: string;
  message: string;
  time: string;
  unread: boolean;
  locked: boolean;
  onClick: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  avatarUrl,
  name,
  message,
  time,
  unread,
  locked,
  onClick,
}) => {
  return (
    <div
      className={`chat-item ${unread ? 'chat-unread' : ''} ${locked ? 'locked' : ''}`}
      onClick={onClick}
    >
      <div className="chat-avatar-container">
        <div className={`chat-avatar-wrapper ${locked ? 'locked-avatar' : ''}`}>
          {!locked && <img className="chat-photo" src={avatarUrl} alt={name} />}
        </div>
        {locked && (
          <div className="chat-lock-icon">
            <Lock size={24} />
          </div>
        )}
      </div>
      <div className="chat-content">
        <div className="chat-header">
          <h3 className="chat-name">{name}</h3>
        </div>
        <div className="chat-message-row">
          <span className="chat-message-text">{message}</span>
          <span className="chat-time"> • {time}</span>
        </div>
      </div>
      <div className="chat-actions">
        {unread && <div className="chat-unread-dot"></div>}
        <Camera className="chat-camera-icon" />
      </div>
    </div>
  );
};

export default MessageItem;