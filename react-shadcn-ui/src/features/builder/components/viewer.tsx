import { ScrollArea } from '@/components/ui/scroll-area';

type Props = { html: string };

export const Viewer = ({ html }: Props) => {
  return (
    <div className="border mt-1 mb-1 mr-2 ml-2">
      <ScrollArea>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ScrollArea>
    </div>
  );
};
