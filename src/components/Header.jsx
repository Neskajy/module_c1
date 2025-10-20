import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../App";

export default function Header() {

    const path = useLocation().pathname;

    const {user} = useContext(UserContext);

    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <Link to="/" className="logo">
                        <i className="fas fa-pen-nib"></i>
                        <span>БлогПлатформа</span>
                    </Link>
                    <ul className="nav-links">
                        <li><Link to="/" className={path === "/" ? "active" : ""}><i className="fas fa-home"></i> Главная</Link></li>
                        <li><Link to="/profile" className={path === "/profile" ? "active" : ""}><i className="fas fa-user"></i> Мой профиль</Link></li>
                        <li><Link to="/post_form" className={path === "/post_form" ? "active" : ""}><i className="fas fa-plus-circle"></i> Создать пост</Link></li>
                    </ul>
                    {
                        !user?.data && (
                            <div className="user-actions">
                                <Link to="/login" className="btn btn-outline"><i className="fas fa-sign-in-alt"></i> Войти</Link>
                                <Link to="/register" className="btn"><i className="fas fa-user-plus"></i> Регистрация</Link>
                            </div>
                        )
                    }
                    {
                        user?.data && (
                            <Link to="/logout" className="btn"><i className="fas fa-user-plus"></i>Выйти</Link>
                        )
                    }
                </nav>
            </div>
        </header>
    )
}