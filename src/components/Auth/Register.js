
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("projectc_user", JSON.stringify({
                        id: createdUser.id,
                        
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        
        <main style={{ textAlign: "center" }}>
            <h1 className>Project C</h1>
            <h2 className>Create New Account</h2>
            <form className="form--register" onSubmit={handleRegister}>
                
                <fieldset>
                    <label htmlFor="userName"> New Username: </label>
                    <input onChange={updateUser}
                           type="text" id="username" className="form-control"
                           placeholder="Requested Username" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email Address: </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isAdmin = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" id="isAdmin" />
                    <label htmlFor="email"> New Admin </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}
    


    