import { use, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { $fetch } from "../fetch";


export default function Post_form_page() {

    const form = useRef();

    const [errors, setErrors] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        const response = await $fetch("api-of/posts", {
            "method": "POST",
            body: formData
        })

        if (response?.errors) {
            console.log(response?.errors)
            setErrors(response.errors)
            return;
        }

        console.log(response)

        alert("Пост успешно создан!")
    }

    return (
        <div id="post-form-page" className="page">
            <div className="post-form">
                <h2 className="form-title">Создание публикации</h2>
                <form id="create-post-form" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="post-title">Заголовок</label>
                        <input type="text" id="post-title" className="form-control" placeholder="Введите заголовок" name="title"/>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{errors?.title}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="post-text">Текст публикации</label>
                        <textarea id="post-text" className="form-control" rows="5" placeholder="Введите текст публикации" name="description"></textarea>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{errors?.description}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="post-image">Изображение (опционально)</label>
                        <div className="file-upload">
                            <input type="file" id="post-image" accept="image/*" name="img"/>
                            <label htmlFor="post-image" className="file-upload-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                <span>Перетащите изображение сюда или нажмите для выбора</span>
                            </label>
                        </div>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{errors?.message}</div>
                    </div>
                    <div className="form-group text-right">
                        <button type="button" className="btn btn-outline"><i className="fas fa-times"></i> Отмена</button>
                        <button type="submit" className="btn"><i className="fas fa-paper-plane"></i> Опубликовать</button>
                    </div>
                </form>
            </div>
        </div>
    )
}