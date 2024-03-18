import { ApiClient } from '../ApiClient';

const CHATGPT_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '';
type HeaderData = Record<string, string>;
type BodyData = {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
};
type ResponseData = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      index: number;
      finish_reason: string;
      message: {
        role: string;
        content: string;
      };
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

class ChatGptApiClient {
  constructor(private apiClient: ApiClient = new ApiClient()) {}

  async execute(content: string): Promise<string> {
    const res = this.apiClient.post<HeaderData, BodyData, ResponseData>(
      CHATGPT_API_ENDPOINT,
      this.buildHeader(),
      this.buildBody(content)
    );
    return res.then((r) => r.choices[0].message.content);
  }

  private buildHeader(): HeaderData {
    return {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  private buildBody(content: string): BodyData {
    return {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: content }],
    };
  }
}

export const chatGptApiClient = new ChatGptApiClient();
