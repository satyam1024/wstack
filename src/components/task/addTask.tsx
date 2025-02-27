"use client"
import React ,{useState} from 'react'

const AddTodo = ({change }:{change:()=>void }) => {

  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) {
      alert("Please enter a valid todo.");
      return;
    }

    try {
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });

      if (res.ok) {
        setInput(""); 
        change();
      } else {
        const data = await res.json();
        console.log(data.error, "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      
    }
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