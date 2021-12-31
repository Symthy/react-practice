import React from 'react';

export const InputTodoArea = (props) => {
  const { todoText, onChange, onClickAdd, isDisabled } = props;
  return (
  <div className="input-area ul-mar ul-pad ul-rds">
    <input
      disabled={isDisabled}
      value={todoText}
      onChange={onChange}
      className="ul-brd ul-pad-6-16"
      type="text"
      placeholder="Todo入力" />
    <button
      disabled={isDisabled}
      className="ul-brd"
      onClick={onClickAdd}>Add</button>
  </div>
  );
}
