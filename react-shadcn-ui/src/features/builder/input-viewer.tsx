import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputArea } from './composable/input-area';
import { ViewEditor } from './composable/view-editor';
import { useState } from 'react';

export const InputViewer = () => {
  const [emailHtml, setEmailHtml] = useState(`
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>挨拶メール</title>
    <style>/* スタイルの定義 */</style>
  </head>
  <body>
    <div class="container">
      <div class="content-1"><p>こんにちは、友人へ</p></div>
      <div class="content-2"><p>いつもお世話になっております。元気にしていますか？</p></div>
      <div class="content-3"><p>敬具<br>あなたの名前</p></div>
    </div>
  </body>
  </html>
  `);

  const updateHtmlTextPart = (className: string, newContent: string) => {
    console.log(newContent);
    const parser = new DOMParser();
    const doc = parser.parseFromString(emailHtml, 'text/html');
    const element = doc.querySelector(`.${className}`);
    if (element && element.innerHTML !== newContent) {
      element.innerHTML = newContent.replace(/\n/g, '<br>');
      setEmailHtml(doc.documentElement.outerHTML);
    }
  };

  return (
    <>
      <Tabs defaultValue="input">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <InputArea setEmailHtml={setEmailHtml} />
        </TabsContent>
        <TabsContent value="editor">
          <ViewEditor html={emailHtml} updateHtmlTextPart={updateHtmlTextPart} />
        </TabsContent>
      </Tabs>
    </>
  );
};
