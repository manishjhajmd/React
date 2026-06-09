import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
const Todo = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const initialTodos =[
  { id: nanoid(), name: 'Manish', age: 25, address: '123 Main St' },
  { id: nanoid(), name: 'Rajnish', age: 30, address: '456 Oak Ave' },
  { id: nanoid(), name: 'Amit', age: 28, address: '789 Pine Rd' },
  { id: nanoid(), name: 'Suresh', age: 35, address: '101 Maple Dr' },
  { id: nanoid(), name: 'Vikas', age: 27, address: '202 Cedar Ln' },
  { id: nanoid(), name: 'Ankit', age: 32, address: '303 Birch St' },
  { id: nanoid(), name: 'Priya', age: 24, address: '404 Elm Ave' },
  { id: nanoid(), name: 'Neha', age: 29, address: '505 Willow Rd' },
  { id: nanoid(), name: 'Pooja', age: 31, address: '606 Ash Dr' },
  { id: nanoid(), name: 'Rahul', age: 26, address: '707 Spruce Ln' },
  { id: nanoid(), name: 'Karan', age: 33, address: '808 Cherry St' },
  { id: nanoid(), name: 'Deepak', age: 38, address: '909 Walnut Ave' },
  { id: nanoid(), name: 'Ritu', age: 23, address: '111 Poplar Rd' },
  { id: nanoid(), name: 'Sneha', age: 27, address: '222 Magnolia Dr' },
  { id: nanoid(), name: 'Nitin', age: 34, address: '333 Cypress Ln' },
  { id: nanoid(), name: 'Ajay', age: 36, address: '444 Redwood St' },
  { id: nanoid(), name: 'Meena', age: 28, address: '555 Palm Ave' },
  { id: nanoid(), name: 'Arun', age: 40, address: '666 Lakeview Rd' }
]
  const [allTodos, setAllTodos] = useState(initialTodos);
  const [todos, setTodos] = useState(initialTodos);
const [detail, setDetail] = useState({
    name: '',
    age: '',
    address: ''
  });
  
  const handleAddTask = (id) => {
    if (editingId && isEditing) {
      const updatedTodos = allTodos.map((item) => item.id === editingId ?
        {
          ...item,
          name: detail.name,
          age: detail.age,
          address: detail.address
        }
        : item)
      setAllTodos(updatedTodos)
      setTodos(updatedTodos)
      setCurrentPage(1)
      setDetail({ name: '', age: '', address: '' })
      setIsEditing(false)
      setEditingId(null)
    } else {
      const newTodo = { id: nanoid(), name: detail.name, age: detail.age, address: detail.address };
      const updatedAllTodos = [...allTodos, newTodo];
      setAllTodos(updatedAllTodos);
      setTodos(updatedAllTodos);
      setCurrentPage(1)
      setDetail({ name: '', age: '', address: '' });
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
    const updatedAllTodos = allTodos.filter((item) => item.id !== id);
    setAllTodos(updatedAllTodos);
    setTodos(updatedAllTodos);
    setCurrentPage(1)
  }
  const handleSearch=(e)=>{
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setTodos(allTodos);
      setCurrentPage(1)
    } else {
      const searchResults = allTodos.filter((item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.age.toString().includes(searchTerm) ||
        item.address.toLowerCase().includes(searchTerm)
      );
      setTodos(searchResults);
      setCurrentPage(1)
    }
  }
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5;
  const start = (currentPage - 1) * perPage;
  const currentItems = todos.slice(start, start + perPage);
  return (
    <div className='w-11/12 mx-auto bg-slate-100 rounded p-3'>
      <h2>Todo List</h2>
      <input type='search' placeholder='Search tasks...' onChange={handleSearch} />
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
                <button onClick={() => { setIsEditing(false); setEditingId(null); setDetail({ name: '', age: '', address: '' }); }} className='bg-gray-300 p-1 rounded ml-2'>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      </div>
      <div className='my-3'>


        {currentItems.map(item => (
          <ul className='flex w-full shrink-1 basis-auto grow-0 gap-3 border-b py-2 bg-white' key={item.id}>
            <li className='w-50'>{item.id}</li>
            <li className='w-30'>{item.name}</li>
            <li className='w-10'>{item.age}</li>
            <li className='w-30'>{item.address}</li>
            <li className='w-10'> <button onClick={() => { editTask(item.id) }}><FaRegEdit /></button></li>
            <li className='w-10'><button onClick={() => { deleteTask(item.id) }}><FaRegTrashAlt /></button></li>
          </ul>))}
        <div className="flex items-center justify-between mt-3">
          <div>
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded mr-2">Prev</button>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, Math.max(1, Math.ceil(todos.length / perPage))))} className="px-3 py-1 bg-gray-200 rounded">Next</button>
          </div>
          <div>
            Page {currentPage} of {Math.max(1, Math.ceil(todos.length / perPage))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Todo;