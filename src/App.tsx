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

  const marcarCompleta = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  return (
    <>
      <div className='app'>
        <div className='container'>
          <h1>Todo List</h1>
          <div className='input-container'>
            <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button onClick={adicionarTarefa}>Adicionar tarefa</button>
          </div>
          <ol>
            {
              todos.map((todo) => (
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.completed} onChange={() => marcarCompleta(todo.id)} />
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
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
