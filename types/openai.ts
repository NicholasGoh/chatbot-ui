export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OpenAIModelID {
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
}

export interface OnPremModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}

export enum OnPremModelID {
  MIXTRAL_8x7B_SMALL = 'mixtral-8x7b-instruct-v0.1.Q2_K.gguf',
  MIXTRAL_8x7B_BIG = 'mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf'
}
// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OnPremModelID.MIXTRAL_8x7B_SMALL;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
  },
};

export const OnPremModels: Record<OnPremModelID, OnPremModel> = {
  [OnPremModelID.MIXTRAL_8x7B_SMALL]: {
    id: OnPremModelID.MIXTRAL_8x7B_SMALL,
    name: 'Mixtral 8x7B Instruct v0.1 Q2_K',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OnPremModelID.MIXTRAL_8x7B_BIG]: {
    id: OnPremModelID.MIXTRAL_8x7B_BIG,
    name: 'Mixtral 8x7B Instruct v0.1 Q5_K_M',
    maxLength: 24000,
    tokenLimit: 8000,
  },
};
