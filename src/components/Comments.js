import axios from "axios"
import Trix from "trix";
import Votes from "./Votes.js";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";

import {EditorState} from 'draft-js';
import {stylizeText} from './utils/utils.js'
import { useEffect, useState, useRef } from 'react'
import useWindowSize from './hooks/useWindowSize';
import CommentBox from "./CommentBox.js";
// import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const Comments = (item, setUpdateCommentTree) => {
    // console.log(item)
    const [userData, setUserData] = useState()
    const [showChildren, setShowChildren] = useState(true)
    const [showCommentEditor, setShowCommentEditor] = useState(false)
    const [commentText, setCommentText] = useState('false')
    const [isLoaded, setIsLoaded] = useState(false)
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
    );

    let size = useWindowSize()
    
    const commentRef = useRef(null);
    const sideProfileRef = useRef(null)
    const profilePicRef = useRef(null)
    const [elementSizes, setElementSizes] = useState({
        commentHeight: commentRef.current?.offsetHeight,
        profilePicHeight: profilePicRef.current?.offsetHeight,
        sideProfileHeight: sideProfileRef.current?.offsetHeight
    })
    
    const toggleChildVisibility = () =>{
        setShowChildren(currState => !currState)
    }

    const toggleCommentEditor = ()=>{
        setShowCommentEditor(currState => !currState)
    }

    // console.log(commentRef.current?.clientHeight)

    useEffect(() =>{
        let commentHeight = commentRef.current?.offsetHeight
        let sideProfileHeight = sideProfileRef.current?.offsetHeight
        let profilePicHeight = profilePicRef.current?.offsetHeight
        setElementSizes(item =>{ return {commentHeight: commentHeight, 
                                        sideProfileHeight: sideProfileHeight, 
                                        profilePicHeight: profilePicHeight}})

        const url = `https://reddit-flask-api.herokuapp.com/api/username/${item.author}`
        // console.log(url)
        axios.get(url).then(({data}) =>{
            // console.log(data.userdata)
            setUserData(data.userdata)
            setIsLoaded(true)
        }).catch(err => console.log(err))
    },[])

    useEffect(() =>{
        // console.log("SIZE CHANGED")
        let commentHeight = commentRef.current?.offsetHeight
        let sideProfileHeight = sideProfileRef.current?.offsetHeight
        let profilePicHeight = profilePicRef.current?.offsetHeight
        setElementSizes(item =>{ return {commentHeight: commentHeight, 
                                        sideProfileHeight: sideProfileHeight, 
                                        profilePicHeight: profilePicHeight}})
    }, [size, showCommentEditor, showChildren])

    // console.log(commentText)
    
    return(
        <div ref={commentRef} class="comment">
            <div >
                <div className='comment-wrapper'  style={{marginLeft: `${(item.depth-1)*25}px`}}>
                    <div ref={sideProfileRef} className='side-profile-wrapper'> 
                        {isLoaded? <img ref={profilePicRef} className="comment-profile-pic" src={userData.avatar_url}></img> : null}
                        <div onClick={toggleChildVisibility} className={`stroke ${item.depth}`} style={{ height: `${(elementSizes.commentHeight+5*item.depth - 70 ) }px`, 
                                                                    top: `${elementSizes.sideProfileHeight - (elementSizes.sideProfileHeight-30-10)}px`}}>
                        </div>
                    </div>
                    
                    <div className='comment-content'>
                        <p className="comment-author"  >{item.author} {item.parent_comment_id} {item.ref_id}</p>
                        <h3 dangerouslySetInnerHTML={{ __html: stylizeText(item.body_styled)  }}></h3>
                
                        <div className="comment-options">
                            <Votes contentType={"comment"} votes={item.votes} ref_id={item.ref_id}/>
                            <h3 onClick={toggleCommentEditor}>Reply</h3>
                            {/* <h3>Save</h3>
                            <h3>Give Award</h3>
                        <h3>Follow</h3> */}
                        </div>
                    </div>
                </div>
                {showCommentEditor?<CommentBox depth={item.depth} 
                                            parent_comment_id={item.ref_id} 
                                            post_id={item.post_id} 
                                            author={item.author} 
                                            setUpdateCommentTree={setUpdateCommentTree}/>
                                    : null}   
                   
                    {showChildren? item.childList.map((item, idx) => <Comments key={item.ref_id} {...item} setUpdateCommentTree={setUpdateCommentTree}/>): null}
                    {/* depth={0} parent_comment_id={articleData.ref_id} post_id={articleData.ref_id} author={articleData.author} setUpdateCommentTree={setUpdateCommentTree} */}
            </div>
        </div>
    )
}

export default Comments