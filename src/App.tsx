import { useState } from 'react'
import './App.css'

interface TodoItem {
  id: string
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState<string>('')

  const adicionarTarefa = () => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID()
      const newTodoItem: TodoItem = { id: newId, text: newTodo, completed: false }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }

  }

  return (
    <>
      <div className='app'>
        <div className='container'>
          <h1>Todo List</h1>
          <div className='input-container'>
            <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
            <button onClick={adicionarTarefa}>Adicionar tarefa</button>
          </div>
          <ol>
            {
              todos.map((todo) => (
                <li key={todo.id}>
                  <span>{todo.text}</span>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    </>
  )
}

export default App
