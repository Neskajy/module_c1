import { Link } from "react-router-dom"
import { $fetch } from "../fetch"
import { useEffect, useState } from "react"
import Post from "../components/Post";

export default function Home() {

    const [postsData, setPostsData] = useState(null);

    const get_posts = async () => {
        const response = await $fetch("api-of/posts", {
            method: "GET"
        })
        return response
    }

    useEffect(
        () => {
            async function getData() {
                const data = await get_posts()
                setPostsData(data)
                console.log(data) // а почему выводит undefined если на бэке есть посты
            }
            getData()
        }, [])

    return (
        <div id="home-page" className="page">
            <div className="hero">
                <h1>Поделитесь своими мыслями с миром</h1>
                <p>Присоединяйтесь к сообществу авторов и читателей. Находите вдохновение, делитесь идеями и открывайте новые горизонты.</p>
                <Link to="/post_form" className="btn btn-secondary"><i className="fas fa-pen-fancy"></i> Начать писать</Link>
            </div>

            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input type="text" className="search-input" placeholder="Поиск по заголовку..."/>
            </div>

            <div className="posts-grid">
                {/* <!-- Пример публикации 1 --> */}
                {
                    postsData?.data.map((post) => {
                        return (
                            <Post post={post} doAfter={get_posts} setAfter={setPostsData} key={post?.id}/>
                        )
                    })
                }
            </div>

            {/* <!-- Пагинация --> */}
            <ul className="pagination">
                {/* <li><Link to="#" className="active">1</Link></li>
                <li><Link to="#">2</Link></li>
                <li><Link to="#">3</Link></li>
                <li><Link to="#">4</Link></li>
                <li><Link to="#">5</Link></li> */}
            </ul>
        </div>
    )
}