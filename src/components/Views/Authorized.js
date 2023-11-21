import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("projectc_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/Login/${location.search}`}
            replace
            state={{ location }} />
    }
}