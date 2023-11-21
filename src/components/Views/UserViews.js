import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ProjectDetails } from "../Projects/ProjectDetails"
import { ProjectsList } from "../Projects/ProjectsList"
import "./Views.css"
import { Outlet, Route, Routes } from "react-router-dom"


export const UserViews = () => {
    const [projects, setProjects] = useState([])
    const [filteredProjects, setFiltered] = useState([])
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    
   
  return (
        <Routes>
            <Route path="/" element={
                <>
        <h1></h1>
        
        <ProjectsList />
        <Outlet />
        
        </>
            }>  
                <Route path="/projectdetails/:projectId" element={ <ProjectDetails />} />
                
                
            </Route>
            

         </Routes>

         
       )
}
    
    