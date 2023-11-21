import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "./TaskForm";



export const ProjectDetails = () => {
   
    const [tasks, assignTask] = useState([])
    const { projectId } = useParams()
   const [project, setProject] = useState({})
   const [showForm, setShowForm] = useState(false) 
    const navigate = useNavigate()
   
    
   

    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)   
    
    const checkboxChange = (evt) => {
        fetch(`http://localhost:8088/tasks/${evt.target.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              isComplete: evt.target.checked,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
          .then(() => {
            fetch(`http://localhost:8088/tasks?_expand=project`)
        .then(response => response.json())
        .then((data) => {
           const filteredTasks = data.filter(task => {

                return task.projectId == projectId
            })
            assignTask(filteredTasks)
        })
          })
    }

    useEffect (() => {

        fetch(`http://localhost:8088/projects/${projectId}`)
        .then(response => response.json())
        .then(projectObj => setProject(projectObj))
        .then(fetch(`http://localhost:8088/tasks?_expand=project`)
        .then(response => response.json())
        .then((data) => {
           const filteredTasks = data.filter(task => {

                return task.projectId == projectId
            })
            assignTask(filteredTasks)
        })
        )


        
}, []
    )

     
   

  return (
    <main>
    
    
    <h2>Details</h2>
    <div className="container--details">
    
    
     <section className="task">
        <h5>Tasks:</h5>
        {tasks.map(task => {
       return ( <>
       <input type="checkbox" onChange={ checkboxChange } 
       id={task.id} 
       name={task.id} 
       value={tasks.description}
       checked={task.isComplete}/>
        <label for={task.id}> {task.description}</label><br/>
      </> )
 
 })}
    </section>
    

    <section className="note">
        <h5>Notes:</h5>
        <p>{project.note}</p>
    </section>
{showForm ? <section className="AddTaskForm">
<TaskForm  setShowForm={setShowForm} assignTask={assignTask}/>
    
</section>:
<section className="AddTaskButton">
    <button onClick={() => setShowForm(true)}>Add Task </button>
</section>
}
    
    </div>

    

   </main>
)

    }



  

    