import { useContext, useEffect, useState } from "react"
import { $fetch } from "../fetch"
import { Link } from "react-router-dom"
import { UserContext } from "../App"

export default function Post({post, doAfter, setAfter}) {

    const {user} = useContext(UserContext)

    const like_post = async (post_id) => {
        const response = await $fetch(`api-of/posts/${post_id}/like`, {
            method: "POST"
        })

        const resultData = await doAfter()

        setAfter(resultData)
    }

    const unlike_post = async (post_id) => {
        const response = await $fetch(`api-of/posts/${post_id}/like`, {
            method: "DELETE"
        })

        const resultData = await doAfter()

        setAfter(resultData)
    }

    const [isUsersPost, setIsUsersPost] = useState(false);

    useEffect(() => {
        console.log(user)
        user?.data?.posts.map((_post) => {
            _post?.id === post?.id && setIsUsersPost(true)
        })
    })

    async function delete_post() {
        await $fetch(`api-of/posts/${post?.id}`, {
            method: "DELETE",
        });

        alert("Пост удален")
    }

    return (
        <div className="post-card" >
            <img src={post?.img} alt="Изображение публикации" className="post-image" />
            <div className="post-content">
                <h3 className="post-title">{post?.title}</h3>
                <p className="post-text">{post?.description}</p>
                <div className="post-meta">
                    <span className="post-date"><i className="far fa-calendar"></i>{post?.created_at}</span>
                    <span className="post-likes"><i className="fas fa-heart"></i>лайков {post?.count_likes}</span>
                </div>
                <div className="post-actions">
                    <button className="like-btn" onClick={() => post?.liked_it ?  unlike_post(post.id) : like_post(post.id)}>
                        <i className="far fa-heart"></i>Лайк
                    </button>
                    {
                        isUsersPost && (
                            <>
                                <Link to={`/post_edit/${post?.id}`}>
                                    <button className="btn btn-outline"><i className="fas fa-edit"></i>Редактировать</button>
                                </Link>
                                <button className="btn btn-danger" onClick={delete_post}><i className="fas fa-trash"></i>Удалить</button> 
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}