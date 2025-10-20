import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";

export default function Logout() {

    const nav = useNavigate();
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            return;
        }
        localStorage.removeItem("token")
        setUser(null)
        alert("Вы успешно вышли из системы")
        nav("/")
    }, [])


    return null
}
