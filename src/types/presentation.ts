import { TagType } from "./tag";

export interface PresentationType {
  id: number;
  title: string;
  fileUrl: string;
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
  createdAt: string;
  tags: TagType[];
}

export const initialPresentationState: PresentationType = {
  id: 0,
  title: "",
  fileUrl: "",
  clarity: 0,
  clarityFeedback: "",
  fluency: 0,
  fluencyFeedback: "",
  confidence: 0,
  confidenceFeedback: "",
  engagement: 0,
  engagementFeedback: "",
  speechStyle: 0,
  speechStyleFeedback: "",
  score: 0,
  tips: "",
  tags: [],
  isPublic: false,
  createdAt: "2025-03-26T00:00:00.000Z",
};
