import React from "react";

export const IncompleteTodos = (props) => {
  const { incompleteTodos, onClickCompleted, onClickDelete } = props;
  return (
    <div className="incompleted-area ly-comp-area ul-mar ul-pad ul-rds">
      <p class="el-title">未完了</p>
      <ul>
        {incompleteTodos.map((todo, index) => {
          return (
            <div key={todo} className="bl-row">
              <li className="ul-mar-r8">
                <p>Todo</p>
                <button className="ul-brd" onClick={() => onClickCompleted(index)}>完了</button>
                <button className="ul-brd" onClick={() => onClickDelete(index)}>削除</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
