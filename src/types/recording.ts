import { TagType } from "./tag";

export type RecordingData = {
  name: string;
  isPublic: boolean;
  tags: TagType[];
  videoBlob?: Blob;
};
