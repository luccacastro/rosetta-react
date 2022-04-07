import VoteIcon from '../vote_icon.png'
import ColoredVoteIcon from '../colored_vote_icon.png'
import axios from "axios"
import Trix from "trix";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";

import { useEffect, useState, useRef } from 'react'
import useWindowSize from './hooks/useWindowSize'

const Comments = ({ body, user, children, depth, votes, url}) => {
    const [userData, setUserData] = useState()
    const [showChildren, setShowChildren] = useState(true)
    const [showCommentEditor, setShowCommentEditor] = useState(false)
    const [commentText, setCommentText] = useState('false')
    const [isLoaded, setIsLoaded] = useState(false)
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

    console.log(commentRef.current?.clientHeight)

    useEffect(() =>{
        let commentHeight = commentRef.current?.offsetHeight
        let sideProfileHeight = sideProfileRef.current?.offsetHeight
        let profilePicHeight = profilePicRef.current?.offsetHeight
        setElementSizes(item =>{ return {commentHeight: commentHeight, 
                                        sideProfileHeight: sideProfileHeight, 
                                        profilePicHeight: profilePicHeight}})

        const url = `http://localhost:5502/api/username/${user}`
        console.log(url)
        axios.get(url).then(({data}) =>{
            console.log(data.userdata)
            setUserData(data.userdata)
            setIsLoaded(true)
            // setIsLoaded(true)
        }).catch(err => console.log(err))
    },[])

    useEffect(() =>{
        let commentHeight = commentRef.current?.offsetHeight
        let sideProfileHeight = sideProfileRef.current?.offsetHeight
        let profilePicHeight = profilePicRef.current?.offsetHeight
        setElementSizes(item =>{ return {commentHeight: commentHeight, 
                                        sideProfileHeight: sideProfileHeight, 
                                        profilePicHeight: profilePicHeight}})
    }, [size, showCommentEditor, showChildren])
    console.log(elementSizes)

    // console.log(userData)

    const stylizeText = (comment) => {
        // const linkArr= []
        const getLinks = comment.match(/\[(.*?)\]+\((.*)\)/g)
        if(getLinks){
            getLinks.forEach(element => {
                let text = element.match(/\[(.*?)\]/g)
                let url = element.match(/\((.*)\)/g)
                url = url[0].slice(1, url.length-2)
                text = text[0].slice(1, text.length-2)
                const aTag = `<a href=${url}>${text}</a>`
                comment = comment.replace(element, aTag)
            });
            console.log(comment)
        }
       
        return `<h3>${comment}</h3>`
    }

    const handleChange = (e, newValue) =>{
        setCommentText(newValue)
    }
    console.log(commentText)
    
    return(
        <div ref={commentRef} class="comment">
            <div >
                <div className='comment-wrapper'  style={{marginLeft: `${depth*40}px`}}>
                    <div ref={sideProfileRef} className='side-profile-wrapper'> 
                        {isLoaded? <img ref={profilePicRef} className="comment-profile-pic" src={userData.avatar_url}></img> : null}
                        <div onClick={toggleChildVisibility} className={`stroke ${depth}`} style={{ height: `${(elementSizes.commentHeight+5*depth - 70 ) }px`, 
                                                                    top: `${elementSizes.sideProfileHeight - (elementSizes.sideProfileHeight-30-10)}px`}}>
                        </div>
                    </div>
                    
                    <div className='comment-content'>
                        <p className="comment-author"  >{user}</p>
                        <h3 dangerouslySetInnerHTML={{ __html: stylizeText(body) }}></h3>
                
                        <div className="comment-options">
                            <img src={VoteIcon} alt=""height="25" />
                            <h3>{votes}</h3>
                            <img src={VoteIcon} style={{transform: 'rotate(180deg)', marginLeft:"10px"}} alt="" height="25"/>
                            <h3 onClick={toggleCommentEditor}>Reply</h3>
                            <h3>Save</h3>
                            <h3>Give Award</h3>
                        <h3>Follow</h3>
                        </div>
                    </div>
                </div>
                {showCommentEditor? 
                    <div style={{marginLeft: `${(depth+1)*40}px`}}> 
                        <ReactTrixRTEToolbar toolbarId="react-trix-rte-editor" />
                        <ReactTrixRTEInput
                            toolbarId="react-trix-rte-editor"
                            defaultValue="<div>React Trix Rich Text Editor</div>"
                            onChange={handleChange}
                        />
                    </div>: null}
                {showChildren? children.map(item => <Comments body={item.body} user={item.author} children={item.childList} depth={item.depth} votes={item.votes} url={item.avatar_url}/>): null}
            </div>
        </div>
    )
}

export default Comments