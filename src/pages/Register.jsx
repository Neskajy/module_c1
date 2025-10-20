import { Link, useNavigate, useResolvedPath } from "react-router-dom"
import { $fetch } from "../fetch"
import { useRef, useState } from "react";

export default function Register() {
    
    const form = useRef()
    const [error, setError] = useState(null)

    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(form.current)

        const response = await $fetch("api-of/register", {
            method: "POST",
            body: formData
        })

        console.log(response)

        if (response?.errors) {
            setError(response?.errors)
            return
        }

        alert("Вы успешно зарегестрировались")
        nav("/login")
    }
    
    return (
        <div id="register-page" className="page">
            <div className="form-container">
                <h2 className="form-title">Присоединяйтесь к нам!</h2>
                <form id="register-form" name="" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="register-email">Email</label>
                        <input type="email" id="register-email" className="form-control" placeholder="Введите ваш email" name="email"/>
                            <div className="error-message"><i className="fas fa-exclamation-circle"></i>{error?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-username">Никнейм</label>
                        <input type="text" id="register-username" className="form-control" placeholder="Введите ваш никнейм" name="nickname"/>
                            <div className="error-message"><i className="fas fa-exclamation-circle"></i>{error?.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Пароль</label>
                        <input type="password" id="register-password" className="form-control" placeholder="Придумайте надежный пароль" name="password"/>
                            <div className="error-message"><i className="fas fa-exclamation-circle"></i>{error?.message}</div>
                    </div>
                    <button type="submit" className="btn btn-block"><i className="fas fa-user-plus"></i> Зарегистрироваться</button>
                    <div className="text-center mt-3">
                        <Link to="/login">Уже есть аккаунт? Войдите</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}