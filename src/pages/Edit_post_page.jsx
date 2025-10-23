import { use, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { $fetch } from "../fetch";


export default function Edit_post_page() {

    const { post_id } = useParams();

    const form = useRef()
    const [currentPost, setCurrentPost] = useState(null)

    const [errors, setErrors] = useState(null);

    const get_post = async (post_id) => {
        const response = await $fetch(`api-of/posts`, {
            method: "GET",
            body: {
                id: post_id
            }
        })

        return response?.data?.find(post => +post_id === post?.id)
    }

    useEffect(() => {
        async function getData() {
            const data = await get_post(post_id);
            setCurrentPost(data)
            console.log(data) // а тут undefined
        }
        getData()
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);

        let json = {}
        for (let [key, value] of formData) {
            if (key !== "img") {
                json[key] = value
            }
        }

        json = JSON.stringify(json)

        const response = await $fetch(`api-of/posts/${post_id}`, {
            "method": "PATCH",
            body: json
        })

        if (response?.errors) {
            setErrors(response.errors)
            return;
        }

        console.log(response)

        alert("Пост изменен!")
    }


    return (
        <div id="post-form-page" className="page">
            <div className="post-form">
                <h2 className="form-title">Изменение публикации</h2>
                <form id="create-post-form" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="post-title">Заголовок</label>
                        <input type="text" id="post-title" className="form-control" name="title" defaultValue={currentPost?.title}/>
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{errors?.title}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="post-text">Текст публикации</label>
                        <textarea id="post-text" className="form-control" rows="5" placeholder="Введите текст публикации" name="description" defaultValue={currentPost?.description}></textarea>
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
                        <div className="error-message"><i className="fas fa-exclamation-circle"></i>{errors?.img}</div>
                    </div>
                    <div className="form-group text-right">
                        <button type="button" className="btn btn-outline"><i className="fas fa-times"></i> Отмена</button>
                        <button type="submit" className="btn"><i className="fas fa-paper-plane"></i> Изменить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}