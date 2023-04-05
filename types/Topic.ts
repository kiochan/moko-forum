import { Reply } from "./Reply";

export interface Topic {
  author: string;
  id: string;
  title: string;
  replys: Reply[];
}
