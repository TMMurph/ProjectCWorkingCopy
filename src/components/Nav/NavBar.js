import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
const navigate = useNavigate();




    return (
        
          <nav>  

        <ul className="navbar">
        
             {
                
                localStorage.getItem("projectc_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("projectc_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
                    
            }
            </ul>
       </nav>
    )
        }
    


export default NavBar