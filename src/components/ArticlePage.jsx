import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Comments from "./Comments"
import { Player } from 'video-react';
import ScrollToTop from "react-scroll-to-top";
import VoteIcon from '../vote_icon.png'
import ColoredVoteIcon from '../colored_vote_icon.png'

const ArticlePage = () => {
    const { article_id } = useParams()
    const [articleData, setArticleData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    let location = useLocation()
    console.log(location)
    console.log(article_id)
    useEffect(()=>{
        const url = `http://localhost:5502/api/post/${article_id}`
        console.log(url)
        axios.get(url).then(({data}) =>{
            console.log(data)
            setArticleData(data)
            setIsLoaded(true)
        }).catch(err => console.log(err))
    },[])

    const separateParagraph = (text) => {
        console.log(text)
        return text.split('.').filter(x => x).map(x => x + '.')
    }

    const commentRender = (comment) =>{
        // console.log(comment)
        let parentComments = comment.filter(item => item.parent_comment_id === article_id)
        parentComments.forEach((item)=> {
            item.depth = 1
        })
        // parentComments.depth = 0

        const buildCommentTree = (item, depth) =>{
            depth = depth + 1
            let childComments = comment.filter(child => child.parent_comment_id === item.ref_id)
            childComments.forEach((item)=> {
                item.depth = depth
            })
            item.childList = childComments
            childComments.forEach((item) => buildCommentTree(item, item.depth))
        }
        parentComments.forEach((item, idx) => {
            // let depth = 0
            buildCommentTree(item, item.depth)
        });

        let commentComponentList = parentComments.map(item => <Comments body={item.body} user={item.author} children={item.childList} depth={item.depth} votes={item.votes} url={item.avatar_url}/>)
        return commentComponentList
    }

    return(
        <div>
             <main className="main-container">
                 <ScrollToTop/>
             <div className="news-container">
              
                <section className="card-list-container">
                    <div className="card-wrapper">
                        <div className="news-card-content article-content single-post">
                        <div className="article-page-upvote-section"></div>
                            <div className="content-wrapper">
                               
                                <h3 className="article-title">{articleData.title}</h3>
                                <p className="article-body">{articleData.body}</p>
                                <img className="post-img" height={"700px"} src={articleData.media_link}></img>
                            </div>
                           
                        </div>
                    </div>
                    
                </section>
                <section className="comment-section">
                    {isLoaded? commentRender(articleData.comments) : null}
                </section>
                
                </div>
            </main>
            
        </div>
        
    )
}

export default ArticlePage