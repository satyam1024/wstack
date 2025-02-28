"use client"
import { useTasks } from '@/hooks/useTasks';
import React ,{useState} from 'react'

const AddTodo = () => {

  const [input, setInput] = useState("");
  const { addTaskMutation } = useTasks();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a valid todo.");
      return;
    }

    addTaskMutation.mutate(input, {
      onSuccess: () => {
        setInput(""); 
      },
      onError: (error) => {
        console.error("Failed to add todo:", error);
      },
    });
  };



  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center">
        <input name="input" type="text" placeholder="Add Todo Here..." value={input} onChange={(e) => setInput(e.target.value)} className='block w-[25vw] p-4 mx-2 border rounded-lg bg-gray-700 border-gray-600 text-white' />

          <button type="submit" className="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">ADD</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;