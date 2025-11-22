export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'editor' | 'viewer';
  status: 'online' | 'offline' | 'away';
  lastActive: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  mentions: string[];
  replies: Comment[];
  isEdited: boolean;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  owner: TeamMember;
  collaborators: TeamMember[];
  lastModified: Date;
  status: 'active' | 'archived' | 'draft';
  readabilityScore: number;
  wordCount: number;
  comments: Comment[];
  isPublic: boolean;
  publicLink?: string;
  linkExpiry?: Date;
  thumbnail: string;
  thumbnailAlt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  documents: Document[];
  members: TeamMember[];
  createdAt: Date;
  icon: string;
}

export interface Activity {
  id: string;
  type: 'comment' | 'edit' | 'share' | 'mention' | 'permission';
  user: TeamMember;
  document: {
    id: string;
    title: string;
  };
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ShareSettings {
  isPublic: boolean;
  allowComments: boolean;
  allowDownload: boolean;
  expiryDate?: Date;
  password?: string;
  permissions: {
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }[];
}