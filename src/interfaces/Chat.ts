interface History {
  role: ChatMessage["author"];
  message: string;
}

export interface ChatInterface {
  _id: string;
  user: string;
  subject: string;
  history: History[];
  notes: string;
}

export interface ChatMessage {
  author: "model" | "user";
  children: string;
  thinking?: boolean;
}
