import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Admin.css"



export const AdminPage = () => {
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFiltered] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }


    return (

       
        <>
        <h1>Admin Page</h1>

         <>
            <button onClick={ () => navigate("/projects/create") }>New Project</button>
          </>
          <>
          <button onClick={ () => navigate("/users/create") }>New User</button>
          </>
          <>
          <button onClick={ () => navigate("/projects") }>All Projects</button>
          </>
          <>
          <button onClick={goBack}>Back</button>
          

           
            
            </>
                    
        
        </>

    )
}