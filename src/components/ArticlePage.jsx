import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import {stylizeText, renderPostMedia} from './utils/utils.js'
import Comments from "./Comments"
import ScrollToTop from "react-scroll-to-top";
import Votes from "./Votes.js"
import CommentBox from "./CommentBox.js"

const ArticlePage = () => {
    const { post_id } = useParams()
    const [articleData, setArticleData] = useState({})
    const [updateCommentTree, setUpdateCommentTree] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    let location = useLocation()
    // console.log(location)
    // console.log(article_id)
    useEffect(()=>{
        console.log('hello')
        const url = `https://reddit-flask-api.herokuapp.com/api/post/${post_id}`
        // console.log(url)
        axios.get(url).then(({data}) =>{
            // console.log(data)
            setArticleData(data)
            setIsLoaded(true)
        }).catch(err => console.log(err))
    },[updateCommentTree])



    const separateParagraph = (text) => {
        console.log(text)
        return text.split('.').filter(x => x).map(x => x + '.')
    }

    const commentRender = (comment) =>{
        // console.log(comment)
        let parentComments = comment.filter(item => item.parent_comment_id === post_id)
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

        let commentComponentList = parentComments.map((item, idx) => <Comments key={item.ref_id} {...item} setUpdateCommentTree={setUpdateCommentTree}/>)
        // parentComments.map((item, idx) => <Comments key={item.ref_id} body={item.body} body_styled={item.body_styled} user={item.author} children={item.childList} depth={item.depth} votes={item.votes} url={item.avatar_url} ref_id={item.ref_id}/>)
        return commentComponentList
    }


    console.log(articleData.media_link)
    return(
        <div>
             <main className="main-container">
                 <ScrollToTop/>
             <div className="news-container" >
              
                <section className="card-list-container">
                    <div className="post-wrapper">
                        <div className="news-card-content article-content single-post">
                        <div className="article-page-upvote-section">
                            <Votes contentType={"post"} votes={articleData.votes} ref_id={articleData.ref_id}/>
                        </div>
                            <div className="content-wrapper">
                                <h3 className="article-title" >{articleData.title}</h3>
                                <div className="article-body" dangerouslySetInnerHTML={{__html: stylizeText(articleData.body_styled)}}></div>
                                <div className="post-media-wrapper">
                                    {articleData ? renderPostMedia(articleData.media_type, articleData.media_link) : null}
                                    {/* <img className="post-img" src={articleData.media_link}></img> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
                <section className="comment-section" >
                    <CommentBox depth={0} parent_comment_id={articleData.ref_id} post_id={articleData.ref_id} author={articleData.author} setUpdateCommentTree={setUpdateCommentTree}/>
                    <div className="comment-tree">
                    {isLoaded? commentRender(articleData.comments) : null}
                    </div>
                    
                </section>
                
                </div>
            </main>
            
        </div>
        
    )
}

export default ArticlePage