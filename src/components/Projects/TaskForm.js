import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./Projects.css"
import { useParams } from "react-router-dom"



export const TaskForm = ({setShowForm, assignTask}) => {
    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)
    const { projectId } = useParams()
   

    const [task, update] = useState({
        description: "",
        projectId: projectId, 
        isComplete: false

    })
    

    




    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
    
        })
            .then(r => r.json())
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
            .then(() => setShowForm(false))
    }


    return (
        <main>
            <h2>Project Tasks</h2>
            <div className="container--projectsTasks">
                <section>
                    <form className="taskForm">
            
           
                <fieldset>
                    <label htmlFor="task">Task:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Project Task"
                        value={task.description}
                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </fieldset>

          
                
              </form>
           
                <button classname="btn btn-primary" onClick={handleSaveButtonClick}>
                Add Task
                </button>

                
                 </section>
                </div>
                </main>
    )
}