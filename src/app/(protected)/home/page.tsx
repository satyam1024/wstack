"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect,useState } from "react";
import { signOut } from "next-auth/react";
import AddTodo from "@/components/task/addTask";
import {TaskProps} from "@/types/index";
import TaskCard from "@/components/task/taskCard";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [reload,setReload]=useState(0);
  const handleReload = useCallback(() => {
    setReload(prev => prev + 1);
  }, []);
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/task");
      const data = await res.json();
      setTasks(data);
    };
    fetchTodos();
  }, [reload]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gradient-to-br bg-white"> 
    <div className="flex flex-row items-center  mt-[1rem] justify-between w-full bg-black">
    <h1 className="text-4xl font-extrabold uppercase ml-[7vw] self-start  mb-4 text-white">TODO App</h1>
    <div className="mr-[5rem] self-end flex flex-row justify-between px-5 items-center">
    <h1 className="text-2xl  font-bold mb-4 text-white">{session?.user?.name}!</h1>
    <button
            onClick={() => signOut()}
            className="bg-red-500 ml-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
    </div>
    
    </div>

        <div className="w-screen py-20 flex justify-center flex-col items-center bg-white">
  
        
        <div className="flex flex-col justify-center items-center">
            <AddTodo change={handleReload}/>
            <div className=" w-[50vw] flex flex-col items-center justify-center  ">
              {tasks.map((task,id)=>(
                <div className="justify-between p-10 "key={id}>
                  <TaskCard change={handleReload} todo={task}/>
                </div>
              ))}
            </div>
        </div>
      </div>
      </div>
  );
}
