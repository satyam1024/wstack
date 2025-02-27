import { TaskProps } from "@/types/index";

import EditTask from "./editTask";
import { deleteTask, updateStatus } from "../../lib/helper";
import { revalidatePath } from "next/cache";

const TodoCard = ({ change,todo }: { change:()=>void ,todo: TaskProps }) => {
  async function handleClick(type:string){

    if(type==='delete'){
      await deleteTask(todo.id);
    }
    else if(type==='status'){
      await updateStatus(todo.id);
    }
    else{
      console.log("Something went wrong")
    }
    change();
    
  } 
  return (
    <div
      className="w-[50vw] mx-auto flex  flex-row items-center justify-between bg-slate-900 py-4 px-20 rounded-2xl"
    >
      <span className={`${todo.isCompleted ? "line-through":""} text-center font-bold uppercase text-white`}>{todo.title} </span>
      <div className="flex flex-row justify-center items-center">
      
      {todo.isCompleted?null:(
      <div className="flex items-center mx-2">
        <EditTask todo={todo} change={change} />
      </div>
      )}
      <div className="flex items-center m-[1vw] ">
      <button type="submit" onClick={()=>handleClick("status")} className={`${todo.isCompleted ? "bg-blue-400" : "bg-green-500"} text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none `}>
      {todo.isCompleted ?"Mark Incomplete":"Mark Complete"}
        </button>
      </div>
      <div className="flex items-center ">
      <button type="submit" onClick={()=>handleClick("delete")}
        className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-red-500"
      >Delete</button>
      </div>
    </div>
    </div>
  );
};

export default TodoCard;