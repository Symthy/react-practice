import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const InputViewer = () => {
  return (
    <>
      <Tabs defaultValue="input">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};
