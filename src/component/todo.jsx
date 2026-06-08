import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useId } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
const Todo = () => {
  const [detail, setDetail] = useState({
    name: '',
    age: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [todos, setTodos] = useState([
    { id: nanoid(), name: 'Manish', age: 25, address: '123 Main St' },
    { id: nanoid(), name: 'Rajnish', age: 30, address: '456 Oak Ave' }
  ]);

  const handleAddTask = (id) => {
    setTodos([...todos, { id: nanoid(), name: detail.name, age: detail.age, address: detail.address }]);

    if (editingId && isEditing) {
      const updatedTodos = todos.map((item) => item.id === editingId ?
        {
          ...item,
          name: detail.name,
          age: detail.age,
          address: detail.address
        }
        : item)
      setTodos(updatedTodos)
      setDetail({ name: '', age: '', address: '' })
      setIsEditing(false)
      setEditingId(null)
    }
  };

  const editTask = (id) => {
    const editTask = todos.find((item) => item.id === id);
    setDetail({ name: editTask.name, age: editTask.age, address: editTask.address })
    setIsEditing(true)
    setEditingId(id)
    console.log(id)

  };
  const deleteTask = (id) => {
    const todo = todos.filter((item) => item.id !== id);
    setTodos(todo)
  }
  return (
    <div className='w-11/12 mx-auto bg-slate-100 rounded p-3'>
      <h2>Todo List</h2>
      <table className='flex'>
        <tbody>
          <tr>
            <td>
              <input
                type='text'
                value={detail.name}
                onChange={e => setDetail({ ...detail, name: e.target.value })}
                className='rounded-xl bg-white w-full border'
                placeholder='Enter Add Task' /></td>
            <td><input type="number" className='rounded-xl bg-white w-full border' name="age" value={detail.age} onChange={e => setDetail({ ...detail, age: e.target.value })} /></td>
            <td>
              <input type="text" className='rounded-xl bg-white w-full border' name="address" value={detail.address} onChange={e => setDetail({ ...detail, address: e.target.value })} />
            </td>
            <td>
              <button onClick={handleAddTask} className='bg-blue-300 p-1 rounded'>
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
              {isEditing && (
                <button onClick={() => { setIsEditing(false); setEditingId(null); setTask(''); }} className='bg-gray-300 p-1 rounded ml-2'>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className='my-3'>


        {todos.map(item => (
          <ul className='flex w-full shrink-1 basis-auto grow-0 gap-3 border-b py-2 bg-white' key={item.id}>
            <li className='w-50'>{item.id}</li>
            <li className='w-30'>{item.name}</li>
            <li className='w-10'>{item.age}</li>
            <li className='w-30'>{item.address}</li>
            <li className='w-10'> <button onClick={() => { editTask(item.id) }}><FaRegEdit /></button></li>
            <li className='w-10'><button onClick={() => { deleteTask(item.id) }}><FaRegTrashAlt /></button></li>
          </ul>))}
      </div>

    </div>
  );
};

export default Todo;