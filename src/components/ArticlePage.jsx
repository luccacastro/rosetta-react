import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"


const ArticlePage = () => {
    const { article_id } = useParams()
    const [articleData, setArticleData] = useState({})
    const [commentData, setCommentData] = useState([])
    let location = useLocation()
    console.log(article_id)
    useEffect(()=>{
        const url = `https://nc-news-example-seminar-3-16.herokuapp.com/api/articles/${article_id}`
        axios.get(url).then(({data}) =>{
            console.log(data.article)
            setArticleData(data.article)
            return axios.get(`${url}/comments`)
        }).then(({data}) =>{
            setCommentData(data.comments)
        }).catch(err => console.log(err))
    },[location])
    return(
        <div>
             <main className="main-container">
             <div className="news-container">
              
                <section className="card-list-container">
                    <div className="card-wrapper">
                    {commentData.map(item => {
                        return <p>{item.body}</p>
                        })}
                    </div>
                </section>
                </div>
            </main>
            
        </div>
        
    )
}

export default ArticlePage