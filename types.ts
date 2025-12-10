export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string; // Base64 string
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isConnected: boolean;
}