import { Link } from "react-router-dom"
import { $fetch } from "../fetch"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {

    const form = useRef();
    const [error, setError] = useState(null);

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        const response = await $fetch("api-of/login", {
            method: "POST",
            body: formData,
        });

        console.log(response)

        if (response?.errors) {
            setError(response.errors)
            return
        }

        if (response?.credentials?.token) {
            localStorage.setItem("token", response?.credentials?.token)
        }

        nav("/profile")
    }

    return (
        <div id="login-page" className="page">
            <div className="form-container">
                <h2 className="form-title">С возвращением!</h2>
                <form id="login-form" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input type="email" name="email" id="login-email" className="form-control" placeholder="Введите ваш email"/>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{error?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Пароль</label>
                        <input type="password" name="password" id="login-password" className="form-control" placeholder="Введите ваш пароль"/>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{error?.message}</div>
                    </div>
                    <button type="submit" className="btn btn-block"><i className="fas fa-sign-in-alt"></i> Войти</button>
                    <div className="text-center mt-3">
                        <Link to="/register">Нет аккаунта? Зарегистрируйтесь</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}