import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const UserForm = () => {
    const localProjectcUser = localStorage.getItem("projectc_user")
    const projectcUserObject = JSON.parse(localProjectcUser)
    const navigate = useNavigate()

    const [users, update] = useState({
        username: "",
        isAdmin: false,
        group: projectcUserObject.group,
        email: ""
     })
   
   

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
    
        })
            .then(r => r.json())
            .then(() => navigate("/Users"))

      
    }

    return (

        
        <form className="userForm">
            <h2 className="userForm__title">New User to Your Group</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="username">Assign New Username:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Requested username for new user"
                        value={users.username}
                        onChange={
                            (evt) => {
                                const copy = {...users}
                                copy.username = evt.target.value
                                update(copy)
                            }
                        } />

                        <label htmlFor="email">New User Email</label>
                        <input
                            required autoFocus
                            type="email"
                            className="form-control"
                            placeholder="Email of new user"
                            value={users.email}
                            onChange={
                                (evt) => {
                                    const copy = {...users}
                                    copy.email = evt.target.value
                                    update(copy)
                                }
                            } />
                </div>
                <div>
                        
                </div>
            </fieldset>

           
            <button className="btn btn-primary" onClick={handleSaveButtonClick}>
                Add User
            </button>
        </form>
    )
}

