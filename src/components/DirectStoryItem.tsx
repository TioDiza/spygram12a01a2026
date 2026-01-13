import React from 'react';
import { cn } from '../lib/utils';

interface DirectStoryItemProps {
  avatarUrl: string;
  name: string;
  note: string;
  isOwnStory?: boolean;
}

const DirectStoryItem: React.FC<DirectStoryItemProps> = ({ avatarUrl, name, note, isOwnStory = false }) => {
  return (
    <div className="story-item">
      <div className="story-bubble">{note}</div>
      <img 
        src={avatarUrl} 
        alt={name} 
        className={cn("story-avatar", !isOwnStory && "blur-sm")} 
      />
      <span className="story-name">{isOwnStory ? 'Sua nota' : name}</span>
    </div>
  );
};

export default DirectStoryItem;