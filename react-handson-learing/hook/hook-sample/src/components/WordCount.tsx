import { useCallback, useEffect, useMemo, VFC } from "react";

type WordCountProps = {
  children: string
}


export const WordCount: VFC<WordCountProps> = ({ children = "" }) => {
  const words = useMemo(() => {
    const ws = children.split(" ");
    return ws;
  }, [children]);

  // words の中身が変わらない限り実行されない
  useEffect(() => {
    console.log("words fresh render");
  }, [words]);

  // 再描画時に毎回実行されることが無くなる
  const fn = useCallback(() => {
    console.log("use callback");
  }, []);
  useEffect(() => {
    console.log("callback fresh render");
  }, [fn]);

  return (
    <>
      <p>{children}</p>
      <p>count: {words.length}</p>
      {words.map(word => <p>- <strong>{word}</strong></p>)}
    </>
  );
}
