import { useEffect } from 'react';
import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $insertNodes } from 'lexical';

type Props = {
  defaultContentAsHTML: string;
};

export const ImportHtmlPlugin = ({ defaultContentAsHTML }: Props) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (typeof defaultContentAsHTML === 'undefined') {
      return;
    }
    console.log(defaultContentAsHTML);
    editor.update(() => {
      const parser = new DOMParser();
      const textHtmlMimeType: DOMParserSupportedType = 'text/html';
      const dom = parser.parseFromString(defaultContentAsHTML, textHtmlMimeType);
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      $insertNodes(nodes);
    });
  }, [editor, defaultContentAsHTML]);

  return null;
};
