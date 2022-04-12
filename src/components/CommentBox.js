import { useState } from "react"
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const CommentBox = ({depth, parent_comment_id, post_id, author, setUpdateCommentTree}) => {
    const [commentText, setCommentText] = useState('')
    const [toastMessage, setToastMessage] = useState(0)

    const handleChange = (e, newVal) =>{
        console.log(newVal)
        setCommentText(newVal)
    }

    const addComment = () => {
        
        const comment_obj = {
			body: "",
            votes: 0,
			body_styled: commentText,
			parent_comment_id: parent_comment_id,
			ref_id: 'i'+Math.random().toString(36).slice(3,8),
			post: post_id,
			users: author,
            created_at: ''
		}
        console.log(comment_obj)
        
        axios.post(`https://reddit-flask-api.herokuapp.com/api/post/${post_id}/comments`, comment_obj).then((res) =>{
            console.log('Comment saved', comment_obj.ref_id)
            setUpdateCommentTree(currState => currState + 1)
            setCommentText('')
            setToastMessage(counter => counter + 1)
            
            toast.success('🦄 Comment added sucessfully!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }).catch(function (error) {
            console.log(error.response)
        });
    }
    
    // console.log(commentText)

    return(
        <div className="comment-box-wrapper" style={{marginLeft: `${((depth)*25)+20}px`}}> 
            {toastMessage > 1? <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            />: null}
            <ReactTrixRTEInput
                className="comment-box"
                toolbarId="react-trix-rte-editor"
                defaultValue={commentText}
                placeholder="Write your comment here!"
                onChange={handleChange}
            />
            <div className="comment-toolbox-wrapper">
            <ReactTrixRTEToolbar 
                className ="toolbar-comment-box"
                toolbarId="react-trix-rte-editor" 
                toolbarActions={["bold", "italic", "strike", "link", "heading1", "quote", "code", "bullet", "number", "outdent", "indent"]}
                />
            <button disabled={commentText? false : true} onClick={addComment}>Add comment</button>
            </div>
        </div>
    )
}


export default CommentBox