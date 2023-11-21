import React, {useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("projectc_user", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin,
                        group: user.group
                    }))

                    navigate("/")
                }

                else {
                    window.alert("Invalid Login")
                }
            })
    }
            
        return (

           <main>

            <h1>Project C</h1> 
            <h2>Login/Register</h2>
            <div className="container--login">
               
                <section>
                    
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset>
                            
                        </fieldset>
                        
                        <fieldset>
                            <p>Returning User?</p>
                            <label htmlFor="inputEmail"></label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email Address"
                                required autoFocus />
                       
                            <button type="submit">
                               Sign In
                            </button>
                            
                        </fieldset>
                        <fieldset>
                            <p>Don't Have An Account?</p>
                        <Link to="/Register">Register</Link>
                        </fieldset>
                        </form>
                        </section>
                </div>

         </main>
        )

}