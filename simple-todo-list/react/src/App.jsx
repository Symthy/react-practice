import React from 'react';
import { CompleteTodos } from './components/CompleteTodos';
import { IncompleteTodos } from './components/IncompleteTodos';
import { InputTodoArea } from './components/InputTodoArea';
import "./styles.css";

const App = () => {
  const [inputTodoText, setInputTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(['Default Todo']);
  const [completeTodos, setCompleteTodos] = useState(['Default Completed Todo']);

  const onChangeTodoText = (event) => setInputTodoText(event.target.value);

  const onClickAdd = () => {
    if (inputTodoText === "") {
      const newTodos = [...incompleteTodos, inputTodoText];
      setIncompleteTodos(newTodos);
      setInputTodoText("");
    }
  }

  const onClickDelete = (index) => {
    const updatedTodos = [...incompleteTodos];
    updatedTodos.splice(index, 1);
  };

  const onClickCompleted = (index) => {
    const updatedIncompleteTodos = [...incompleteTodos];
    updatedIncompleteTodos.splice(index, 1);
    const updatedCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(updatedIncompleteTodos);
    setCompleteTodos(updatedCompleteTodos);
  };

    const onClickBack = (index) => {
    const updatedCompleteTodos = [...completeTodos];
    updatedCompleteTodos.splice(index, 1);
    const updatedIncompleteTodos = [...incompleteTodos, completedTodos[index]];
    setIncompleteTodos(updatedIncompleteTodos);
    setCompleteTodos(updatedCompleteTodos);
  };

  return (
    <>
      <InputTodoArea
        todoText={todoText}
        onChange={onChangeTodoText}
        onClickAdd={onClickAdd}
      />
      {incompleteTodos.length >= 10 && (
        <p style={{color: 'red'}}>登録上限:10 タスク消化してください
        </p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickCompleted={onClickCompleted}
        onClickDelete={onClickDelete}
        isDisabled={incompleteTodos.length >= 10 }
      />
      <CompleteTodos
        completeTodos={completeTodos}
        onClickBack={onClickBack}
      />
    </>
  );
}

export default App;
