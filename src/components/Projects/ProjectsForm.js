import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./Projects.css"



export const ProjectsForm = () => {
    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)

    const navigate = useNavigate()

    const [projects, update] = useState({
        projectName: "",
        userId:0, 
        note: "",
        task: "",
    })
    const [users, setUsers] = useState([

    ]

    )

    useEffect(
        () => {
            fetch('http://localhost:8088/users')
                .then(response => response.json())
                .then((usersArray) => {
                    let filteredUsersArray = usersArray.filter(u => u.group === projectcUserObject.group)
                    setUsers(filteredUsersArray)
                })
        },
        []
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch("http://localhost:8088/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projects)
    
        })
            .then(r => r.json())
            .then(() => navigate("/Projects"))
    }


    return (
        <main>
            <h2>Assign New Project</h2>
            <div className="container--projectsForm">
                <section>
                    <form className="projectsForm">
            
           
                <fieldset>
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Title of Project"
                        value={projects.projectName}
                        onChange={
                            (evt) => {
                                const copy = { ...projects }
                                copy.projectName = evt.target.value
                                update(copy)
                            }
                        } />
                </fieldset>

                <fieldset>
                    <label htmlFor="userId">Assigned User:</label>
                    <select name="userId" id="userId" onChange={
                    (evt) => {
                            const copy = { ...projects }
                            copy.userId = evt.target.value
                            update(copy)
                        } }>
                        <option value="0">Select a user</option>
                    {users.map(user => {
                        return <option value={user.id}>{user.username}</option>
                        })}
                     </select>      
                </fieldset>
                
                
                            <label htmlFor="note">Project Notes:</label>
                            < input
                                required autoFocus
                        type = "text"
                        className = "form-control"
                        placeHolder = "Notes for project"
                        value = { projects.note }
                        onChange = {
                                    (evt) => {
                                        const copy = {...projects}
                    copy.note = evt.target.value
                    update(copy)
                                    }
                                } />
                
              </form>
           
                <button classname="btn btn-primary" onClick={handleSaveButtonClick}>
                Add Project
                </button>

                
                 </section>
                </div>
                </main>
    )
}