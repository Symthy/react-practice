import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import Theme from './Theme';
import ToolbarPlugin from './ToolbarPlugin';
import './styles.css';
import { ImportHtmlPlugin } from './plugins/import-html-plugin';
import { ExportHtmlPlugin } from './plugins/export-html-plugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: Theme,
};

type Props = {
  defaultHtmlText: string;
  setText: (text: string) => void;
};

export const HtmlTextEditor = ({ defaultHtmlText, setText }: Props) => {
  const onChange = (editor: EditorState) => {
    console.log(editor);
  };

  return (
    <div className="App">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            {/* <AutoFocusPlugin /> */}
            <ImportHtmlPlugin defaultContentAsHTML={defaultHtmlText} />
            <ExportHtmlPlugin
              exportAsHtml={(html: string) => {
                setText(html);
              }}
            />
            {/* <OnChangePlugin onChange={() => {

            }} /> */}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
