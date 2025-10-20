import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"
import { $fetch } from "../fetch";
import { getUser } from "../App";
import Post from "../components/Post";

export default function Profile_page() {

    const {user, setUser} = useContext(UserContext);

    const like_post = async (post_id) => {
        const response = await $fetch(`api-of/posts/${post_id}/like`, {
            method: "POST"
        })

        const resultData = await getUser()

        setUser(resultData)
    }

    const unlike_post = async (post_id) => {
        const response = await $fetch(`api-of/posts/${post_id}/like`, {
            method: "DELETE"
        })

        const resultData = await getUser()

        setUser(resultData)
    }

    const delete_post = async (post_id) => {
        const response = await $fetch(`api-`)
    }

    return (
        <div id="profile-page" className="page">
            <div className="profile-header">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Аватар пользователя" className="profile-avatar" />
                <h2 className="profile-username">{user?.data?.nickname}</h2>
                <div className="profile-stats">
                    <div className="stat">
                        <div className="stat-value">{user?.data?.posts.length}</div>
                        <div className="stat-label">Публикации</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">
                            {                                
                                user?.data?.posts.reduce((sum, post) => {
                                    return sum + post?.count_likes
                                }, 0)
                            }
                        </div>
                        <div className="stat-label">Лайки</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value">Лол их в бэке нет</div>
                        <div className="stat-label">Подписчики</div>
                    </div>
                </div>
            </div>

            <div className="posts-grid">
                {/* <!-- Пример публикации пользователя 1 --> */}

                {user?.data?.posts.map((post) => {
                    return <Post post={post} doAfter={getUser} setAfter={setUser} key={post?.id}/>
                })}
            </div>

            {/* <!-- Пагинация --> */}
            <ul className="pagination">
                {/* <li><Link to="#" className="active">1</Link></li>
                <li><Link to="#">2</Link></li>
                <li><Link to="#">3</Link></li> */}
            </ul>
        </div>
    )
}