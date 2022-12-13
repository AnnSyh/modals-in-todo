import React, { useState, useRef } from 'react'
import { ITodo } from '../interfaces'
import Modal from 'react-modal'


type TodoListProps = {
  todos: ITodo[]
  onToggle(id: number): void
  onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {

  const [showModal, setShowModal] = useState(false);
  const [model, setModel] = useState([...todos]);
  const deleteFunc = useRef(null);




  if (todos.length === 0) {
    return <p className="center">Пока дел нет!</p>
  }

  const removeHandler = (event: React.MouseEvent, id: number) => {
    // event.preventDefault()
    // onRemove(id)
    console.log('removeHandler id = ', id);
  }

  return (
    <>

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
                  debugger

                  const newModel = [...todos];
                  newModel.splice(index, 1);
                  setModel(newModel);
                  console.log('setModel = ', model);

                }}>Да</button>
                <button onClick={() => setShowModal(false)}>Нет</button>
              </Modal>


              <li className={classes.join(' ')} >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle.bind(null, todo.id)}
                  />
                  <span>{todo.title}</span>
                  <span>{todo.id}</span>
                  <i
                    className="material-icons red-text"
                    // onClick={event => removeHandler(event, todo.id)}
                    onClick={event => {
                      setShowModal(true)
                      // deleteFunc.current = () => {
                      console.log('click trush open modal');
                      // }
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
