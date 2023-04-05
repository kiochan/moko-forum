import { Reply } from "./Reply";

export interface TopicCard {
  author: string;
  id: string;
  title: string;
  lastReply: Reply;
}
