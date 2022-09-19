import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className='mx-auto bg-white w-96 h-96 overflow-y-scroll'>
        {todos.map((todo) => {
          return (
            <div className='mt-4 -mb-4 flex items-center justify-center'>
              <button
                onClick={() => modifyStatusTodo(todo)}
                className='w-4 h-4 rounded-lg m-2'
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
              ></button>
              <p className='w-60 text-start text-2xl font-bold text-yellow-500'>
                {todo.name}
              </p>
              <p className='w-60 text-start text-2xl font-bold text-yellow-500'>
                {todo.telefone}
              </p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit className="w-8 h-8 fill-yellow-500"></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete className="w-8 h-8 fill-yellow-500"></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    setInputVisility(!inputVisbility);
  }
  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisility(true);
  }
  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  }
  async function editTodo() {
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValue,
      telefone: inputValue,
    });
    setSelectedTodo();
    setInputVisility(false);
    getTodos();
    setInputValue("");
  }
  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`,
    );
    getTodos();
  }
  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
      telefone: inputValue
    });
    getTodos();
    setInputVisility(!inputVisbility);
    setInputValue("");
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisbility, setInputVisility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='bg-gray-500 w-full mx-auto flex justify-center items-center'>
      <header className='  min-h-screen flex flex-col justify-center items-center'>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className='text-center w-48 h-12 mt-4'
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className='bg-yellow-500 rounded-lg py-4 px-4 text-white font-bold mt-4'
        >
          {inputVisbility ? "Confirmar" : "+ Novo Contato"}
        </button>
      </header>
    </div>
  );
}

export default App;
