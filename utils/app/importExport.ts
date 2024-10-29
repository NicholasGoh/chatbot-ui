import {
  ExportFormatV1,
  ExportFormatV2,
  ExportFormatV3,
  ExportFormatV4,
  LatestExportFormat,
  SupportedExportFormats,
} from '@/types/export';
import toast from 'react-hot-toast';
import { cleanConversationHistory } from './clean';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { APIHistory, Conversation, Message } from '@/types/chat';
import { OpenAIModels, fallbackModelID } from '@/types/openai';
import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';

export function isExportFormatV1(obj: any): obj is ExportFormatV1 {
  return Array.isArray(obj);
}

export function isExportFormatV2(obj: any): obj is ExportFormatV2 {
  return !('version' in obj) && 'folders' in obj && 'history' in obj;
}

export function isExportFormatV3(obj: any): obj is ExportFormatV3 {
  return obj.version === 3;
}

export function isExportFormatV4(obj: any): obj is ExportFormatV4 {
  return obj.version === 4;
}

export const isLatestExportFormat = isExportFormatV4;

export function cleanData(data: SupportedExportFormats): LatestExportFormat {
  if (isExportFormatV1(data)) {
    return {
      version: 4,
      history: cleanConversationHistory(data),
      folders: [],
      prompts: [],
    };
  }

  if (isExportFormatV2(data)) {
    return {
      version: 4,
      history: cleanConversationHistory(data.history || []),
      folders: (data.folders || []).map((chatFolder) => ({
        id: chatFolder.id.toString(),
        name: chatFolder.name,
        type: 'chat',
      })),
      prompts: [],
    };
  }

  if (isExportFormatV3(data)) {
    return { ...data, version: 4, prompts: [] };
  }

  if (isExportFormatV4(data)) {
    return data;
  }

  throw new Error('Unsupported data format');
}

function currentDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}-${day}`;
}

export const exportData = (userId: string) => {
  let folders = localStorage.getItem('folders');
  let prompts = localStorage.getItem('prompts');

  if (folders) {
    folders = JSON.parse(folders);
  }

  if (prompts) {
    prompts = JSON.parse(prompts);
  }

  axios
    .get(
      `${window.location.protocol}//${window.location.host}/api/v1/database/chat-history?user_id=${userId}`,
    )
    .then((response) => {
      const conversationHistory: APIHistory[] = response.data;
      let messages: Message[] = [];
      conversationHistory.map((history) => {
        messages = [
          ...messages,
          { role: 'user', content: history.user_query },
          { role: 'assistant', content: history.completion },
        ];
      });
      const history: Conversation[] = [
        {
          id: uuidv4(),
          name: 'New conversation',
          messages: messages,
          model: OpenAIModels[fallbackModelID],
          prompt: DEFAULT_SYSTEM_PROMPT,
          folderId: null,
        },
      ];

      const data = {
        version: 4,
        history: history || [],
        folders: folders || [],
        prompts: prompts || [],
      } as LatestExportFormat;

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `agentic_rag_history_${currentDate()}.json`;
      link.href = url;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Download success!');
    })
    .catch((error) =>
      toast.error('Cannot fetch chat history:\n'.concat(error.message)),
    );
};

export const importData = (
  data: SupportedExportFormats,
): LatestExportFormat => {
  const cleanedData = cleanData(data);
  const { history, folders, prompts } = cleanedData;

  const conversations = history;
  localStorage.setItem('conversationHistory', JSON.stringify(conversations));
  localStorage.setItem(
    'selectedConversation',
    JSON.stringify(conversations[conversations.length - 1]),
  );

  localStorage.setItem('folders', JSON.stringify(folders));
  localStorage.setItem('prompts', JSON.stringify(prompts));

  return cleanedData;
};
