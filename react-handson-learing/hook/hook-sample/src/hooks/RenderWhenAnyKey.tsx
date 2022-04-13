import { useEffect, useState } from "react";

// キー押下される度にコンポーネント再描画するカスタムフック
export const useRenderWhenAnyKey = () => {
  const [, forceRender] = useState<KeyboardEvent>()

  // イベントリスナーの設定/解除なので初回実行のみで良い
  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender)
  }, []);
}
