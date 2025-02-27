"use client";

import { useState } from "react";
import { TaskProps } from "@/types";
import { updateTask } from "../../lib/helper";

const EditTask = ({ change,todo }: {change:()=>void, todo: TaskProps }) => {
  const [editTodoState, setEditTodoState] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = async (id:string) => {
    await updateTask(id,input);
    setEditTodoState(false);
    change();
  };

  return (
    <>
      
      {editTodoState ? (
        <div className="flex flex-row justify-center items-center">
           <input name="input" type="text" placeholder="New Task" value={input} onChange={(e) => setInput(e.target.value)} className='block w-full p-4 mx-2 border rounded-lg bg-gray-700 border-gray-600 text-white' />
          <div className="flex justify-center flex-col ">
            
            <button type="button" className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-blue-500" onClick={()=>handleSubmit(todo.id)} >Save</button>
            <button type="button" className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-red-500" onClick={()=>{setEditTodoState(false);setInput("")}} >Cancel</button>
          </div>
        </div>
      ) : 
      (
        <div className="flex gap-5 items-center">
      <button type="submit" onClick={()=>{setEditTodoState(!editTodoState);}}
        className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-orange-500"
      >Edit</button>
      </div>
      )}
    </>
  );
};

export default EditTask;
