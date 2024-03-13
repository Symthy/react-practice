import { useState } from 'react';

export const ViewEditor = () => {
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
      <h1 class="email-greeting">こんにちは、友人へ</h1>
      <p class="email-body">いつもお世話になっております。元気にしていますか？</p>
      <p class="email-closing">敬具<br>あなたの名前</p>
    </div>
  </body>
  </html>
`);

  const updateEmailContent = (className: string, newContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(emailHtml, 'text/html');
    const element = doc.querySelector(`.${className}`);
    if (element) {
      element.innerHTML = newContent.replace(/\n/g, '<br>');
      setEmailHtml(doc.documentElement.outerHTML);
    }
  };

  return (
    <div className="grid w-full grid-cols-2">
      <div className="flex flex-col">
        <label>
          挨拶:
          <textarea
            value={emailHtml.match(/class="email-greeting">([^<]*)</)?.[1] || ''}
            onChange={(e) => updateEmailContent('email-greeting', e.target.value)}
          />
        </label>
        <label>
          本文:
          <textarea
            value={emailHtml.match(/class="email-body">([^<]*)</)?.[1] || ''}
            onChange={(e) => updateEmailContent('email-body', e.target.value)}
          />
        </label>
        <label>
          署名:
          <textarea
            value={emailHtml.match(/class="email-closing">([^<]*)</)?.[1] || ''}
            onChange={(e) => updateEmailContent('email-closing', e.target.value)}
          />
        </label>
      </div>
      <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
    </div>
  );
};
