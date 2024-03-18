import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeSelections } from '../components/theme-selections';
import { chatGptApiClient } from '@/api/chatgpt/ChatGptApiClient';

type Props = {
  setEmailHtml: (html: string) => void;
};

export const InputArea = ({ setEmailHtml }: Props) => {
  const onClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const res = await chatGptApiClient.execute('What is the OpenAI mission?');
    setEmailHtml(res);
  };

  return (
    <div>
      <ThemeSelections />
      <Input />
      <Button onClick={onClick}>build</Button>
    </div>
  );
};
