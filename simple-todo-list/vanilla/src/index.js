import "./style.cs";

const onClickAdd = () => {
  const inputText = document.getElementById("js-add-text").value;
  document.getElementById("js-add-text").value = "";

  addToIncompleteList(inputText);
};

document
  .getElementById("js-add-btn")
  .addEventListener("click", () => onClickAdd());

const addToIncompleteList = (text) => {
  // div
  const div = document.createElement("div");
  div.className = "bl-row";
  // li
  const li = document.createElement("li");
  li.innerText = text;
  // ボタン
  const completedBtn = document.createElement("button");
  completedBtn.innerText = "完了";
  completedBtn.addEventListener("click", () => {
    const completedTargetDiv = completedBtn.parentNode;
    deleteFromIncompleteList(completedTargetDiv);

    const text = completedTargetDiv.firstElementChild.innerText;

    completedTargetDiv.textContent = null;  // 初期化
    const li = document.createElement("li");
    li.innerText = text;
    const backBtn = document.createElement("button");
    backBtn.innerText = "戻す";
    backBtn.addEventListener("click", () => {
      const backTargetDiv = backBtn.parentNode;
      document.getElementById("js-complete-list").removeChild(backTargetDiv);
      const text = backBtn.parentNode.firstElementChild.innerText;
      addToIncompleteList(text);
    });

    completedTargetDiv.appendChild(li);
    completedTargetDiv.appendChild(backBtn);
    // 完了リスト追加
    document.getElementById("js-complete-list").appendChild(completedTargetDiv);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "削除";
  deleteBtn.addEventListener("click", () => {
    const deleteTargetDiv = deleteBtn.parentNode;
    deleteFromIncompleteList(deleteTargetDiv);
  });

  // div の下に追加
  div.appendChild(li);
  div.appendChild(completedBtn);
  div.appendChild(deleteBtn);

  // 一番下に追加
  document.getElementById("js-incomplete-list").appendChild(div);
};

const deleteFromIncompleteList = (target) => {
    document.getElementById("js-incomplete-list").removeChild(target);
}
