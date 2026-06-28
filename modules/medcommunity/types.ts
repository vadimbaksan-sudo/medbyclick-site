export interface ForumThread {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned?: boolean;
}
