import { useEffect, useState } from 'react'
import './App.css'
import { useTheme } from './themeContext'

interface TodoItem {
  id: string
  text: string
  completed: boolean
}

function App() {
  const chaveLocalStorage = 'todos'
  const {theme, toggleTheme} = useTheme()
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [estaCarregado, setEstaCarregado] = useState<boolean>(false)

  const adicionarTarefa = (): void => {
    if (newTodo !== "") {
      const newId = crypto.randomUUID()
      const newTodoItem: TodoItem = { id: newId, text: newTodo, completed: false }
      setTodos([...todos, newTodoItem])
      setNewTodo("")
    }
  }

  const removerTarefa = (id: string): void => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const marcarCompleta = (id: string): void => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const obterTarefasCompletas = () => {
    return todos.filter((todo) => todo.completed).length
  }

  useEffect(() => {
    if (estaCarregado) {
      localStorage.setItem(chaveLocalStorage, JSON.stringify(todos))
    }
  }, [todos, estaCarregado])

  useEffect(() => {
    const carregarTarefas = localStorage.getItem(chaveLocalStorage)
    if (carregarTarefas) {
      setTodos(JSON.parse(carregarTarefas))
    }
    setEstaCarregado(true)
  }, [])



  return (
    <>
      <div className={`app ${theme}`}>
        <div className={`container ${theme}`}>
          <h1>Todo List - {obterTarefasCompletas()} / { todos.length}</h1>
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
                  <button onClick={() => removerTarefa(todo.id)}>Remover</button>
                </li>
              ))
            }
          </ol>
          <button onClick={toggleTheme}>Alterar para o tema {theme === 'light' ? 'escuro' : 'claro'}</button>
        </div>
      </div>
    </>
  )
}

export default App
