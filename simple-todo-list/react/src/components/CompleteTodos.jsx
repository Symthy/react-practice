import React from 'react';

export const CompleteTodos = (props) => {
  const { completeTodos, onClickBack } = props
  return (
    <div className="completed-area ly-comp-area ul-mar ul-pad ul-rds">
      <p className="el-title">完了</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <div key={todo} className="bl-row">
              <li className="ul-mar-r8">
                <p>Todo</p>
                <button className="ul-brd" onClick={() => onClickBack(index)}>戻す</button>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
