import React, { useState, useEffect, useRef } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { ITodo } from '../interfaces'

import Modal from 'react-modal'


declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  const [showModal, setShowModal] = useState(false);
  const [model, setModel] = useState([...todos]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleHandler = (id: number) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
    const shoudRemove = confirm('Вы уверены, что хотите удалить элемент?')
    if (shoudRemove) {
      setTodos(prev => prev.filter(todo => todo.id !== id))
    }
  }




  return (
    <>
      <TodoForm onAdd={addHandler} />



      {/* <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      /> */}

      <ul>
        {todos.map((todo, index) => {
          const classes = ['todo']
          if (todo.completed) {
            classes.push('completed')
          }

          return (

            <div key={todo.id}>
              <Modal
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
              >
                Вы уверены ?
                <p>ID пункта todo =  {todo.id}</p>
                <button onClick={() => {
                  console.log('click Да');
                  const newModel = [...todos];
                  newModel.splice(index, 1);
                  setTodos(newModel);
                  console.log('setTodos = ', todos);
                  setModel(newModel);
                  console.log('setModel = ', setModel);
                  setShowModal(false)

                }}>Да</button>
                <button onClick={() => setShowModal(false)}>Нет</button>
              </Modal>


              <li className={classes.join(' ')} >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleHandler(todo.id)}
                  />
                  <span>{todo.title}</span>
                  <span>{todo.id}</span>
                  <i
                    className="material-icons red-text"
                    onClick={(event) => {
                      setShowModal(true)
                      console.log('click trush open modal');
                    }}
                  >
                    delete
                  </i>
                </label>
              </li>
            </div>


          )
        })}
      </ul>

    </>
  )
}
