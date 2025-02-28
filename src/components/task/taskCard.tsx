import { TaskProps } from "@/types/index";

import EditTask from "./editTask";

import { useTasks } from "@/hooks/useTasks";



const TodoCard = ({ todo }: { todo: TaskProps }) => {
  
  const { updateStatusMutation, deleteTaskMutation, editTaskMutation } = useTasks();
  return (
    <div
      className="w-[50vw] mx-auto flex  flex-row items-center justify-between bg-slate-900 py-4 px-20 rounded-2xl"
    >
      <span className={`${todo.isCompleted ? "line-through":""} text-center font-bold uppercase text-white`}>{todo.title} </span>
      <div className="flex flex-row justify-center items-center">
      
      {todo.isCompleted?null:(
      <div className="flex items-center mx-2">
        <EditTask todo={todo} change={editTaskMutation} />
      </div>
      )}
      <div className="flex items-center m-[1vw] ">
      <button type="submit" onClick={()=>updateStatusMutation.mutate(todo.id)} className={`${todo.isCompleted ? "bg-blue-400" : "bg-green-500"} text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none `}>
      {todo.isCompleted ?"Mark Incomplete":"Mark Complete"}
        </button>
      </div>
      <div className="flex items-center ">
      <button type="submit" onClick={()=>deleteTaskMutation.mutate(todo.id)}
        className="text-white  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none bg-red-500"
      >Delete</button>
      </div>
    </div>
    </div>
  );
};

export default TodoCard;