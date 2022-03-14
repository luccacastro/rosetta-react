import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"


const ArticlePage = () => {
    const { article_id } = useParams()
    const [articleData, setArticleData] = useState({})
    const [commentData, setCommentData] = useState([])
    let location = useLocation()
    console.log(location)
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
    },[])

    const separateParagraph = (text) => {
        console.log(text)
        return text.split('.').filter(x => x).map(x => x + '.')
    }

    return(
        <div>
             <main className="main-container">
             <div className="news-container">
              
                <section className="card-list-container">
                    <div className="card-wrapper">
                        <div className="news-card-content article-content">
                        <div className="article-page-upvote-section"></div>
                            <div className="content-wrapper">
                                <h3 className="article-title">{articleData.title}</h3>
                                <p className="article-body">{articleData.body}</p>
                                {/* {separateParagraph(articleData.body).map(item =>{
                                    console.log(item)
                                    return <p className="article-body">{item}</p>
                                })} */}
                            </div>
                           
                        </div>
                    </div>
                </section>
                </div>
            </main>
            
        </div>
        
    )
}

export default ArticlePage