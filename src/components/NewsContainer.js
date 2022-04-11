import NewsCardList from "./NewsCardList"
import CreatePost from "./CreatePost"
import FilterBar from "./FilterBar"
import {useState, createContext, useContext} from 'react'

// const NewsDataTopicContext = createContext();

const NewsContainer = () => {
    const [commentOrder, setCommentOrder] = useState()
    const [voteOrder, setVoteOrder] = useState()
    
    return(
       <div className="news-container">
                <FilterBar setCommentOrder={setCommentOrder} setVoteOrder={setVoteOrder} ></FilterBar>
                {/* <CreatePost/> */}
                <NewsCardList commentOrder={commentOrder} voteOrder={voteOrder} topic={null}/>
        </div>
    )
}

export default NewsContainer