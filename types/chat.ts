import { OpenAIModel } from './openai';

export interface Message {
  role: Role;
  content: string;
}

export type Role = 'assistant' | 'user';

export interface ChatBody {
  model: OpenAIModel;
  messages: Message[];
  key: string;
  prompt: string;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  documents?: APIDocument[][];
  model: OpenAIModel;
  prompt: string;
  folderId: string | null;
}

export interface APIHistory {
  user_query: string;
  completion: string;
  documents: APIDocument[];
}

export interface APIInsertPayload {
  user_id: string;
  user_query: string;
  completion: string;
  documents: string;
}

export interface APIDocument {
  id: string;
  metadata: APIMetaData;
  page_content: string;
}

export interface APIMetaData {
  page: string;
  source: string;
  score: number;
  type: string;
}
