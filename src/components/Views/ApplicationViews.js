import { AdminViews } from "./AdminViews"
import { UserViews } from "./UserViews"



export const ApplicationViews = () => {
    
    
    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)
    
    if (projectcUserObject.admin) {
        return <AdminViews />

    }

    else {
        return <UserViews />

    }
    }

