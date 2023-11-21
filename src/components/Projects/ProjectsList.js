import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Projects.css"

export const ProjectsList = () => {
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFiltered] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    
    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)
  
  useEffect(
        () => {
            fetch('http://localhost:8088/projects?_expand=user')
            .then(response => response.json())
            .then((projectsArray) => {
                setProjects(projectsArray)

            })
        },
        []
    )


    useEffect(
        () => {
            if(projectcUserObject.admin) {
                setFiltered(projects)
            }

            else {
                const myProjects = projects.filter(project => project.userId == projectcUserObject.id)
                setFiltered(myProjects)
            }
        },
        [projects]
    )
    
    useEffect (
        () => {
            if (openOnly) {
                const openProjectsArray = projects.filter(project => {
                    return project.userId === projectcUserObject.id && project.dateCompleted === ""
                })
                setFiltered(openProjectsArray)
            }

            else {
                const myProjects = projects.filter(project => project.userId === projectcUserObject.id)
                setFiltered(myProjects)
            }
        },
        [openOnly]
    )

    

  
   
return <>
    
<h1>All Projects</h1>
   

    <article className="projects">
            {
                filteredProjects.map(
                    (project) => {
                       
                       return <section className="project" key={`project--${project.id}`} id={`${project.id}`} 
                       onClick={() => navigate(`/projectDetails/${project.id}`)}>
                    
                            <h4>{project.projectName}</h4>
                            <p2>{`Assigned to: ${project.user.username}`}</p2>
                        </section>
                        
                    }
                )
            }
    </article>
</>
}
