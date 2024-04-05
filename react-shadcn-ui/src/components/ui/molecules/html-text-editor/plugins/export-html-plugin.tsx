import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

type Props = {
  exportAsHtml: (contentAsHTML: string) => void;
};

export const ExportHtmlPlugin = ({ exportAsHtml: exportAsHTML }: Props) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (exportAsHTML) {
      // editor.registerUpdateListener(() => {
      //   editor.update(() => {
      //     const contentAsHTML = $generateHtmlFromNodes(editor);
      //     console.log(contentAsHTML)
      //     exportAsHTML(contentAsHTML);
      //   });
      // });
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const contentAsHTML = $generateHtmlFromNodes(editor);
          exportAsHTML(contentAsHTML);
        });
      });
    }
  }, [editor, exportAsHTML]);

  return null;
};
