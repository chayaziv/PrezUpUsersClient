
export interface PresentationData {
  id: number;
  title: string;
  createdAt: string;
  videoUrl: string;
  thumbnailUrl: string;
  clarity: number;
  clarityFeedback: string;
  fluency: number;
  fluencyFeedback: string;
  confidence: number;
  confidenceFeedback: string;
  engagement: number;
  engagementFeedback: string;
  speechStyle: number;
  speechStyleFeedback: string;
  score: number;
  tips: string;
  isPublic: boolean;
  userId: number;
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface PresentationSummary {
  id: number;
  title: string;
  createdAt: string;
  thumbnailUrl: string;
  score: number;
  isPublic: boolean;
  tags: Tag[];
}
