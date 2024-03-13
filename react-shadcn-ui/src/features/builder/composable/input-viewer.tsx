import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputArea } from '../components/input-area';
import { ViewEditor } from './view-editor';

export const InputViewer = () => {
  return (
    <>
      <Tabs defaultValue="input">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <InputArea />
        </TabsContent>
        <TabsContent value="editor">
          <ViewEditor />
        </TabsContent>
      </Tabs>
    </>
  );
};
