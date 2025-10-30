export interface User {
  name: string;
  username: string;
  location: string;
  bio: string;
  avatar: string;
}

export type PostCategory = 'Microjob' | 'Collab';

// FIX: This interface now correctly matches the data in your constants.ts
export interface Post {
  id: number;
  name: string;
  username: string;
  title: string;
  description: string;
  category: PostCategory;
  tag: string;
  location: string;
  zip: string;
  price?: number;
  linkupDate?: string;      // Changed from 'date' to 'linkupDate'
  durationMinutes?: number; // Changed from 'duration' to 'durationMinutes'
  completed?: boolean;
}

export interface Category {
  name:string;
  icon: string;
}

export interface ChatMessage {
  text: string;
  sender: {
    username: string;
    name: string;
  };
  timestamp: number;
}

export interface Chat {
  name: string;
  messages: ChatMessage[];
}

export interface Group {
  id: number;
  name: string;
  members: string[];
  messages: ChatMessage[];
}

export type Page = 'home' | 'chat' | 'profile' | 'chat-detail' | 'group-detail';
export type ModalType = 'new-post' | 'edit-profile' | 'create-group' | 'filters' | null;