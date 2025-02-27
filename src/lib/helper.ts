

export async function  deleteTask (id:string){

    if (!id) {
      alert("Invalid task ID");
      return;
    }
  
      try {
        const res = await fetch(`/api/task/${id}`, { 
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
        
          return;
        } else {
          const data = await res.json();
          alert(data.error || "Something went wrong.");
        }
      } catch (error) {
        console.error("Failed to Delete task:", error);
        
      }
  }


  
export async function updateTask(id:string,input:string) {
    if (!id) {
      alert("Invalid task ID");
      return;
    }
  
      try {
        const res = await fetch(`/api/changeTask/${id}`, { 
          method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });

      if (res.ok) {
      return;
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Failed to update task title:", error);
      
    }
    
  };


  export async function  updateStatus (id:string){

    if (!id) {
      alert("Invalid task ID");
      return;
    }
  
      try {
        const res = await fetch(`/api/changeStatus/${id}`, { 
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
  
        if (res.ok) {
        
         return;
        } else {
          const data = await res.json();
          alert(data.error || "Something went wrong.");
        }
      } catch (error) {
        console.error("Failed to update status:", error);
        
      }
  }



  