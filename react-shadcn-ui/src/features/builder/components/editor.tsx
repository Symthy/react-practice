import { HtmlTextEditor } from '@/components/ui/molecules/html-text-editor/html-text-editor';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = { html: string; updateHtmlTextPart: (key: string, value: string) => void };

export const Editor = ({ html, updateHtmlTextPart }: Props) => {
  const classNames = html.match(/content-\d+/g) || [];

  const setHtmlTextPart = (className: string, text: string) => {
    updateHtmlTextPart(`${className}`, text);
  };

  return (
    <ScrollArea>
      {classNames.map((className) => (
        <div key={className} className="mt-1 mr-2 ml-2">
          {/* <textarea
            className="w-full border"
            id={className}
            value={html.match(new RegExp(`class="${className}">([^<]*)<`))?.[1] || ''}
            onChange={(e) => updateHtmlTextPart(`${className}`, e.target.value)}
          /> */}
          <HtmlTextEditor
            defaultHtmlText={html.match(new RegExp(`class="${className}">([^<]*)<`))?.[1] || ''}
            setText={(text: string) => {
              setHtmlTextPart(className, text);
            }}
          />
        </div>
      ))}
    </ScrollArea>
  );
};
