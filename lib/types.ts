export type Provider = {
  [provider in string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  };
};

export type Message = {
  id: string;
  role: string;
  content: string;
  // chatConversationId: string;
  // createdAt: Date | null;
  // updatedAt: Date | null;
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
};

export type ConversationShared = {
  id: string;
  title: string;
  messages: Message[];
  userId: string;
  user: User;
  createdAt: Date | null;
  updatedAt: Date | null;
};
