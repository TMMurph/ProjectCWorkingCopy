import { Outlet, Route, Routes } from "react-router-dom"
import { ProjectsList } from "../Projects/ProjectsList"
import { ProjectsForm } from "../Projects/ProjectsForm"
import { UserForm } from "../Admin/UserForm"
import { AdminPage} from "../Admin/Admin"
import "./Views.css"
import { ProjectDetails} from "../Projects/ProjectDetails"



export const AdminViews = () => {
	return (
        <Routes>
            

                   
                <Route path="/" element={ <AdminPage /> }  />
                
                <Route path="projects" element={ <ProjectsList /> } />
                <Route path="/projectdetails/:projectId" element={ <ProjectDetails />} />
               
                <Route path="projects/create" element={ <ProjectsForm /> } />

                <Route path="users/create" element={ <UserForm />} />

              
               
                
            
        </Routes>
    )
}